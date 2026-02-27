import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/upload/images')
    },
    filename: function (req, file, cb) {
        cb(null,`${file.filename}_${Date.now()}${path.extname(file.originalname)}`)
    }
})


export const upload = multer({ storage: storage })