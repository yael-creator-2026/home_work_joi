const Joi = require('joi');

//סכמה לספר
    const bookSchema = Joi.object({
    title: Joi.string().min(2).required().messages({
        'string.min': 'שם הספר חייב להכיל לפחות 2 תווים',
        'any.required': 'שדה כותרת הספר הוא חובה'
    }),
    category: Joi.string().required().messages({
        'any.required': 'שדה הקטגוריה הוא חובה'
    }),
    price: Joi.number().positive().required().messages({
        'number.positive': 'המחיר חייב להיות מספר חיובי גדול ממפס אפס',
        'any.required': 'שדה המחיר הוא חובה'
    }),
    isBorrowed: Joi.boolean().optional()
});

// 2. סכמה להרשמת משתמש 
const userSignupSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required().messages({
        'string.alphanum': 'שם המשתמש יכול להכיל אותיות באנגלית ומספרים בלבד',
        'string.min': 'שם המשתמש חייב להכיל לפחות 3 תווים',
        'any.required': 'שדה שם המשתמש הוא חובה'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'הסיסמה חייבת להכיל לפחות 6 תווים',
        'any.required': 'שדה הסיסמה הוא חובה'
    })
});

// 3. סכמה להתחברות משתמש 
const userSigninSchema = Joi.object({
    username: Joi.string().required().messages({
        'any.required': 'שדה שם המשתמש הוא חובה'
    }),
    password: Joi.string().required().messages({
        'any.required': 'שדה הסיסמה הוא חובה'
    })
});
const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        
        if (error) {
            const errorMessages = error.details.map(detail => detail.message);
            const err = new Error(JSON.stringify(errorMessages));
            err.statusCode = 400; 
            err.type = 'validation error';
            err.errorsList = errorMessages; 
            return next(err); 
        }
        next(); 
    };
};

module.exports = {
    validateBook: validate(bookSchema),
    validateSignup: validate(userSignupSchema),
    validateSignin: validate(userSigninSchema)
};



