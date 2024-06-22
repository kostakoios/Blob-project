import { Request, Response, NextFunction } from "express";
import * as filesLogic from "../logic/files-logic";
import { CreateDirectoryDto } from "../dtos/CreateDirectory.dtos";
import * as usersLogic from "../logic/users-logic";
import { CopyDirectoryDto } from "../dtos/CopyDirectory.dtos";
import { MoveDirectoryDto } from "../dtos/MoveDirectory.dtos";
import path from "path";

export async function createDirectory(
    request: Request<{}, {}, CreateDirectoryDto>, 
    response: Response<String[]>,
    next: NextFunction,
) {
    console.log(request.body, "request body");
    let folderCreationData = request.body;
    let folderData = { ...folderCreationData };
    try {
      let extractTokenFromRequestHeader = await filesLogic.extractToken(request); 
      let getUserIdFromToken = await usersLogic.getIdFromToken(extractTokenFromRequestHeader);
      let successfulCreatedFolder: any = await filesLogic.addFolder(folderData, getUserIdFromToken);
      return response.status(201).send(successfulCreatedFolder.message);
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
      let successfulCreatedFolder = await filesLogic.listDirectory(folderData, getUserIdFromToken);
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
  if (!request.file) {
    return response.status(400).send('No file uploaded');
  }
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
      return response.status(200).send(successfulCreatedFolder); 
    } catch (error) {
      return next(error);
    }   
}

export async function readFile( 
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
    return response.status(200).send(successfulCreatedFolder); 
  } catch (error) {
    return next(error);
  }   
}


export async function deleteFile( 
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
    return response.status(200).send(successfulCreatedFolder); 
  } catch (error) {
    return next(error);
  }   
}


export async function copyFile( 
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
    return response.status(200).send(successfulCreatedFolder); 
  } catch (error) {
    return next(error);
  }   
}


export async function moveFile( 
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
    return response.status(200).send(successfulCreatedFolder); 
  } catch (error) {
    return next(error);
  }   
}


export async function getInfo( 
  request: Request, 
  response: Response,
  next: NextFunction
) {
  // console.log('I am hereeeeeeeeeee!')
  // const filename = "c39b2ffd-2e73-11ef-b0f9-00155d6a9c8d/nikusha/jamson/koka.txt";
  console.log('I am hereeeeeeeeeee!');
  const filename = request.query.filePath;
  if (!filename) {
    return response.status(400).send('File path is required');
  }
  if (typeof filename !== 'string') {
    return response.status(400).send('File path is required and must be a string');
  }

  const filePath = path.resolve(__dirname, '../storage', filename.replace(/\\/g, '/'));
  console.log("filePath: ", filePath);

  try {
    let extractTokenFromRequestHeader = await filesLogic.extractToken(request); 
    console.log('extractTokenFromRequestHeader: ', extractTokenFromRequestHeader);
    let getUserIdFromToken = await usersLogic.getIdFromToken(extractTokenFromRequestHeader);
    console.log('getUserIdFromToken: ', getUserIdFromToken);
    // let successfulCreatedFolder: any = await filesLogic.writeFile(getFileData, requestPath, getUserIdFromToken);
    // console.log('successfulCreatedFolder: ', successfulCreatedFolder);
    // return response.status(200).send(successfulCreatedFolder); 
    response.sendFile(filePath, (err) => {
      if (err) {
        response.status(404).send('File not found');
      }
    });
  } catch (error) {
    return next(error);
  }   
}