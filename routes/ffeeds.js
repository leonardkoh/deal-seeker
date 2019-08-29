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
        
        let titles = $('.post-title').text();
        let nodes = titles.split("DEAL:");
        
        console.log(`Node Array length: ${nodes.length}`);
        nodes.forEach(e => {console.log(`${e}`)})
        
        
      nodes.forEach((e,i) => { 
        objectNodes[i] = {
            title: e
        //   submitDetail: $(e.replace('node','h2#title')).next().text(),
        //   link: e.replace('node',`https://www.ozbargain.com.au/node/`),
        //   image: $(`#${e} .foxshot-container img`).attr('src')
    };

});

  dataArr = [...nodes];
//   dataArr.forEach(e => { e.title = $(e.title).text().trim(); })
    }
  });
}

scrapeFfeeds(URLS[4]);

/* Get Ffeeds page */
router.get('/', function(req, res, next) {
  res.send(dataArr);
});

module.exports = router;