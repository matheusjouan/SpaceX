import path from 'path';
import multer from 'multer';

const uploadFolder = path.resolve(__dirname, '..', '..', 'upload');

export default {
  directory: uploadFolder,

  storage: multer.diskStorage({
    destination: uploadFolder,
    filename: (request, file, cb) => {
      const fileName = `${Date.now()}-${file.originalname}`;

      cb(null, fileName);
    },
  }),
};
