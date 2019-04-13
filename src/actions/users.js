export const TYPES = {
  USERS_LOADING: 'users_loading',
  USERS_LOADED: 'users_loaded',
  USERS_LOAD_ERROR: 'users_load_error',
  USER_ADDING: 'user_adding',
  USER_ADDED: 'user_added',
  USER_ADD_ERROR: 'user_add_error',
  USER_EDITING: 'user_editing',
  USER_EDITED: 'user_edited',
  USER_EDIT_ERROR: 'user_edit_error',
  USER_REMOVING: 'user_removing',
  USER_REMOVED: 'user_removed',
  USER_REMOVE_ERROR: 'user_remove_error'
};

export function loadingUsers() {
  return { type: TYPES.USERS_LOADING };
}

export function loadedUsers(users) {
  return { type: TYPES.USERS_LOADED, users };
}

export function loadUsersError() {
  return { type: TYPES.USERS_LOAD_ERROR };
}

export function addingUser() {
  return { type: TYPES.USER_ADDING };
}

export function addedUser(user) {
  return { type: TYPES.USER_ADDED, user };
}

export function addUserError() {
  return { type: TYPES.USER_ADD_ERROR };
}

export function editingUser() {
  return { type: TYPES.USER_EDITING };
}

export function editedUser(id, attrs) {
  return { type: TYPES.USER_EDITED, id, attrs };
}

export function editUserError() {
  return { type: TYPES.USER_EDIT_ERROR };
}

export function removingUser() {
  return { type: TYPES.USER_REMOVING };
}

export function removedUser(id) {
  return { type: TYPES.USER_REMOVED, id };
}

export function removeUserError() {
  return { type: TYPES.USER_REMOVE_ERROR };
}
