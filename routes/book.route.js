  const bookController = require('../controllers/book.controller');
  const express = require('express');
  const router = express.Router();
const { validateBook } = require('../validators/joi.validator');
router.get('/', bookController.getAll);
router.get('/:id/search', bookController.searckBookByName);
router.get('/:id', bookController.getBookByID);
router.post('/', validateBook, bookController.addBook);
router.post('/:id/borrow', bookController.takeBook);
router.post('/:id/return', bookController.returnBook);
router.post('/:id/upload-image', upload.single('image'), bookController.uploadBookImage);
router.delete('/:id', bookController.deleteTheBook);


module.exports = router;

