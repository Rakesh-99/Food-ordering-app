import express from 'express';
const menuRouters = express.Router();
import uploadFile from '../middleware/multer.config';
import { verifyUserByJwt } from '../middleware/verifyJwtToken';
import { createMenu, updateMenu } from '../controller/menu.controller';





menuRouters
    .post('/create-menu', verifyUserByJwt, uploadFile.single("image"), createMenu)
    .put('/update-menu/:id', verifyUserByJwt, uploadFile.single("image"), updateMenu)

export default menuRouters;