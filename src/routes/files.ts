import { Router } from "express";
import { createDirectory, 
    deleteDirectory, 
    copyDirectory, 
    moveDirectory, 
    listDirectory, 
    writeFile,
    readFile,
    deleteFile,
    copyFile,
    moveFile,
    getInfo
  } from "../controllers/files-controller";
import multer from "multer";
import path from "path";

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

// /api/files/writeFile
router.post('/writeFile', writeFile);

// /api/files/readFile
router.post('/readFile', readFile);

// /api/files/deleteFile
router.post('/deleteFile', deleteFile);

// /api/files/copyFile
router.post('/copyFile', copyFile);

// /api/files/moveFile
router.post('/moveFile', moveFile);

// /api/files/moveFile
router.get('/getInfo', getInfo);


// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../storage'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// /api/files/writeFile
router.post('api/files/writeFile',  upload.single('file'), writeFile);

export default router;