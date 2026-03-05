import {Router} from 'express'
const route = Router()
import {upload} from '../Middleware/multer.js'
import {uploadOnCloudinary} from '../Controllers/file.controller.js'


route.post(
    '/upload',
    upload.single('image'),
    uploadOnCloudinary
)


export default route