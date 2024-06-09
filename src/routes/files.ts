import { Router } from "express";
import { createDirectory, 
    deleteDirectory, 
    copyDirectory, 
    moveDirectory, 
    listDirectory, 
    writeFile } from "../controllers/files-controller";
import multer from "multer";

const router = Router();

// /api/files/createDirectory
router.post('/createDirectory', createDirectory);

// /api/files/deleteDirectory
router.post('/deleteDirectory', deleteDirectory);

// /api/files/copyDirectory
router.post('/copyDirectory', copyDirectory);

// /api/files/moveDirectory
router.post('/moveDirectory', moveDirectory);

// /api/files/listDirectory
router.post('/listDirectory', listDirectory);

// Set up multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// /api/files/writeFile
router.post('/writeFile',  upload.single('file'), writeFile);

export default router;