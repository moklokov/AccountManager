import * as UsersActions from '../../actions/users.js'

describe('UsersActions', ()=> {
  describe('TYPES', ()=> {
    it('should be correct', ()=> {
      expect(UsersActions.TYPES).toEqual({
        USERS_PROCESSING: 'users_processing',
        USERS_PROCESS_ERROR: 'users_process_error',
        USERS_LOADED: 'users_loaded',
        USER_ADDED: 'user_added',
        USER_EDITED: 'user_edited',
        USER_REMOVED: 'user_removed',
        USER_VALIDATION_ERRORS: 'user_validation_errors'
      });
    });
  });

  describe('Processing Action', ()=> {
    it('should be correct type', ()=> {
      expect(UsersActions.processingUsers()).toEqual({ type: 'users_processing' });
    });
  });

  describe('Process Users Error Action', ()=> {
    it('should be correct type', ()=> {
      const error = 'exception message';
      expect(UsersActions.processUsersError(error)).toEqual({ type: 'users_process_error',  error});
    });
  });

  describe('Validation Errors', () => {
    it("should be returns correct type and errors", () => {
      const errors = { usersname: ['is empty'] };
      expect(UsersActions.validationUserErrors(errors)).toEqual({ type: 'user_validation_errors', errors });
    });
  });

  describe('Loaded Users Action', ()=> {
    let users = [{ id: 1, first_name: 'Test', last_name: 'Testov' }];

    it('should be correct type and data', ()=> {
      expect(UsersActions.loadedUsers(users)).toEqual({ type: 'users_loaded', users });
    });
  });

  describe('Added User Action', ()=> {
    let user = { id: 1, first_name: 'Test', last_name: 'Testov' };

    it('should be correct type and data', ()=> {
      expect(UsersActions.addedUser(user)).toEqual({ type: 'user_added', user });
    });
  });

  describe('Edited User Action', ()=> {
    let attrs = { first_name: 'Test', last_name: 'Testov' };
    let id = 1;

    it('should be correct type and data', ()=> {
      expect(UsersActions.editedUser(1, attrs)).toEqual({ type: 'user_edited', id, attrs });
    });
  });

  describe('Removed User Action', ()=> {
    let id = 1;

    it('should be correct type and data', ()=> {
      expect(UsersActions.removedUser(1)).toEqual({ type: 'user_removed', id });
    });
  });
});
