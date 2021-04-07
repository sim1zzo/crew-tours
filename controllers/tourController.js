const { Tour, validate } = require('../models/tour');

exports.isValidTour = (req, res, next) => {
  if ((!req.body.name || !req.body.price)){
    return res.status(400).json({
      status: "Error",
      message: 'Invalid tour name or tour price'
    });
  }
  next();
}

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find().sort('name');
    return res.json({
      status: 'OK',
      data: {
        tours
      }
    });
  } catch (error) {
    
    return res.json({ status: 'ERROR', error });
  }
}

exports.getOneTour = async (req, res) => {
  const tour = await Tour.findById(req.params.id);
  if (!tour)
    return res
      .status(404)
      .json(
        {
          status: 'Failed',
          message: "Invalid ID."
        });
  
  return res.json({
    status: 'OK',
    data: {
      tour
    }
  })
}

exports.createTour = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ status: 'Failed', messagge: error.details[0].message });

    try {
    const tour = await Tour.create(req.body);
    return res.status(200).json({ status: 'OK', data: { tour } });
  } catch (error) {
      return res
        .status(400)
        .json({
          status: 'Error',
          message: error.message
        });
      }
      
    };
    
    exports.updateTour = async (req, res) => {
      const { error } = validate(req.body);
      if (error) return res.status(400).json({ status: 'Failed', messagge: error.details[0].message });
      
      try {
        const tour = await Tour
          .findByIdAndUpdate(req.params.id, req.body, { new: true });
          return res.status(200).json({
            status: 'Updated', data: {
            tour
          }});
        
      } catch (error) {
        return res.status(400).json({ status: 'Error', message: error.message });
      }
};

exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    return res.status(200).json({ status: 'Deleted', tour });
  } catch (error) {
      return res.status(404).json({ status: 'Failed', message: 'Invalid ID' });
  }

};

