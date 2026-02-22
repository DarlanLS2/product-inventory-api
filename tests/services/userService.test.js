import { UserService } from "../../dist/services/userService.js";
import { ValidationError } from "../../dist/errors/ValidationError.js";
import { PasswordEncryptor } from "../../dist/utils/PasswordEncryptor.js";
import { User } from "../../dist/entities/User.js"
import jwt from "jsonwebtoken";
import { NotFoundError } from "../../dist/errors/NotFoundError.js";

jest.mock("../../dist/utils/PasswordEncryptor.js");
jest.mock("jsonwebtoken")
jest.mock("../../dist/entities/User.js")

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

    expect(service.login(body)).rejects.toThrow(NotFoundError)
  })

  it("return null when password does not match stored hash", async () => {
    repository.getByEmail.mockResolvedValue({ passWordHash: "mock" })
    PasswordEncryptor.check.mockResolvedValue(false);

    expect(service.login(body)).rejects.toThrow(NotFoundError)
  })

  it("return auth token when credentials are valid", async () => {
    const token = "asdfasdbadgasdfgadfasdf"
    repository.getByEmail.mockResolvedValue({ passWordHash: "mock" })
    PasswordEncryptor.check.mockResolvedValue(true);
    process.env.JWT_SECRET = "teste"
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
    PasswordEncryptor.encrypt.mockReturnValue("1234")

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

    expect(service.delete(body)).rejects.toThrow(NotFoundError)
  })

  it("return null when password does not match stored hash", async () => {
    repository.getByEmail.mockResolvedValue({ passWordHash: "mock" })
    PasswordEncryptor.check.mockResolvedValue(false);

    expect(service.delete(body)).rejects.toThrow(NotFoundError);
  })

  it("calls repository.delete when credentials are validd", async () => {
    repository.getByEmail.mockResolvedValue({ passWordHash: "mock" })
    PasswordEncryptor.check.mockResolvedValue(true);

    await service.delete(body);

    expect(repository.deleteByEmail).toHaveBeenCalledWith(body.email)
  })
})

