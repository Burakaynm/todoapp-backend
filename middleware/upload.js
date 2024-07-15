const multer = require('multer');
const path = require('path');

// File filter for multer to only allow specific file types
const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.gif' && ext !== '.pdf' && ext !== '.doc' && ext !== '.docx') {
        return cb(new Error('Only images and certain files are allowed'), false);
    }
    cb(null, true);
};

// Storage configuration for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

module.exports = upload;
