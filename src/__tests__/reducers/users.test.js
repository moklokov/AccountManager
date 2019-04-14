import users from '../../reducers/users'
import * as UsersActions from '../../actions/users'

describe('Users reducer', () => {
  describe('initialization', () => {
    describe('with default', () => {
      it("should be return empty items and not loading", () => {
        expect(users()).toEqual({ items: {}, is_loading: false, is_saving: false });
      });
    });

    describe('with store and empty action', () => {
      let state = { items: { 1: { id: 1, first_name: 'Test', last_name: 'Testov' } }, is_loading: false, is_saving: false };

      it("should be return not changed store", () => {
        expect(users(state)).toEqual(state);
      });
    });
  });

  describe('loading', () => {
    const state = { items: {}, is_loading: false, is_saving: false };
    const expectedState = { items: {}, is_loading: true, is_saving: false };

    it("should be changed loading state", () => {
      expect(users(state, UsersActions.loadingUsers())).toEqual(expectedState);
    });
  });

  describe('loaded', () => {
    const loadedUsers = { 1: { id: 1, first_name: 'Test', last_name: 'Testov' } };
    const state = { items: {}, is_loading: true, is_saving: false };
    const expectedState = { items: loadedUsers, is_loading: false, is_saving: false };

    it("should be changed users and loading state", () => {
      expect(users(state, UsersActions.loadedUsers(loadedUsers))).toEqual(expectedState);
    });
  });

  describe('load error', () => {
    const state = { items: {}, is_loading: true, is_saving: false };
    const expectedState = { items: {}, is_loading: false, is_saving: false };

    it("should be changed users and loading state", () => {
      expect(users(state, UsersActions.loadUsersError())).toEqual(expectedState);
    });
  });

  describe('adding', () => {
    const state = { items: { 1: { id: 1, first_name: 'Test', last_name: 'Testov' } }, is_loading: false, is_saving: false };
    const expectedState = { items: { 1: { id: 1, first_name: 'Test', last_name: 'Testov' } }, is_loading: false, is_saving: true };

    it("should be changed aditing state", () => {
      expect(users(state, UsersActions.addingUser())).toEqual(expectedState);
    });
  });

  describe('added user', () => {
    const user = { id: 2, first_name: 'New', last_name: 'User' };
    const state = {
      items: {
        1: { id: 1, first_name: 'Test', last_name: 'Testov' }
      },
      is_loading: false,
      is_saving: true
    };
    const expectedState = {
      items: {
        2: { id: 2, first_name: 'New', last_name: 'User' },
        1: { id: 1, first_name: 'Test', last_name: 'Testov' }
      },
      is_loading: false,
      is_saving: false
    };

    it("should be added to items", () => {
      expect(users(state, UsersActions.addedUser(user))).toEqual(expectedState);
    });
  });

  describe('add error', () => {
    const state = { items: { 1: { id: 1, first_name: 'Test', last_name: 'Testov' } }, is_loading: false, is_saving: true };
    const expectedState = { items: { 1: { id: 1, first_name: 'Test', last_name: 'Testov' } }, is_loading: false, is_saving: false };

    it("should be changed adding state", () => {
      expect(users(state, UsersActions.addUserError())).toEqual(expectedState);
    });
  });

  describe('editing', () => {
    const state = { items: { 1: { id: 1, first_name: 'Test', last_name: 'Testov' } }, is_loading: false, is_saving: false };
    const expectedState = { items: { 1: { id: 1, first_name: 'Test', last_name: 'Testov' } }, is_loading: false, is_saving: true };

    it("should be changed editing state", () => {
      expect(users(state, UsersActions.editingUser())).toEqual(expectedState);
    });
  });

  describe('edited', () => {
    const state = { items: { 1: { id: 1, first_name: 'Test', last_name: 'Testov' } }, is_loading: false, is_saving: true };
    const expectedState = { items: { 1: { id: 1, first_name: 'New', last_name: 'Testov' } }, is_loading: false, is_saving: false };

    it("should be changed user and editing state", () => {
      expect(users(state, UsersActions.editedUser(1, { first_name: 'New' }))).toEqual(expectedState);
    });
  });

  describe('edit error', () => {
    const state = { items: { 1: { id: 1, first_name: 'Test', last_name: 'Testov' } }, is_loading: false, is_saving: true };
    const expectedState = { items: { 1: { id: 1, first_name: 'Test', last_name: 'Testov' } }, is_loading: false, is_saving: false };

    it("should be changed editing state", () => {
      expect(users(state, UsersActions.editUserError())).toEqual(expectedState);
    });
  });
});
