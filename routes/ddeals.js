var express = require('express');
var router = express.Router();
const request = require('request');
const cheerio = require('cheerio');
var URLS = require('../urls');

let dataArr = []; 

function scrapeDdeals(url) {
  request.get(url, (err, r, html) => {
    if(err) { console.log(`There's an error reaching -> ${url}`) }
  
    else {
      let $ = cheerio.load(html);
      let nodeTitle = [], nodeLink = [];
      let nodeInfo = $('.excerpt').text().split('...');
      $('.post-title a').map((i,e) => { nodeTitle.push(e.attribs.title)});
      $('.post-title a').map((i,e) => { nodeLink.push(e.attribs.href)}); 

      nodeInfo.pop();

      for(let i=0; i<nodeLink.length; i++) {
        dataArr.push({
          title: nodeTitle[i].slice(13),
          info: nodeInfo[i],
          link: nodeLink[i]
        })
      }
    }
  });
}

for(let i=6; i<=8; i++)
{ scrapeDdeals(URLS[i]); }

/* Get Ddeals page */
router.get('/', function(req, res, next) {
  res.send(dataArr);
});

module.exports = router;