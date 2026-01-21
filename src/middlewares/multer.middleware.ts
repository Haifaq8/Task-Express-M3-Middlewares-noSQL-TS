import multer from "multer";

const storage = multer.diskStorage({
    destination: (_req, file, cb) => {
        cb(null, "media");
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
    },
});

export const upload = multer({ storage });
