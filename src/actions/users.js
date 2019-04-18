export const TYPES = {
  USERS_PROCESSING: 'users_processing',
  USERS_PROCESS_ERROR: 'users_process_error',
  USERS_LOADED: 'users_loaded',
  USER_ADDED: 'user_added',
  USER_EDITED: 'user_edited',
  USER_REMOVED: 'user_removed',
  USER_VALIDATION_ERRORS: 'user_validation_errors'
};

export function processingUsers() {
  return { type: TYPES.USERS_PROCESSING };
}

export function processUsersError(error) {
  return { type: TYPES.USERS_PROCESS_ERROR, error };
}

export function validationUserErrors(errors) {
  return { type: TYPES.USER_VALIDATION_ERRORS, errors };
}

export function loadedUsers(users) {
  return { type: TYPES.USERS_LOADED, users };
}

export function addedUser(user) {
  return { type: TYPES.USER_ADDED, user };
}

export function editedUser(id, attrs) {
  return { type: TYPES.USER_EDITED, id, attrs };
}

export function removedUser(id) {
  return { type: TYPES.USER_REMOVED, id };
}
