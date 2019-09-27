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
      let nodeTitle = $('.post-title').text().split(/DEAL:|NEWS:/);
      let nodeInfo = $('.excerpt').text().split('...');
      let nodeDate = [], nodeLink = [], nodeImage = [];
      $('.post-title > a').map((i,e) => { nodeLink.push($(e).attr('href')) }); 
      $('p.post-date > time').map((i,e) => { nodeDate.push($(e).attr('datetime')) }); 
      $('img').map((i,e) => { nodeImage.push(e.attribs.src)}); 

      $('.post-thumbnail > a > img').map((i,e) => { console.log($(e).attr('src')) });
      console.log(nodeImage)
      
      //attachment-thumb-medium size-thumb-medium wp-post-image tc-smart-load-skip tc-smart-loaded
      // nodeImage = nodeImage.filter((e,i) => {
        // return e.includes('data:image/gif;base64');
        // console.log(i);
        // return i>=10 ? true:false;
      
      nodeTitle.shift();
      nodeInfo.pop();

      for(let i=0; i<nodeTitle.length; i++) {
        dataArr.push({
          title: nodeTitle[i],
          info: nodeInfo[i],
          date: nodeDate[i],
          link: nodeLink[i],
          // image: nodeImage[i]
        })
      }
    }
  });
}

for(let i=3; i<=5; i++)
{ scrapeFfeeds(URLS[i]); }

// do sort on data date

/* Get Ffeeds page */
router.get('/', function(req, res, next) {
  res.send(dataArr);
});

module.exports = router;