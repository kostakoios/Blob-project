import { Request, Response, NextFunction } from "express";
import * as filesLogic from "../logic/files-logic";
import { CreateDirectoryDto } from "../dtos/CreateDirectory.dtos";
import * as usersLogic from "../logic/users-logic";
import { CopyDirectoryDto } from "../dtos/CopyDirectory.dtos";
import { MoveDirectoryDto } from "../dtos/MoveDirectory.dtos";

export async function createDirectory(
    request: Request<{}, {}, CreateDirectoryDto>, 
    response: Response<String[]>,
    next: NextFunction
) {
    console.log(request.body, "request body");
    let folderCreationData = request.body;
    let folderData = { ...folderCreationData };
    try {
      let extractTokenFromRequestHeader = await filesLogic.extractToken(request); 
      let getUserIdFromToken = await usersLogic.getIdFromToken(extractTokenFromRequestHeader);
      let successfulCreatedFolder: any = await filesLogic.addFolder(folderData, getUserIdFromToken);
      response.status(201).send(successfulCreatedFolder.message);
    } catch (error) {
      return next(error);
    }
}

export async function deleteDirectory(
    request: Request<{}, {}, CreateDirectoryDto>, 
    response: Response,
    next: NextFunction
) {
    console.log(request.body, "request body");
    let folderDeletionData = request.body;
    let folderData = { ...folderDeletionData };
    try {
      let extractTokenFromRequestHeader = await filesLogic.extractToken(request); 
      let getUserIdFromToken = await usersLogic.getIdFromToken(extractTokenFromRequestHeader);
      let successfulCreatedFolder: any = await filesLogic.deleteFolder(folderData, getUserIdFromToken);
      response.status(204).send(successfulCreatedFolder.message);
    } catch (error) {
      return next(error);
    }
}

export async function copyDirectory(
    request: Request<{}, {}, CopyDirectoryDto>, 
    response: Response,
    next: NextFunction
){
    console.log(request.body, "request body");
    let folderDeletionData = request.body;
    let folderData = { ...folderDeletionData };
    try {
      let extractTokenFromRequestHeader = await filesLogic.extractToken(request); 
      let getUserIdFromToken = await usersLogic.getIdFromToken(extractTokenFromRequestHeader);
      let successfulCreatedFolder: any = await filesLogic.copyFolder(folderData, getUserIdFromToken);
      response.status(200).send(successfulCreatedFolder.message);
    } catch (error) {
      return next(error);
    }   
}

export async function moveDirectory(
    request: Request<{}, {}, MoveDirectoryDto>, 
    response: Response,
    next: NextFunction
){
    console.log(request.body, "request body");
    let folderDeletionData = request.body;
    let folderData = { ...folderDeletionData };
    try {
      let extractTokenFromRequestHeader = await filesLogic.extractToken(request); 
      let getUserIdFromToken = await usersLogic.getIdFromToken(extractTokenFromRequestHeader);
      let successfulCreatedFolder: any = await filesLogic.moveFolder(folderData, getUserIdFromToken);
      console.log('successfulCreatedFolder: ', successfulCreatedFolder);
      response.status(200).send(successfulCreatedFolder.message);
    } catch (error) {
      return next(error);
    }   
}

export async function listDirectory(
    request: Request, 
    response: Response,
    next: NextFunction
){
    console.log(request.body, "request body");
    let folderDeletionData = request.body;
    let folderData = { ...folderDeletionData };
    try {
      let extractTokenFromRequestHeader = await filesLogic.extractToken(request); 
      let getUserIdFromToken = await usersLogic.getIdFromToken(extractTokenFromRequestHeader);
      let successfulCreatedFolder: any = await filesLogic.listDirectory(folderData, getUserIdFromToken);
      console.log('successfulCreatedFolder: ', successfulCreatedFolder);
      response.status(200).send(successfulCreatedFolder);
    } catch (error) {
      return next(error);
    }   
}


export async function writeFile( 
    request: Request, 
    response: Response,
    next: NextFunction
) {
    console.log(request.file, "request file");
    let requestPath = request.body.path;
    let fileData = request.file;
    let getFileData = { ...fileData };
    try {
      let extractTokenFromRequestHeader = await filesLogic.extractToken(request); 
      console.log('extractTokenFromRequestHeader: ', extractTokenFromRequestHeader);
      let getUserIdFromToken = await usersLogic.getIdFromToken(extractTokenFromRequestHeader);
      console.log('getUserIdFromToken: ', getUserIdFromToken);
      let successfulCreatedFolder: any = await filesLogic.writeFile(getFileData, requestPath, getUserIdFromToken);
      console.log('successfulCreatedFolder: ', successfulCreatedFolder);
      response.status(200).send(successfulCreatedFolder);
    } catch (error) {
      return next(error);
    }   
}