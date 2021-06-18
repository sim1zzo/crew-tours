const { Tour } = require('../models/tour');

exports.getOverview = async (req, res) => {
  const tours = await Tour.find();

  res.status(200).render('overview', {
    tours,
  });
};

exports.getTour = async (req, res) => {
  let name = req.params;
  name = name[0];
  name = getName(name);
  const tour = await Tour.findOne({ name: name }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });
  res.status(200).render('tour', {
    tour,
  });

  // const tour = await Tour.findOne({ name: name });
};

function getName(name) {
  if (name.indexOf('-') !== -1) {
    name = name.replace('-', ' ');
    let arr = name.split(' ');
    let arr2 = [];
    for (let item of arr) {
      const first = item[0].toUpperCase();
      const second = item.slice(1);
      arr2.push(first + second);
    }
    name = arr2.join(' ');
  } else {
    const firstLetter = name.charAt(0).toUpperCase();
    const otherName = name.slice(1);
    name = firstLetter + otherName;
  }
  return name;
}
