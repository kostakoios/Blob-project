import { LoginUserDto } from "../dtos/LoginUser.dtos";
import crypto from "node:crypto";
import * as usersDao from "../dao/users-dao";
import jwt from "jsonwebtoken";
import * as config from "../config.json";
import { CreateUserDto } from "../dtos/CreateUser.dtos";
import { ServerError } from "../errors/server-error";
import { ErrorType } from "../errors/error-type";
import * as usersCache from "../dao/cache-module";

const saltRight = "sdkjfhdsk@#!!a12452jhdsf@!";
const saltLeft = "--mnlcfs;@!dsafadf35211$dsg$#";

interface JwtPayload {
    sub: string;
    userId: string;
    iat?: number;
    exp?: number;
}

async function hashPassword(password: string) {
    let newPassword = crypto
      .createHash("md5")
      .update(saltLeft + password + saltRight)
      .digest("hex");
    return newPassword;  
}

async function validateLoginUserDetails(user: LoginUserDto) {
    if (!user.email) throw new ServerError(ErrorType.INVALID_USER_EMAIL);
    if (!user.password) throw new ServerError(ErrorType.INVALID_USER_PASSWORD);
}
  
async function validateRegisterUserDetails(user: CreateUserDto) {
    if (!user.firstName) throw new ServerError(ErrorType.MISSING_FIRST_NAME);
    if (!user.lastName) throw new ServerError(ErrorType.MISSING_LAST_NAME);
    if (!user.email) throw new ServerError(ErrorType.INVALID_USER_EMAIL);
    if (!user.password) throw new ServerError(ErrorType.INVALID_USER_PASSWORD);
}

export async function login(user: LoginUserDto) {
  console.log(user, "user");
  await validateLoginUserDetails(user);
  console.log('I am now in the logic of login function');
  user.password = await hashPassword(user.password);
  console.log("user.password: ", user.password);
  let userLoginData = await usersDao.login(user);

  // Do something with cache and stuff.. token....
    const token = jwt.sign({sub: userLoginData.email, userId: userLoginData.userId}, config.secret, { expiresIn: "7d"});
    console.log("token: ", token);
    usersCache.set(token, userLoginData);

    return { token, firstName: userLoginData.firstName };
}

export async function addUser(user: CreateUserDto) {
  // Validations
  await validateRegisterUserDetails(user);

  user.password = await hashPassword(user.password);

  console.log("Hashed password: " + user.password);

  return await usersDao.addUser(user);
}

// Function to verify the token and extract the email
export async function getIdFromToken(token: any) {
    try {
      const decoded = jwt.verify(token, config.secret) as JwtPayload;
      return decoded.userId;
    } catch (err) {
      throw new Error('Invalid token');
    }
}