const multer = require('multer');
const path = require('path');

//מיקום שמירה
    const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        const bookId = req.params.id || req.body.bookId || 'book';
        const uniqueSuffix = Date.now();
        const ext = path.extname(file.originalname);
        
        cb(null, `${bookId}-${uniqueSuffix}${ext}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('הקובץ חייב להיות מסוג תמונה בלבד!'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 }, // הגבלה עד 1 מגה-בייט (1MB)
    fileFilter: fileFilter
});

module.exports = upload;