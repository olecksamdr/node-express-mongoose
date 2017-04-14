module.exports = function (req, res, next) {
  if (req.user)
    return next();
  else
    res.status(403).send('Forbidden');
};
