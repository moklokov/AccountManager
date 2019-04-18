import 'fake-indexeddb/auto'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import api from '../../api'
import { processingUsers, loadedUsers } from '../../actions/users'
import loadUsersService from '../../services/load_users_service'
import { user } from '../../__fixtures__/users'

describe('Load Users Service', () => {
  const users = [user];
  const mockApi = {
    users: {
      getUsers: ()=> users
    }
  }
  const middlewares = [thunk.withExtraArgument(mockApi)];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore();

  it("should be changed status and loaded all users", async () => {
    await store.dispatch(loadUsersService());
    const actions = store.getActions();
    expect(actions[0]).toEqual(processingUsers());
    expect(actions[1]).toEqual(loadedUsers(users));
  });

  describe('integration api', () => {
    const middlewares = [thunk.withExtraArgument(api)];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore();

    it("should be loaded one user", async () => {
      const createdUser = await api.users.createUser(user);
      await store.dispatch(loadUsersService());
      const actions = store.getActions();
      expect(actions[1]).toMatchObject(loadedUsers([createdUser]))
    });
  });
});
