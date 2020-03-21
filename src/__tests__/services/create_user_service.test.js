import "fake-indexeddb/auto";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import {
  processingUsers,
  validationUserErrors,
  addedUser
} from "../../actions/users";
import createUserService from "../../services/create_user_service";
import { user } from "../../__fixtures__/users";
import api from "../../api";

describe("Create User Service", () => {
  beforeEach(async () => {
    await api.users.clear();
    store.clearActions();
  });

  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore();

  describe("with valid attributes", () => {
    it("should be dispatch processing and added actions", async () => {
      await store.dispatch(createUserService(user));
      const actions = store.getActions();
      expect(actions).toHaveLength(2);
      expect(actions[0]).toEqual(processingUsers());
      expect(actions[1]).toMatchObject(addedUser(user));
    });

    it("should be created user", async () => {
      await store.dispatch(createUserService(user));
      const users = await api.users.getUsers();
      expect(users).toHaveLength(1);
      expect(users[0]).toHaveProperty("username", user.username);
    });
  });

  describe("with invalid attributes", () => {
    beforeEach(() => {
      user.username = "";
    });

    it("should be dispatch processing and validation errors actions", async () => {
      await store.dispatch(createUserService(user));
      const actions = store.getActions();
      expect(actions).toHaveLength(2);
      expect(actions[0]).toEqual(processingUsers());
      expect(actions[1]).toEqual(
        validationUserErrors({ username: ["must be present"] })
      );
    });

    it("should be not created user", async () => {
      await store.dispatch(createUserService(user));
      const users = await api.users.getUsers();
      expect(users).toHaveLength(0);
    });
  });
});
