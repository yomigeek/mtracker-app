// Class to select the admin action on user requests
class RequestTypeSelector {
  static approve(req, res, next) {
    req.value = 'approve';
    res.locals.value = req.value;
    return next();
  }
  static decline(req, res, next) {
    req.value = 'decline';
    res.locals.value = req.value;
    return next();
  }
  static resolve(req, res, next) {
    req.value = 'resolve';
    res.locals.value = req.value;
    return next();
  }
}


export default RequestTypeSelector;

