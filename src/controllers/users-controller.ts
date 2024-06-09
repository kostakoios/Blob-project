import { Request, Response, NextFunction } from "express";
import { CreateUserDto } from "../dtos/CreateUser.dtos";
import { CreateUserQueryParams } from "../types/query-params";
import { User } from "../types/response";
import * as usersLogic from "../logic/users-logic";
import { LoginUserDto } from "../dtos/LoginUser.dtos";


export async function createUser(
    request: Request<{}, {}, CreateUserDto, CreateUserQueryParams>, 
    response: Response,
    next: NextFunction
) {
    console.log(request.body, "request body");
    let registrationData = request.body;
    let loginData = { ...registrationData };
    try {
      let successfulRegisterData: any = await usersLogic.addUser(registrationData);
      let user = {
        email: loginData.email,
        password: loginData.password,
      };
    //   await shoppingCartsLogic.addShoppingCart(registrationData.id);
      let successfulLoginData: any;
      if (successfulRegisterData) {
        successfulLoginData = await usersLogic.login(user);
      }
      let userId = await usersLogic.getIdFromToken(successfulLoginData.token);
      console.log("userId: ", userId);
      response.status(201).send(successfulLoginData);
    } catch (error) {
      return next(error);
    }
}

export async function userLogin(
    request: Request<{}, {}, LoginUserDto, CreateUserQueryParams>, 
    response: Response,
    next: NextFunction
) {
    let user = request.body;
    try {
        let successfulLoginData = await usersLogic.login(user);
        console.log("controller", successfulLoginData);
        response.send(successfulLoginData);
    }catch(error){
        return next(error);
    }
}