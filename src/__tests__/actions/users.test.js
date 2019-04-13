import * as UsersActions from '../../actions/users.js'

describe('UsersActions', ()=> {
  describe('TYPES', ()=> {
    it('should be correct', ()=> {
      expect(UsersActions.TYPES).toEqual({
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
        USER_REMOVE_ERROR: 'user_remove_error',
      });
    });
  });

  describe('Loading Users Action', ()=> {
    it('should be correct type', ()=> {
      expect(UsersActions.loadingUsers()).toEqual({ type: 'users_loading' });
    });
  });

  describe('Loaded Users Action', ()=> {
    let users = [{ id: 1, first_name: 'Test', last_name: 'Testov' }];

    it('should be correct type and data', ()=> {
      expect(UsersActions.loadedUsers(users)).toEqual({ type: 'users_loaded', users });
    });
  });

  describe('Load Users Error Action', ()=> {
    it('should be correct type', ()=> {
      expect(UsersActions.loadUsersError()).toEqual({ type: 'users_load_error' });
    });
  });

  describe('Adding User Action', ()=> {
    it('should be correct type', ()=> {
      expect(UsersActions.addingUser()).toEqual({ type: 'user_adding' });
    });
  });

  describe('Added User Action', ()=> {
    let user = { id: 1, first_name: 'Test', last_name: 'Testov' };

    it('should be correct type and data', ()=> {
      expect(UsersActions.addedUser(user)).toEqual({ type: 'user_added', user });
    });
  });

  describe('Add User Error Action', ()=> {
    it('should be correct type', ()=> {
      expect(UsersActions.addUserError()).toEqual({ type: 'user_add_error' });
    });
  });

  describe('Editing User Action', ()=> {
    it('should be correct type', ()=> {
      expect(UsersActions.editingUser()).toEqual({ type: 'user_editing' });
    });
  });

  describe('Edited User Action', ()=> {
    let attrs = { first_name: 'Test', last_name: 'Testov' };
    let id = 1;

    it('should be correct type and data', ()=> {
      expect(UsersActions.editedUser(1, attrs)).toEqual({ type: 'user_edited', id, attrs });
    });
  });

  describe('Edit User Error Action', ()=> {
    it('should be correct type', ()=> {
      expect(UsersActions.editUserError()).toEqual({ type: 'user_edit_error' });
    });
  });

  describe('Removing User Action', ()=> {
    it('should be correct type', ()=> {
      expect(UsersActions.removingUser()).toEqual({ type: 'user_removing' });
    });
  });

  describe('Removed User Action', ()=> {
    let id = 1;

    it('should be correct type and data', ()=> {
      expect(UsersActions.removedUser(1)).toEqual({ type: 'user_removed', id });
    });
  });

  describe('Edit User Error Action', ()=> {
    it('should be correct type', ()=> {
      expect(UsersActions.removeUserError()).toEqual({ type: 'user_remove_error' });
    });
  });
});
