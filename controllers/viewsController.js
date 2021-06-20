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
  const tour = await Tour.findOne({ name: name });

  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "default-src 'self' https://*.mapbox.com ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://api.mapbox.com 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render('tour', {
      title: `${tour.name} tour`,
      tour,
    });
};

exports.getLogin = async (req, res) => {
  res.status(200).render('login', {
    title: 'Log in!',
  });
};

exports.getSignUp = async (req, res) => {
  res.statu(200).render('signUp', {
    title: 'Signing up',
  });
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
