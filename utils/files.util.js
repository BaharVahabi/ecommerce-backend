import multer from "multer"
import path from "path"

const diskStorage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, "uploads")
    },

    filename: (request, file, callback) => {
        const ext = path.extname(file.originalname)
        const uniqueName = Date.now()

        callback(null, uniqueName + ext)
    }
})

const uploader = multer({
    storage: diskStorage
})

export { uploader }