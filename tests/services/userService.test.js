import { UserService } from "../src/services/userService.js";
import { ValidationError } from "../src/errors/ValidationError.js";
import { PassWordEncryptor } from "../src/utils/PassWordEncryptor.js";
import { User } from "../src/entities/User.js"
import jwt from "jsonwebtoken";

jest.mock("../src/utils/PassWordEncryptor.js");
jest.mock("jsonwebtoken")
jest.mock("../src/entities/User.js")

let repository;
let service;
let body;

describe("login", () => {
  beforeEach(() => {
    repository = {
      getByEmail: jest.fn()
    }

    service = new UserService(repository);

    body = { email: "randon@gmail.com", passWord: "1234" }
  })

  it("throws ValidationError when user is not found", async () => {
    repository.getByEmail.mockResolvedValue(null)

    expect(service.login(body)).rejects.toThrow(ValidationError)
  })

  it("return null when password does not match stored hash", async () => {
    repository.getByEmail.mockResolvedValue({ passWordHash: "mock" })
    PassWordEncryptor.check.mockResolvedValue(false);

    expect(service.login(body)).resolves.toBeNull();
  })

  it("return auth token when credentials are valid", async () => {
    const token = "asdfasdbadgasdfgadfasdf"
    repository.getByEmail.mockResolvedValue({ passWordHash: "mock" })
    PassWordEncryptor.check.mockResolvedValue(true);
    jwt.sign.mockReturnValue(token);

    expect(service.login(body)).resolves.toEqual({ token: token });
  })
})

describe("register", () => {
  beforeEach(() => {
    repository = {
      register: jest.fn()
    }
    service = new UserService(repository);

    body = { email: "randon@gmail.com", passWord: "1234" }
  })

  it("calls repository.register when user is valid", async () => {
    const user = {
      id: null,
      email: "randon@gmail.com",
      passWordHash: "1234"
    }
    User.mockImplementation(() => (user));
    PassWordEncryptor.encrypt.mockReturnValue("1234")

    await service.register(body);

    expect(repository.register).toHaveBeenCalledWith(user)
  })
})

describe("delete", () => {
  beforeEach(() => {
    repository = {
      getByEmail: jest.fn(),
      deleteByEmail: jest.fn()
    }
    service = new UserService(repository);

    body = { email: "randon@gmail.com", passWord: "1234" }
  })
  
  it("throws ValidationError when user is not found", async () => {
    repository.getByEmail.mockResolvedValue(null)

    expect(service.delete(body)).rejects.toThrow(ValidationError)
  })

  it("return null when password does not match stored hash", async () => {
    repository.getByEmail.mockResolvedValue({ passWordHash: "mock" })
    PassWordEncryptor.check.mockResolvedValue(false);

    expect(service.delete(body)).resolves.toBeNull();
  })

  it("calls repository.delete when credentials are valid", async () => {
    repository.getByEmail.mockResolvedValue({ passWordHash: "mock" })
    PassWordEncryptor.check.mockResolvedValue(true);

    await service.delete(body);

    expect(repository.deleteByEmail).toHaveBeenCalledWith(body.email)
  })
})

