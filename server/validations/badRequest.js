const badRequest = (req, res) => res.status(404).json({
  status: 'fail',
  message: 'API Url not found or Applicable',
});

export default badRequest;
