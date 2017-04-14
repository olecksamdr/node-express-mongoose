const winston = require('winston');
const Book = require('../models/book');
const requireAithentication = require('../../config/passport/requireAuthentication');


const handleError = (res, onSuccess) => (err, result) => {
  if (err) {
    winston.error(err);
    res.status(500).send('Unknown error');
  } else {
    onSuccess(result);
  }
};

module.exports = function (app) {
  app.all('/api/*', requireAithentication);

  app.route('/api/books')

    .post(function (req, res, next) {
      const bookDoc = req.body;
      bookDoc.ownerId = req.user._id;

      const book = new Book(bookDoc);

      book.save(handleError(res, function (result) {
        res.status(200).send(result);
      }));
    })

    .get(function (req, res, next) {
      // return all books which was uploaded by the authenticated user
      let ownerId = req.user._id;

      Book.find({ownerId}, handleError(res, function (result) {
        res.status(200).send(result);
      }));
    });


  app.route('/api/books/:_id')
    .get(function (req, res, next) {
      Book.findOne({ _id: req.params._id }, handleError(res, function (result) {
        if (result.ownerId !== req.user._id)
          res.status(403).send('Forbidden');
        else
          res.status(200).send(result);
      }));
    })
    .put(function(req, res) {
      Book.findOneAndUpdate({ _id: req.params._id }, req.body, handleError(res, function (result) {
        if (result.ownerId !== req.user._id)
          res.status(403).send('Forbidden');
        else
          res.status(200).send(result);
      }));
    });

};
