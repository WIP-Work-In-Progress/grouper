const _ = require("lodash");

// recursive function to convert object keys to camelCase
const camelCaseKeys = (obj) => {
  if (!obj || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => camelCaseKeys(item));
  }

  const newObj = {};
  Object.keys(obj).forEach((key) => {
    const camelKey = _.camelCase(key);
    const value = obj[key];

    if (value && typeof value === "object") {
      newObj[camelKey] = camelCaseKeys(value);
    } else {
      newObj[camelKey] = value;
    }
  });

  return newObj;
};

module.exports = {
  camelCaseKeys,
};
