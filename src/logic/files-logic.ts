import fs from "fs-extra";
import path from "path"; // Import the path module
import { Request } from "express";
import { CreateDirectoryDto } from "../dtos/CreateDirectory.dtos";
import { ServerError } from "../errors/server-error";
import { ErrorType } from "../errors/error-type";
import { CopyDirectoryDto } from "../dtos/CopyDirectory.dtos";
import { MoveDirectoryDto } from "../dtos/MoveDirectory.dtos";
import { FsNode } from "../dtos/FsNode.dtos";
import { Blob } from "buffer";

export async function addFolder(
  folderData: CreateDirectoryDto,
  getUserIdFromToken: string
) {
  const baseDir = path.resolve(__dirname, `../storage/${getUserIdFromToken}`);
  try {
    // Check if userId directory exists
    const userDirectoryExists = await fs.pathExists(baseDir);
    if (!userDirectoryExists) {
      // Create userId directory if it does not exist
      await fs.mkdirs(baseDir);
    }
    // Resolve the full path to ensure it's within the baseDir
    const fullPath = path.resolve(baseDir, folderData.path);
    // Check to prevent directory traversal attacks
    if (!fullPath.startsWith(baseDir)) {
      throw new ServerError(ErrorType.CREATING_DIRECTORY_ERROR);
    }
    // Create the new directory within the userId directory
    await fs.mkdirs(fullPath);
    return { message: "Directory created successfully" };
  } catch (error) {
    throw new ServerError(ErrorType.CREATING_DIRECTORY_ERROR);
  }
}

export async function deleteFolder(
  folderData: CreateDirectoryDto,
  getUserIdFromToken: string
) {
  const baseDir = path.resolve(__dirname, `../storage/${getUserIdFromToken}`);
  try {
    // Check if userId directory exists
    const userDirectoryExists = await fs.pathExists(baseDir);
    if (!userDirectoryExists) {
      // directory does not exist
      throw new Error("Path is Invalid");
    }
    // Resolve the full path to ensure it's within the baseDir
    const fullPath = path.resolve(baseDir, folderData.path);
    // Check to prevent directory traversal attacks
    if (!fullPath.startsWith(baseDir)) {
      throw new ServerError(ErrorType.CREATING_DIRECTORY_ERROR);
    }
    // Create the new directory within the userId directory
    await fs.remove(fullPath);
    return { message: "Directory Deleted successfully" };
  } catch (error) {
    throw new ServerError(ErrorType.CREATING_DIRECTORY_ERROR);
  }
}

export async function copyFolder(
  folderData: CopyDirectoryDto,
  getUserIdFromToken: string
) {
  const baseDir = path.resolve(__dirname, `../storage/${getUserIdFromToken}`);
  try {
    // Check if userId directory exists
    const userDirectoryExists = await fs.pathExists(baseDir);
    if (!userDirectoryExists) {
      throw new Error("User directory does not exist");
    }

    // Resolve full paths for old and new directories
    const oldFullPath = path.resolve(baseDir, folderData.oldPath);
    const newFullPath = path.resolve(baseDir, folderData.newPath);

    // Check if old directory exists
    const oldDirectoryExists = await fs.pathExists(oldFullPath);
    if (!oldDirectoryExists) {
      throw new Error("Old directory does not exist");
    }

    // Copy the old directory to the new directory
    await fs.copy(oldFullPath, newFullPath);

    return { message: "Directory copied successfully" };
  } catch (error: any) {
    console.error("Error copying directory:", error.message);
    throw new ServerError(ErrorType.CREATING_DIRECTORY_ERROR);
  }
}

export async function moveFolder(
  folderData: MoveDirectoryDto,
  getUserIdFromToken: string
) {
  const baseDir = path.resolve(__dirname, `../storage/${getUserIdFromToken}`);
  try {
    // Check if userId directory exists
    const userDirectoryExists = await fs.pathExists(baseDir);
    if (!userDirectoryExists) {
      throw new Error("User directory does not exist");
    }

    // Resolve full paths for old and new directories
    const oldFullPath = path.resolve(
      baseDir,
      folderData.sourceDir,
      folderData.folderName
    );
    const newFullPath = path.resolve(
      baseDir,
      folderData.targetDir,
      folderData.folderName
    );

    // Check if old directory exists
    const oldDirectoryExists = await fs.pathExists(oldFullPath);
    if (!oldDirectoryExists) {
      throw new Error("Old directory does not exist");
    }
    console.log("oldFullPath: " + oldFullPath);
    console.log("newFullPath: " + newFullPath);
    // Move the old directory to the new directory
    await fs.move(oldFullPath, newFullPath);

    return { message: "Directory moved successfully" };
  } catch (error: any) {
    console.error("Error moving directory:", error.message);
    throw new ServerError(ErrorType.CREATING_DIRECTORY_ERROR);
  }
}

export async function listDirectory(
  folderData: any,
  getUserIdFromToken: string
): Promise<FsNode[]> {
  const baseDir = path.resolve(__dirname, `../storage/${getUserIdFromToken}`);
  console.log('baseDir: ', baseDir);
  try {
    // Check if userId directory exists
    const userDirectoryExists = await fs.pathExists(baseDir);
    if (!userDirectoryExists) {
      throw new Error("User directory does not exist");
    }
    // Resolve the full path to ensure it's within the baseDir
    const dirPath = path.resolve(baseDir, folderData.dirPath);
    const items = await fs.readdir(dirPath, { withFileTypes: true });
    const fsNodes: FsNode[] = items.map((item) => {
      const fullPath = path.join(dirPath, item.name);
      const storageIndex = fullPath.indexOf('storage') + 8; // Length of 'storage\\' is 8
      const shortPath = fullPath.substring(storageIndex).replace(/\\/g, '/'); // Replace backslashes with forward slashes;
      return {
        name: item.name,
        path: shortPath,
        isDirectory: item.isDirectory(),
      }
      
    });
    return fsNodes;
  } catch (error: any) {
    console.error("Error moving directory:", error.message);
    throw new ServerError(ErrorType.CREATING_DIRECTORY_ERROR);
  }
}

// Start of files functions
export async function writeFile(fileData: any, requestPath: string, getUserIdFromToken: string) {
  try {
    console.log("file data: ", fileData);
    const userId = getUserIdFromToken;
    const baseDir = path.resolve(__dirname, `../storage/${userId}`);
    // Check if userId directory exists
    const userDirectoryExists = await fs.pathExists(baseDir);
    if (!userDirectoryExists) {
      throw new Error("User directory does not exist");
    }
    // Resolve the full path to ensure it's within the baseDir
    const fullPath = path.resolve(baseDir, requestPath);
    // Ensure the user's storage directory exists
    await fs.mkdirs(fullPath);
    // Convert the file content to a Blob
    const file = fileData;
    const blob = new Blob([file.buffer], { type: file.mimetype });
    console.log("fullPath: " + fullPath);
    // Define the path to save the file
    const filePath = path.join(fullPath, file.originalname);

    // Save file data into the mySQL database 
        // await filessDao.addfile(user);
  
        // originalname: 'PrintReceiptReport.pdf',
        // mimetype: 'application/pdf',
        // size: 161659
      
    // Save the Blob to the file
    await fs.writeFile(filePath, Buffer.from(await blob.arrayBuffer()));
    return {message: "File uploaded and saved successfully"}
  } catch (error) {
    throw new Error("Error uploading file:" + error);
  }
}

export async function extractToken(req: Request) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  throw new Error("Invalid authorization");
}