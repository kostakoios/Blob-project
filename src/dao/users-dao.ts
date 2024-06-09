import { LoginUserDto } from "../dtos/LoginUser.dtos";
import * as connection from "./connection-wrapper";
import { ServerError } from "../errors/server-error";
import { ErrorType } from "../errors/error-type";
import { CreateUserDto } from "../dtos/CreateUser.dtos";

export async function login(user: LoginUserDto) {
    // UNCOMMENT IN ORDER TO SEE A GENERAL ERROR EXAMPLE
    let sql = "SELECT user_ID as userId, first_name as firstName, email FROM users where email = ? and password = ?";

    let parameters = [user.email, user.password];
    let usersLoginResult: any;

    try {
        usersLoginResult = await connection.executeWithParameters(sql, parameters);
    }
    catch (err: any) {
        // This is an example, for a situation where a TECHNICAL ERROR HAD OCCURED
        // that error threw an exception - WHICH WE WANT TO WRAP with a ServerError
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(user), err);
    }

    // A functional (!) issue which means - the userName + password do not match
    if (usersLoginResult == null || usersLoginResult.length == 0) {
        throw new ServerError(ErrorType.UNAUTHORIZED);
    }

    return usersLoginResult[0];
}

export async function addUser(user: CreateUserDto) {
    // Check if new user email is unique
    let checkUserExistInDB = await isUserExist(user.email);

    if (checkUserExistInDB) {
        throw new ServerError(ErrorType.USER_EMAIL_ALREADY_EXIST);
    } 

    let sql = `INSERT INTO users (first_name, last_name, email, password)  
    values(?, ?, ?, ?)`;
    let parameters = [user.firstName, user.lastName, user.email, user.password];
        
    try {
      return await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
         console.log('koteeeeeeeeeeeeeeeeee');
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
}

async function isUserExist(email: String) {
    // check if user exist in DB
    const sql = `SELECT * FROM blobstoredb.users where email = ? `;
    let parameters = [email];
    try {
      const existingUser: any = await connection.executeWithParameters(sql, parameters);
      return existingUser.length !== 0 ? true : false;
    } catch (e) {
      throw new ServerError(ErrorType.GENERAL_ERROR,JSON.stringify(email), e);
    }
}