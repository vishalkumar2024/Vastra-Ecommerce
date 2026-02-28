import multer from "multer"
import path from 'path'


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/upload/images');
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const name = file.originalname.split('.')[0];

        cb(null, `${name}_${Date.now()}${ext}`);
    }
});


export const upload = multer({ storage: storage })