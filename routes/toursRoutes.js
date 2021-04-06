const fs = require("fs");
const express = require('express');
const router = express.Router();
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../development-data/tours-example.json`));


router.get('/', (req, res) => {
  if (!tours) return res.json({ message: 'error here' })
  res.json({
    status: 'OK',
    data: {
      tours
    }
  })
});

router.get('/:id', (req, res) => {
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
});

router.post('/', (req, res) => {
  const id = tours[tours.length - 1].id + 1;
  const anotherTour = { id: id, ...req.body };
  tours.push(anotherTour);
  res.status(200).json({ status: 'OK', data: { tour: anotherTour}});
});

router.delete('/:id', (req, res) => {
  const tour = tours.find(x => x.id === req.params.id * 1);
  if (!tours)
    return res.status(404).json({ status: 'Failed', message: 'Invalid ID' });
  
  const index = tours.indexOf(tour);
  tours.splice(index, 1);

  return res.status(200).json({ status: 'Deleted', deleted_tour: tour });
});

module.exports = router;