class CheckRequestId {
  static checker(req, res, next) {
    const requestId = req.params.requestId;
    const regularExpression = /^\d*[1-9]\d*$/;
    if (!regularExpression.test(requestId)) {
      console.log(regularExpression.test(requestId));
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid Request ID! Only positive integer allowed',
      });
    } next();
  }
}

export default CheckRequestId;
