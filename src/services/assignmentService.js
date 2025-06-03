const Assignments = require("../models/assignmentsModel");
const Preference = require("../models/preferenceModel");
const Group = require("../models/groupModel");
const Participant = require("../models/participantModel");
const ConfirmationLog = require("../models/confirmationLogModel");

const AssignmentService = {
  createAssignments: ({ registrationId }) => {
    const participants = Participant.getByRegistrationId(registrationId);
    const groups = Group.getByRegistrationId(registrationId);

    // group capacity tracking
    const groupCapacity = {};
    groups.forEach((group) => {
      groupCapacity[group.id] = {
        capacity: group.capacity,
        assigned: 0,
        name: group.name,
      };
    });

    // Sort participants by confirmation time (those who confirmed earlier get priority)
    const sortedParticipants = participants.sort((a, b) => {
      // Get the latest confirmation log for each participant
      const latestA =
        ConfirmationLog.getByParticipantId({
          participantId: a.id,
          order: "DESC",
          limit: 1,
        })[0] || null;
      const latestB =
        ConfirmationLog.getByParticipantId({
          participantId: b.id,
          order: "DESC",
          limit: 1,
        })[0] || null;

      // If no confirmation log exists for a participant, treat it as if they confirmed later
      if (!latestA) return 1; // a confirmed later than b
      if (!latestB) return -1; // b confirmed later than a

      return new Date(latestA.confirmedAt) - new Date(latestB.confirmedAt);
    });

    // Process each participant in priority order
    for (const participant of sortedParticipants) {
      const now = new Date().toISOString();
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
          const assignment = Assignments.create({
            registrationId,
            participantId: participant.id,
            assigned: true,
            groupId,
            assignedAt: now,
          });

          // If assignment was successful, update group capacity and break
          if (assignment) {
            groupCapacity[groupId].assigned++;
            assigned = true;
            break;
          }
        }
      }

      // If participant couldn't be assigned to any of their preferred groups
      // we will stil add them to the assignments with assigned as false
      // then we can handle this later in the UI or logic
      if (!assigned && sortedPreferences.length > 0) {
        Assignments.create({
          registrationId,
          participantId: participant.id,
          assigned: false,
        });
      }
    }

    return AssignmentService.getResults({ registrationId });
  },

  getResults: ({ registrationId, participantId = null, groupId = null }) => {
    let assignments;

    if (participantId) {
      assignments = Assignments.getByParticipantId({
        participantId,
      });
    } else if (groupId) {
      assignments = Assignments.getByGroupId({ groupId });
    } else {
      assignments = Assignments.getByRegistrationId({ registrationId });
    }

    if (!assignments || assignments.length === 0) return [];

    const groups = Group.getByRegistrationId(registrationId);
    const participants = Participant.getByRegistrationId(registrationId);

    // Map group IDs to group names for easier access
    const groupMap = {};
    groups.forEach((group) => {
      groupMap[group.id] = group.name;
    });

    // Map assignments to participants and groups
    return assignments.map((assignment) => {
      const participant = participants.find(
        (p) => p.id === assignment.participantId,
      );

      return {
        participant: {
          id: participant.id,
          firstName: participant.firstName,
          lastName: participant.lastName,
          email: participant.email,
        },
        groupId: assignment.groupId || null,
        groupName: groupMap[assignment.groupId] || null,
        assigned: assignment.assigned ? true : false,
        assignedAt: assignment.assignedAt || null,
      };
    });
  },

  clearRegistration: ({ registrationId }) => {
    const result = {
      success: true,
      errors: [],
    };

    const deleteResult = Assignments.deleteByRegistrationId({ registrationId });
    if (!deleteResult) {
      result.success = false;
      result.errors.push("Failed to delete assignments for registration.");
    }

    return result;
  },
};

module.exports = AssignmentService;
