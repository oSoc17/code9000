import RULES from './rules';

export default (input, rules) => {
  return Object.keys(rules)
    .map((field) => ({
      field,
      rules: [].concat(rules[field]),
    }))
    .reduce((result, { field, rules: rulesList }) => {
      rulesList.forEach((ruleToValidate) => {
        const { rule: ruleValidator, message } = RULES[ruleToValidate];

        if (ruleValidator(input[field]) === false) {
          result.isValid = false;
          result.messages[field] = [
            ...(result.messages[field] || []),
            message,
          ];
        }
      });

      return result;
    }, {
      isValid: true,
      messages: {},
    });
};
