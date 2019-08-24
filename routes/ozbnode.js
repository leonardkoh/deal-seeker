var express = require('express');
var router = express.Router();
const request = require('request');
const cheerio = require('cheerio');

let dataArr = ['SERVER']; 

router.post('/', async function(req, res, next) {
  let url = req.body.link;

  await request.get(url, (err, res, html) => {
    if(err) {console.log(`There's an error reaching the node -> ${url}`)}
    
    else {
      let $ = cheerio.load(html);
      dataArr = $('.node div.content').text().split('\n');
      couponCode = $('.node div.n-right div.content div.couponcode').text();
      dataArr.unshift(couponCode); // coupon code set as index 0
    }
  })
    
  res.send(dataArr);
  }
);

module.exports = router;