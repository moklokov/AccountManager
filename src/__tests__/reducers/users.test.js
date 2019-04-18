import users from '../../reducers/users'
import * as UsersActions from '../../actions/users'

describe('Users reducer', () => {
  describe('initialization', () => {
    describe('with default', () => {
      it("should be return empty items and not loading", () => {
        expect(users()).toEqual({ items: {}, isProcessing: false, error: '', validErrors: {} });
      });
    });

    describe('with store and empty action', () => {
      let state = { items: { 1: { id: 1, first_name: 'Test', last_name: 'Testov' } }, isProcessing: false, error: '',
          validErrors: {} };

      it("should be return not changed store", () => {
        expect(users(state)).toEqual(state);
      });
    });
  });

  describe('processing', () => {
    const state = { items: {}, isProcessing: false, error: '', validErrors: { email: ['is empty'] } };
    const expectedState = { items: {}, isProcessing: true, error: '', validErrors: {} };

    it("should be changed processing state and clear errors", () => {
      expect(users(state, UsersActions.processingUsers())).toEqual(expectedState);
    });
  });

  describe('process error', () => {
    const error = 'bad request';
    const state = { items: {}, isProcessing: true, error: '', validErrors: {} };
    const expectedState = { items: {}, isProcessing: false, error: error, validErrors: {} };

    it("should be changed processing and error", () => {
      expect(users(state, UsersActions.processUsersError(error))).toEqual(expectedState);
    });
  });

  describe('validation errors`', () => {
    const errors = { username: ['is empty'], email: ['is invalid'] };
    const state = { items: {}, isProcessing: true, error: '', validErrors: {} };
    const expectedState = { items: {}, isProcessing: false, error: '', validErrors: errors };

    it("should be changed processing and errors", () => {
      expect(users(state, UsersActions.validationUserErrors(errors))).toEqual(expectedState);
    });
  });

  describe('loaded', () => {
    const loadedUsers = { 1: { id: 1, first_name: 'Test', last_name: 'Testov' } };
    const state = { items: {}, isProcessing: true, error: '', validErrors: {} };
    const expectedState = { items: loadedUsers, isProcessing: false, error: '', validErrors: {} };

    it("should be changed users and processing state", () => {
      expect(users(state, UsersActions.loadedUsers(loadedUsers))).toEqual(expectedState);
    });
  });

  describe('added', () => {
    const user = { id: 2, first_name: 'New', last_name: 'User' };
    const state = {
      items: {
        1: { id: 1, first_name: 'Test', last_name: 'Testov' }
      },
      isProcessing: true,
      error: '',
      validErrors: {}
    };
    const expectedState = {
      items: {
        2: { id: 2, first_name: 'New', last_name: 'User' },
        1: { id: 1, first_name: 'Test', last_name: 'Testov' }
      },
      isProcessing: false,
      error: '',
      validErrors: {}
    };

    it("should be added to items", () => {
      expect(users(state, UsersActions.addedUser(user))).toEqual(expectedState);
    });
  });

  describe('edited', () => {
    const state = { items: { 1: { id: 1, first_name: 'Test', last_name: 'Testov' } }, isProcessing: true, error: '', validErrors: {} };
    const expectedState = { items: { 1: { id: 1, first_name: 'New', last_name: 'Testov' } }, isProcessing: false,
        error: '', validErrors: {} };

    it("should be changed user and processing state", () => {
      expect(users(state, UsersActions.editedUser(1, { first_name: 'New' }))).toEqual(expectedState);
    });
  });

  describe('removed', () => {
    const state = { items: { 1: { id: 1, first_name: 'Test', last_name: 'Testov' } }, isProcessing: true, error: '', validErrors: {} };
    const expectedState = { items: {}, isProcessing: false, error: '', validErrors: {} };

    it("should be removed user and change processing state", () => {
      expect(users(state, UsersActions.removedUser(1))).toEqual(expectedState);
    });
  });
});
