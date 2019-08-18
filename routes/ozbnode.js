var express = require('express');
var router = express.Router();
const request = require('request');
const cheerio = require('cheerio');

let dataArr = []; 
TEST_URL = 'https://www.ozbargain.com.au/node/477203';

function scrapeNode() {
  request.get(TEST_URL, (err, res, html) => {
    if(err) {console.log(`There's an error reaching the node`)}
  
    else {
      let $ = cheerio.load(html);
      let nodes = [], objectNodes = []; 
      dataArr[0] = $('ul div.content').text();
      // dataArr = [1,2,3];
}})}

scrapeNode();

/* Ozb node data */
router.get('/', function(req, res, next) {
  res.send(dataArr);
});

module.exports = router;