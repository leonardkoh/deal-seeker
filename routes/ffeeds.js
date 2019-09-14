var express = require('express');
var router = express.Router();
const request = require('request');
const cheerio = require('cheerio');
var URLS = require('../urls');

let dataArr = []; 

function scrapeFfeeds(url) {
  request.get(url, (err, r, html) => {
    if(err) { console.log(`There's an error reaching -> ${url}`) }
  
    else {
      let $ = cheerio.load(html);
      let nodeTitles = $('.post-title').text().split(/DEAL:|NEWS:/);
      let nodeInfo = $('.excerpt').text().split('...');
      
      nodeTitles.shift();
      nodeInfo.pop();

      for(let i=0; i<nodeTitles.length; i++) {
        dataArr.push({
          title: nodeTitles[i],
          info: nodeInfo[i]
        })
      }
    }

  });
}

for(let i=3; i<=5; i++)
{ scrapeFfeeds(URLS[i]); }

/* Get Ffeeds page */
router.get('/', function(req, res, next) {
  res.send(dataArr);
});

module.exports = router;