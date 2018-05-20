class Validate {
  static checkRequestInputs(req, res, next) {
    const titleRequest = req.body.title;
    const descriptionRequest = req.body.description;
    const priorityRequest = req.body.priority;
    
    if ((!titleRequest) || (!descriptionRequest) || (!priorityRequest)) {
      return res.status(500).json({
        status: 'fail',
        message: 'API Request missing or cannot be empty! Request must include title, description or priority.',
      });
    }

    const title = titleRequest;
    const description = descriptionRequest;
    const priority = priorityRequest.toLowerCase();
    const trimedTitle = title.replace(/^\s+|\s+$|\s+(?=\s)/g, '');
    const trimedDescription = description.replace(/^\s+|\s+$|\s+(?=\s)/g, '');
    const trimedPriority = priority.replace(/^\s+|\s+$|\s+(?=\s)/g, '');

    if (!title) {
      return res.status(400).json({
        status: 'fail',
        message: 'title cannot be empty!',
      });
    } else if (title.length < 10) {
      return res.status(400).json({
        status: 'fail',
        message: 'Title must be more than 10 characters',
      });
    } else if (trimedTitle.length <= 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'Title cannot be empty!',
      });
    } else if (!description) {
      return res.status(400).json({
        status: 'fail',
        message: 'Description field cannot be empty!',
      });
    } else if (description.length < 10) {
      return res.status(400).json({
        status: 'fail',
        message: 'Description must be more than 10 characters!',
      });
    } else if (trimedDescription.length <= 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'Description must be more than 10 characters!',
      });
    } else if (!priority) {
      return res.status(400).json({
        status: 'fail',
        message: 'Priority field cannot be empty!',
      });
    } else if (trimedPriority.length <= 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'Priority must have a value!',
      });
    } else if ((priority != 'high') && (priority != 'medium') && (priority != 'low')) {
      return res.status(400).json({
        status: 'fail',
        message: 'Priority must be either low, medium or high',
      });
    } next();
  }
}

export default Validate;
