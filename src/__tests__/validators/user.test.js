jest.mock("../../api/users");
import "fake-indexeddb/auto";
import validator from "../../validators/user";
import { user } from "../../__fixtures__/users";
import { getUserByUsername, getUserByEmail } from "../../api/users";

describe("User validator", () => {
  const emptyFields = {
    avatar: "",
    username: "",
    password: "",
    repeatPassword: "",
    firstname: "",
    lastname: "",
    birthdate: "",
    email: "",
    gender: "",
    address: "",
    phone: "",
    fax: "",
    company: "",
    githublink: "",
    facebook: "",
    language: "",
    skills: [],
    info: "",
    hobbies: []
  };

  describe("for new user", () => {
    describe("with correct fields", () => {
      it("should be returns empty errors", async () => {
        const errors = await validator(user);
        expect(errors).toEqual({});
      });
    });

    describe("with empty fields", () => {
      it("should be returns 10 errors", async () => {
        const errors = await validator(emptyFields);
        expect(errors).toMatchObject({
          username: ["must be present"],
          password: ["must be present"],
          repeatPassword: ["must be present"],
          firstname: ["must be present"],
          lastname: ["must be present"],
          email: ["must be present"],
          gender: ["must be present"],
          company: ["must be present"],
          language: ["must be present"],
          skills: ["must be selected at least 3x"]
        });
      });
    });

    describe("with invalid fields", () => {
      describe("unique username", () => {
        beforeEach(() => {
          getUserByUsername.mockResolvedValue({ ...user, id: 1 });
        });

        it("should be returns presence username error", async () => {
          const errors = await validator(user);
          expect(errors).toMatchObject({
            username: ["has already been taken"]
          });
        });
      });

      describe("confirm password", () => {
        it("should be returns passwords not match error", async () => {
          const invalidUser = {
            ...user,
            password: "111111",
            repeatPassword: "222222"
          };
          const errors = await validator(invalidUser);
          expect(errors).toMatchObject({
            repeatPassword: ["doesn't match password"]
          });
        });
      });

      describe("unique email", () => {
        beforeAll(() => {
          getUserByEmail.mockResolvedValue({ ...user, id: 1 });
        });

        it("should be returns presence email error", async () => {
          const errors = await validator(user);
          expect(errors).toMatchObject({ email: ["has already been taken"] });
        });
      });

      describe("less skills", () => {
        it("should be returns less skills error", async () => {
          const invalidUser = { ...user, skills: ["Javascript"] };
          const errors = await validator(invalidUser);
          expect(errors).toMatchObject({
            skills: ["must be selected at least 3x"]
          });
        });
      });

      describe("user under 18", () => {
        it("should be returns under 18 error", async () => {
          const invalidUser = { ...user, birthdate: new Date() };
          const errors = await validator(invalidUser);
          expect(errors).toMatchObject({
            birthdate: ["have not reached 18 years"]
          });
        });
      });

      describe("information length more 300 symbols", () => {
        it("should be returns more 300 symbols error", async () => {
          let info = "";
          for (var i = 0; i < 300; i++) {
            info += i;
          }
          const invalidUser = { ...user, info: info };
          const errors = await validator(invalidUser);
          expect(errors).toMatchObject({
            info: ["no more than 300 characters"]
          });
        });
      });
    });
  });

  describe("for persisted user", () => {
    beforeEach(() => {
      getUserByUsername.mockResolvedValue(createdUser);
      getUserByEmail.mockResolvedValue(createdUser);
    });

    const createdUser = { ...user, id: 1 };

    describe("with correct fields", () => {
      it("should be returns empty errors", async () => {
        const updateUser = { ...createdUser, firstname: "update firstname" };
        const errors = await validator(updateUser);
        expect(errors).toEqual({});
      });
    });

    describe("with invalid fields", () => {
      it("should be returns correct errors", async () => {
        const secondUser = { ...createdUser, id: 2 };
        const errors = await validator(secondUser);
        expect(errors).toEqual({
          username: ["has already been taken"],
          email: ["has already been taken"]
        });
      });
    });

    describe("with empty fields", () => {
      it("should be returns 10 errors", async () => {
        const errors = await validator({ ...emptyFields, id: 1 });
        expect(errors).toMatchObject({
          username: ["must be present"],
          password: ["must be present"],
          repeatPassword: ["must be present"],
          firstname: ["must be present"],
          lastname: ["must be present"],
          email: ["must be present"],
          gender: ["must be present"],
          company: ["must be present"],
          language: ["must be present"],
          skills: ["must be selected at least 3x"]
        });
      });
    });
  });
});
