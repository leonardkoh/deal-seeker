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
      let nodeLink = [];
      let nodeImage = [];
      $('.post-title a').map((i,e) => { nodeLink.push(e.attribs.href)}); 
      $('.wp-post-image').map((i,e) => { nodeImage.push(e.attribs.src)}); 
      //attachment-thumb-medium size-thumb-medium wp-post-image tc-smart-load-skip tc-smart-loaded

      console.log($('#post-66130 > div > div.post-thumbnail > a > img').text());
      // console.log(nodeImage)
      // let nodeImage = [];
      // $('.post-thumbnail a').map((i,e) => { nodeImage.push(e.attribs.src)
      // console.log(e.attribs.src)
      // }); 

      nodeTitles.shift();
      nodeInfo.pop();

      for(let i=0; i<nodeTitles.length; i++) {
        dataArr.push({
          title: nodeTitles[i],
          info: nodeInfo[i],
          link: nodeLink[i]
        })
      }
    }
  });
}

for(let i=6; i<=8; i++)
{ scrapeFfeeds(URLS[i]); }

/* Get Ddeals page */
router.get('/', function(req, res, next) {
  res.send(dataArr);
});

module.exports = router;