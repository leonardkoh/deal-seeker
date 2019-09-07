var express = require('express');
var router = express.Router();
const request = require('request');
const cheerio = require('cheerio');
var URLS = require('../urls')

let dataArr = []; 

function scrapeFfeeds(url) {
  request.get(url, (err, r, html) => {
    if(err) { console.log(`There's an error reaching -> ${url}`) }
  
    else {
      let $ = cheerio.load(html);
      let objectNodes = []; 
      let nodeTitles = $('.post-title').text().split("DEAL:");
      let nodeInfo = $('.excerpt').text().split('...');

      nodeTitles.shift();
      nodeInfo.pop();

      //debug
      nodeTitles.forEach((e,i) => {console.log(`${i}: ${e}`)})
      nodeInfo.forEach((e,i) => {console.log(`${i}: ${e}`)})
      console.log(`nodeTitles len: ${nodeTitles.length}`);
      console.log(`nodeInfo len: ${nodeInfo.length}`);

      for(let i=0; i<nodeTitles.length; i++) {
        objectNodes.push({
          title: nodeTitles[i],
          info: nodeInfo[i]
        })
      }

    dataArr = [...objectNodes];
    }

  });
}
scrapeFfeeds(URLS[4]);

/* Get Ffeeds page */
router.get('/', function(req, res, next) {
  res.send(dataArr);
});

module.exports = router;