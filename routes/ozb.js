var express = require('express');
var router = express.Router();
const request = require('request');
const cheerio = require('cheerio');
var URLS = require('../urls')

let dataArr = []; 

function scrapeOzb(url) {
  request.get(url, (err, r, html) => {
    if(err) {console.log(`There's an error reaching -> ${url}`)}
  
    else {
      let $ = cheerio.load(html);
      let nodes = [], objectNodes = []; 
      
      $('div.node').map((i,e) => { nodes.push(e.attribs.id); });
      nodes = nodes.filter(e => { return e!==undefined ? true:false; });

      nodes.forEach((e,i) => { 
        objectNodes[i] = {
          title: e.replace('node','h2#title'),
          submitDetail: $(e.replace('node','h2#title')).next().text(),
          link: e.replace('node',`https://www.ozbargain.com.au/node/`),
          // picture: $('.foxshot-container a img')
        };
      });
        
      // remove expired and out of stock deals
      objectNodes = objectNodes.filter(e => {
        if($(e.title).text().search('expired') > -1 || $(e.title).text().search('out of stock') > -1) 
          return false;
        else return true;
      });

      dataArr = [...objectNodes];
      dataArr.forEach(e => { e.title = $(e.title).text().trim(); })

      // dataArr.map(d => {console.log(d.picture)});
    }
  });
}

scrapeOzb(URLS[0]);

/* Get Ozb page */
router.get('/', function(req, res, next) {
  res.send(dataArr);
});

module.exports = router;