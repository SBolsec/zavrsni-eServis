import multer from 'multer';

const storage = multer.diskStorage({
    filename: function (_req: any, file: any, cb: any) {
        cb(null, file.originalname)
    }
});

export const upload = multer({
    storage: storage
});