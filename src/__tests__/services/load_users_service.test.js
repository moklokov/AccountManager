import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { loadingUsers, loadedUsers } from '../../actions/users'
import loadUsersService from '../../services/load_users_service'
import { user } from '../../__fixtures__/users'

const users = [user];
const api = {
  users: {
    getUsers: ()=> users
  }
}
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);

describe('Load Users Service', () => {
  it("should be changed status and loaded all users", () => {
    const store = mockStore();
    store.dispatch(loadUsersService());
    const actions = store.getActions();
    expect(actions[0]).toEqual(loadingUsers());
    expect(actions[1]).toEqual(loadedUsers(users));
  });

  //TODO integration test with api
});
