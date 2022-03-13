// // backend/utils/validation.js
// const { validationResult, check } = require("express-validator");

// // middleware for formatting errors from express-validator middleware
// // (to customize, see express-validator's documentation)
// const handleValidationErrors = (req, _res, next) => {
//     const validationErrors = validationResult(req);

//     if (!validationErrors.isEmpty()) {
//       const errors = validationErrors.array().map((error) => `${error.msg}`);

//       const err = Error("Bad request.");
//       err.errors = errors;
//       err.status = 400;
//       err.title = "Bad request.";
//       next(err);
//     }
//     next();
// };

// const validateLogin = [
//     check("credential")
//       .exists({ checkFalsy: true })
//       .notEmpty()
//       .withMessage("you must enter a username and email"),
//     check("password")
//       .exists({ checkFalsy: true })
//       .withMessage("you must enter a password"),
//     handleValidationErrors,
// ];

// const validateSignup = [
//     check("username")
//       .exists({ checkFalsy: true })
//       .isLength({ min: 3 })
//       .withMessage("Your username must have at least 3 characters"),
//     check("email")
//       .exists({ checkFalsy: true })
//       .isEmail()
//       .withMessage("You must provide a valid email"),
//     check("username").not().isEmail().withMessage("You must enter a username seperate from your email"),
//     check("password")
//       .exists({ checkFalsy: true })
//       .isLength({ min: 5 })
//       .withMessage("password must be 5 characters or more"),
//     handleValidationErrors,
// ];

// const validateBusiness = [
//     check('title')
//         .exists({ checkFalsy: true })
//         .withMessage('You must provide a title')
//         .isLength({ max: 100 })
//         .withMessage('Title must be shorter than 100 characters'),
//     check('address')
//         .exists({ checkFalsy: true })
//         .withMessage('You must provide an address')
//         .isLength({ max: 50 })
//         .withMessage('Address must be shorter than 50 characters'),
//     check('city')
//         .exists({ checkFalsy: true })
//         .withMessage('You must provide city')
//         .isLength({ max: 85 })
//         .withMessage('City must be shorter than 85 characters'),
//     check('state')
//         .exists({ checkFalsy: true })
//         .withMessage('You must provide an address')
//         .isLength({ max: 50 })
//         .withMessage('Address must be shorter than 50 characters'),
//     check('zipCode')
//         .exists({ checkFalsy: true })
//         .withMessage('You must provide an address')
//         .isLength({ max: 10 })
//         .withMessage('Address must be shorter than 10 characters'),
//     handleValidationErrors
// ];

// const validateBusinessEdit = [
//     check('title')
//         .exists({ checkFalsy: true })
//         .withMessage('You must provide a title')
//         .isLength({ max: 100 })
//         .withMessage('Title must be shorter than 100 characters'),
//     check('address')
//         .exists({ checkFalsy: true })
//         .withMessage('You must provide an address')
//         .isLength({ max: 50 })
//         .withMessage('Address must be shorter than 50 characters'),
//     check('city')
//         .exists({ checkFalsy: true })
//         .withMessage('You must provide city')
//         .isLength({ max: 85 })
//         .withMessage('City must be shorter than 85 characters'),
//     check('state')
//         .exists({ checkFalsy: true })
//         .withMessage('You must provide an address')
//         .isLength({ max: 50 })
//         .withMessage('Address must be shorter than 50 characters'),
//     check('zipCode')
//         .exists({ checkFalsy: true })
//         .withMessage('You must provide an address')
//         .isLength({ max: 10 })
//         .withMessage('Address must be shorter than 10 characters'),
//     handleValidationErrors
// ];

// const validateReview = [
//     check('rating')
//         .exists({ checkFalsy: true })
//         .withMessage('You must provide a rating'),
//     handleValidationErrors
// ];

// module.exports = {
//   handleValidationErrors,
//   validateLogin,
//   validateSignup,
//   validateBusiness,
//   validateBusinessEdit,
//   validateReview,
// };
