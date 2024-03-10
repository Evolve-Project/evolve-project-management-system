// multer middleware for uploading excel file

const multer = require('multer');
const path = require('path');
const storage = multer.memoryStorage();
exports.upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        if (ext !== '.xlsx' && ext !== '.xls') {
            return cb(new Error('Only excel files are allowed'));
        }
        cb(null, true);
    }
}).single('file');
