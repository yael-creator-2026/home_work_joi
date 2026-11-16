const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
const users = require('./users');
app.use(cors()); 
app.use(express.json()); 
const { addCurrentDate, logGetRequestDate } = require('./middlewares/changeTime.middleware');
app.use(addCurrentDate);
app.use(logGetRequestDate);
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
app.use('/public', express.static(path.join(__dirname, 'public')));   
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}
app.use(helmet());
const { notFound, errorHandler } = require('./middlewares/error.middleware');
app.use('/api', apiRoutes);
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: { error:' חרגת ממספר הבקשות המותר, נסה שוב später.' }
});
app.use(limiter);
// נתיב בדיקה ראשי לשרת
app.get('/', (req, res) => {
  res.send('השרת פועל בהצלחה ומנוהל כ-RESTful API! 🚀');
});


//יצירת מערך ספרים
global.books = [{id: 1,title: 'אביגיל בת חיל ',category: 'ילדים',price: 30,isBorrowed: false, borrowHistory: []},
{id: 2,title: ' אביחיל בן חיל',category: 'ילדים',price: 32,isBorrowed: false, borrowHistory: []}
];
// חיבור ניתוב הראשי
const apiRoutes = require('./routes/index');
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`השרת רץ בכתובת: http://localhost:${PORT}`);
});
app.use(notFound);
app.use(errorHandler);




