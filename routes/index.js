var express = require('express');
var router = express.Router();
const cookieParser = require("cookie-parser");
router.use(cookieParser());
var axios = require("axios");
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('home', { layout: 'signin' });
});
router.get('/signin', function (req, res, next) {
  res.render('home', { layout: 'signin' });
});
router.get('/signup', function (req, res, next) {
  res.render('home', { layout: 'signup' });
});
router.get("/book", async function (req, res) {
  const token = req.cookies.jwt;
  try {
    const response = await axios.get("http://localhost:3000/api/book", {
      headers: { Authorization: `jwt ${token}` },
    });
    const data = response.data;
    res.render("home", {
      layout: "book",
      data: data,
      token: token,
    });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
