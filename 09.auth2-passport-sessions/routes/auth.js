
// auth for express/HTML routes with session
const auth = {
  required: function (req, res, next){
    if (req.user && req.user.email ){
      return next();
    }else{
      res.redirect('/users/login');
    }
  },
  optional: function(req, res, next){
    next();
  },
};

module.exports = auth;
