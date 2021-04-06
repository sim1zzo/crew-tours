const { notDeepStrictEqual } = require("assert");
const fs = require("fs");
const path = `${__dirname}/../development-data/tours-example.json`
const tours = JSON.parse(fs.readFileSync(path, 'utf8'));

exports.isValidTour = (req, res, next) => {
  if ((!req.body.name || !req.body.price) || (req.body.name.length < 3 || parseInt(req.body.price) < 1)) return res.status(404).json({ status: "Error", message: 'Invalid tour' });
  next();
}

exports.getAllTours = (req, res) => {
  if (!tours) return res.json({ message: 'error here' })
  res.json({
    status: 'OK',
    data: {
      tours
    }
  })
}

exports.getOneTour = (req, res) => {
  const tour = tours.find(x => x.id === parseInt(req.params.id));
  if (!tour)
    return res
      .status(404)
      .json(
        {
          status: 'Failed',
          message: "Invalid ID."
        });
  
  res.json({
    status: 'OK',
    data: {
      tour
    }
  })
}

exports.createTour = (req, res) => {
  const id = tours[tours.length - 1].id + 1;
  const anotherTour = { id: id, ...req.body };
  tours.push(anotherTour);
  res.status(200).json({ status: 'OK', data: { tour: anotherTour}});
}

exports.deleteTour = (req, res) => {
  const tour = tours.find(x => x.id === req.params.id * 1);
  if (!tours)
    return res.status(404).json({ status: 'Failed', message: 'Invalid ID' });
  
  const index = tours.indexOf(tour);
  tours.splice(index, 1);

  return res.status(200).json({ status: 'Deleted', deleted_tour: tour });
}

