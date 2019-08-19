var express = require('express');
var router = express.Router();
const request = require('request');
const cheerio = require('cheerio');

let dataArr = []; 
// TEST_URL = 'https://www.ozbargain.com.au/node/477738';

async function scrapeNode(url) {
  await request.get(url, (err, res, html) => {
    if(err) {console.log(`There's an error reaching the node -> ${url}`)}
  
    else {
      let $ = cheerio.load(html);
      dataArr = $('.node div.content').text().split('\n');
      couponCode = $('.node div.n-right div.content div.couponcode').text();
      dataArr.unshift(couponCode); // coupon code set as index 0
    }
  })
};

// scrapeNode();

/* Get Ozb node data */
// router.get('/', function(req, res, next) {
  // res.send(dataArr);
// });

router.post('/', function(req, res, next) {
  scrapeNode(req.body.data.LinkInfo)
  // console.log([req.body.data.LinkInfo]);
  .then(res.send(dataArr));
  // res.send(scrapeNode(req.body.data.LinkInfo));
});

module.exports = router;