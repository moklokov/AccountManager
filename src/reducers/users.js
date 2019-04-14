import { TYPES } from '../actions/users'

const initState = () => ( { items: {}, is_loading: false, is_saving: false } )

export default function(state = initState(), action = {}) {
  switch (action.type) {
    case TYPES.USERS_LOADING:
      return { ...state, is_loading: true };
    case TYPES.USERS_LOADED:
      return { ...state, items: action.users, is_loading: false };
    case TYPES.USERS_LOAD_ERROR:
      return { ...state, is_loading: false };
      return
    case TYPES.USER_ADDED:
      return { ...state, items: { [action.user.id]: action.user, ...state.items }, is_saving: false };
    case TYPES.USER_EDITING:
    case TYPES.USER_ADDING:
      return { ...state, is_saving: true };
    case TYPES.USER_EDITED:
      const updatedUser = { ...state.items[action.id], ...action.attrs };
      return { ...state, items: { ...state.items, [action.id]: updatedUser }, is_saving: false };
    case TYPES.USER_EDIT_ERROR:
    case TYPES.USER_ADD_ERROR:
      return { ...state, is_saving: false }
    default:
      return state;
  }
}
