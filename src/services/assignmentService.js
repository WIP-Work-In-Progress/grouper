const Assignments = require("../models/assignmentsModel");
const Preference = require("../models/preferenceModel");
const Group = require("../models/groupModel");
const Participant = require("../models/participantModel");
const ConfirmationLog = require("../models/confirmationLogModel");

const AssignmentService = {
  createAssignments: (registrationId) => {
    const participants = Participant.getByRegistrationId(registrationId);
    const groups = Group.getByRegistrationId(registrationId);

    // group capacity tracking
    const groupCapacity = {};
    groups.forEach((group) => {
      groupCapacity[group.id] = {
        capacity: group.capacity,
        assigned: 0,
      };
    });

    // Sort participants by confirmation time (those who confirmed earlier get priority)
    const sortedParticipants = participants.sort((a, b) => {
      const logsA =
        ConfirmationLog.getByParticipantId({ participantId: a.id }) || [];
      const logsB =
        ConfirmationLog.getByParticipantId({ participantId: b.id }) || [];

      if (logsA.length === 0) return 1;
      if (logsB.length === 0) return -1;

      // Sort by latest confirmation
      const latestA = logsA.reduce((latest, log) => {
        return new Date(log.confirmedAt) > new Date(latest.confirmedAt)
          ? log
          : latest;
      }, logsA[0]);

      const latestB = logsB.reduce((latest, log) => {
        return new Date(log.confirmedAt) > new Date(latest.confirmedAt)
          ? log
          : latest;
      }, logsB[0]);

      return new Date(latestA.confirmedAt) - new Date(latestB.confirmedAt);
    });

    // Process each participant in priority order
    const now = new Date().toISOString();
    const assignments = [];

    for (const participant of sortedParticipants) {
      // Get participant preferences in order
      const preferences = Preference.getByParticipantId(participant.id) || [];

      // Sort preferences by participant's preference order
      const sortedPreferences = preferences.sort(
        (a, b) => a.preferenceOrder - b.preferenceOrder,
      );

      // Try to assign participant to their most preferred available group
      let assigned = false;

      for (const pref of sortedPreferences) {
        const groupId = pref.groupId;

        // Check if group still has capacity
        if (groupCapacity[groupId].assigned < groupCapacity[groupId].capacity) {
          // Assign participant to this group
          const assignment = Assignments.create({
            participantId: participant.id,
            groupId,
            assignedAt: now,
          });

          if (assignment) {
            // Update group capacity
            groupCapacity[groupId].assigned++;
            assignments.push(assignment);
            assigned = true;
            break;
          }
        }
      }

      // If participant couldn't be assigned to any of their preferred groups
      if (!assigned && sortedPreferences.length > 0) {
        console.log(
          `Could not assign participant ${participant.id} to any of their preferred groups`,
        );
      }
    }

    return assignments;
  },

  getByParticipant: (participantId) => {
    return Assignments.getByParticipantId({ participantId });
  },

  getByGroup: (groupId) => {
    return Assignments.getByGroupId({ groupId });
  },

  clearRegistration: (registrationId) => {
    const groups = Group.getByRegistrationId(registrationId);

    for (const group of groups) {
      Assignments.deleteByGroupId({ groupId: group.id });
    }

    return true;
  },
};

module.exports = AssignmentService;
