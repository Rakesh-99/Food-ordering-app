import multer from 'multer';
import { v4 as uuid } from 'uuid';
import { unlink } from 'fs';

// multer config  : 

const storage = multer.diskStorage({

    // diskStorage takes two functions : 

    // 1. destination 
    destination: function (req, file, callback) {
        callback(null, './public/uploads');
    },

    // 2. Filename 
    filename: function (req, file, callback) {
        const generateFileName = uuid();
        callback(null, file.originalname + "" + generateFileName);
    }
});

const uploadFile = multer({ storage });

export default uploadFile;