import "fake-indexeddb/auto";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import api from "../../api";
import {
  processingUsers,
  validationUserErrors,
  editedUser
} from "../../actions/users";
import updateUserService from "../../services/update_user_service";
import { user } from "../../__fixtures__/users";

describe("Update User Service", () => {
  beforeEach(async () => {
    await api.users.clear();
    store.clearActions();
  });

  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore();

  const attrs = { firstname: "New user", updatedAt: new Date() };

  it("should be changed status and update user", async () => {
    const createdUser = await api.users.createUser(user);
    const updateUser = { ...createdUser, ...attrs };
    await store.dispatch(updateUserService(createdUser.id, attrs));
    const actions = store.getActions();
    expect(actions[0]).toEqual(processingUsers());
    expect(actions[1]).toEqual(editedUser(createdUser.id, updateUser));
  });

  it("should be changed user", async () => {
    const createdUser = await api.users.createUser(user);
    const updateUser = { ...createdUser, firstname: "New user" };
    await store.dispatch(updateUserService(createdUser.id, updateUser));
    const users = await api.users.getUsers();
    expect(users).toHaveLength(1);
    expect(users[0]).toMatchObject(updateUser);
  });
});
