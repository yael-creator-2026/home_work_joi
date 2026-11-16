const notFound = (req, res, next) => {
    const error = new Error(`הנתיב המבוקש ${req.originalUrl} לא נמצא`);
    res.status(404);
    next(error); 
};

const errorHandler = (err, req, res, next) => {
    // אם הסטטוס הוא 200 בטעות למרות שיש שגיאה, נשנה אותו ל-500 (שגיאת שרת כללית)
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    const errorResponse = {
        error: {
            message: err.message || 'שגיאת שרת פנימית',
            type: 'server error'
        }
    };

    if (process.env.NODE_ENV !== 'production') {
        errorResponse.error.stack = err.stack;
    }

    res.status(statusCode).json(errorResponse);
};

module.exports = {
    notFound,
    errorHandler
};