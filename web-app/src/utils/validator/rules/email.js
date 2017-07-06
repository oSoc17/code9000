const VALID_EMAIL_RULE = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const rule = (email = '') => {
  if (`${email}`.trim() === '') {
    return true;
  }
  return VALID_EMAIL_RULE.test(email);
};

export const message = 'This field is not a valid email.';
