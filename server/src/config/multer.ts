import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

const multerConfig = {
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
        },

        filename: (req, file, cb) => {
            crypto.randomBytes(2, (err,hash) => {
                const fileName = `${hash.toString('hex')}` + path.extname(file.originalname)
                cb(null, fileName);  
            });
        },
    }),
    
    fileFilter: (req:any, file:any, cb:any) => {
        const allowedMimes = [
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/gif"
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);

        } else {
            cb(new Error('Invalid file type.') );
        }
    }
};

export default multerConfig;