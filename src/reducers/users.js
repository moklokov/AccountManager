import { TYPES } from '../actions/users'

const initState = () => ( { items: {}, isProcessing: false, error: '', validErrors: {} } )

export default function(state = initState(), action = {}) {
  switch (action.type) {
    case TYPES.USERS_PROCESSING:
      return { ...state, isProcessing: true, error: '', validErrors: {} };
    case TYPES.USERS_PROCESS_ERROR:
      return { ...state, isProcessing: false, error: action.error };
    case TYPES.USERS_LOADED:
      return { ...state, items: action.users, isProcessing: false };
    case TYPES.USER_ADDED:
      return { ...state, items: { [action.user.id]: action.user, ...state.items }, isProcessing: false };
    case TYPES.USER_EDITED:
      const updatedUser = { ...state.items[action.id], ...action.attrs };
      return { ...state, items: { ...state.items, [action.id]: updatedUser }, isProcessing: false };
    case TYPES.USER_REMOVED:
      let items = { ...state.items };
      delete items[action.id];
      return { ...state, items: items, isProcessing: false };
    case TYPES.USER_VALIDATION_ERRORS:
      return { ...state, isProcessing: false, validErrors: action.errors };
    default:
      return state;
  }
}
