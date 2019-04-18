import { getUserByUsername, getUserByEmail } from '../api/users'

//TODO use I18n locale for errors

function presentValidator(value) {
  return value && value.length ? [] : ['обязательно для заполнения'];
}

function validationAvatar(avatar) {
  let errors = [];
  //TODO
  return errors
}

async function validationUsername(id, username) {
  let errors = presentValidator(username);
  if (!errors.length) {
    const user = await getUserByUsername(username);
    if (user && user.id != id) {
      errors.push('уже существует');
    }
  }
  return errors;
}

function validationPassword(password) {
  return presentValidator(password);
}

function validationRepeatPassword(password, repeatPassword) {
  let errors = presentValidator(repeatPassword);
  if (!errors.length && password != repeatPassword) {
    errors.push('не соответствует пароолю')
  }
  return errors;
}

function validationFirstname(firstname) {
  return presentValidator(firstname);
}

function validationLastname(lastname) {
  return presentValidator(lastname);
}

function validationBirthdate(birthdate) {
  function diffYears(date, otherDate) {
    let diff =(otherDate.getTime() - date.getTime()) / 1000;
    diff /= (60 * 60 * 24);
    return Math.abs(Math.round(diff/365.25));
  }

  let errors = [];
  if (birthdate) {
    if (diffYears(birthdate, new Date()) < 18) {
      errors.push('еще не достигли 18 летия')
    }
  } else {
    errors.push('обязательно для заполнения')
  }
  return errors;
}

function validationGender(gender) {
  return presentValidator(gender)
}

function validationCompany(company) {
  return presentValidator(company)
}

function validationLanguage(language) {
  return presentValidator(language);
}

function validationSkills(skills) {
  return skills.length < 3 ? ['должно быть выбрано не менее 3x'] : [];
}

function validationInfo(info) {
  return info.length <= 300 ? [] : ['не более 300 символов']
}

async function validationEmail(id, email) {
  let errors = presentValidator(email);
  if (!errors.length) {
    let user = await getUserByEmail(email);
    if (user && user.id != id) {
      errors.push('уже существует');
    }
  }
  return errors;
}

export default async function validation(user) {
  const validators = ['avatar', 'password', 'firstname', 'lastname', 'birthdate', 'gender', 'company',
      'language', 'skills', 'info'];
  let errors = validators.reduce((errors, field) => {
    const fieldValidator = eval(`validation${field.charAt(0).toUpperCase()}${field.slice(1)}`)
    const fieldErrors = fieldValidator(user[field]);
    if (fieldErrors.length) {
      errors[field] = fieldErrors;
    }
    return errors;
  }, {});
  const repeatPasswordErrors = validationRepeatPassword(user.password, user.repeatPassword);
  if (repeatPasswordErrors.length) {
    errors['repeatPassword'] = repeatPasswordErrors
  }
  const usernameErrors = await validationUsername(user.id, user.username);
  if (usernameErrors.length) {
    errors['username'] = usernameErrors;
  }
  const emailErrors = await validationEmail(user.id, user.email);
  if (emailErrors.length) {
    errors['email'] = emailErrors;
  }

  return errors;
}
