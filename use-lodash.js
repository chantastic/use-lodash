import React, { useState } from "react";
import lodash from "lodash";

export default function useLodash(initialSubject) {
  let [subject, updateSubject] = useState(initialSubject);

  let updaters = {};

  Object.keys(lodash.prototype).forEach(
    name =>
      (updaters[name] = (...args) =>
        updateSubject(lodash[name](subject, ...args)))
  );

  return {
    subject,
    ...updaters
  };
}