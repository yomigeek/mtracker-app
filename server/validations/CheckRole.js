class CheckRole {
  static checkIfAdmin(req, res, next) {
    const role = req.decoded.role;
    if (!role) {
      return res.json({
        status: 'fail',
        message: 'Unauthorized access. Unknown entity!',
      });
    } else if (role != 'admin') {
      return res.status(403).json({
        status: 'fail',
        message: 'Unauthorized access to this resource',
      });
    } next();
  }
}

export default CheckRole;
