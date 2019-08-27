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
        let nodes = [], objectNodes = []; 
        
        
        // console.log($('.post-title').text());
        $('h2.post-title').map((i,e) => { nodes.push(e); });
        // $('.post-title').map((i,e) => {nodes.push(e)});
        console.log(`Node Array length: ${nodes.length}`);
        // console.log(`Node content: ${nodes}`);
        nodes.forEach(e => {console.log(`${e}`)})
        
        //   $('div.node').map((i,e) => { nodes.push(e.attribs.id); });
        //   nodes = nodes.filter(e => { return e!==undefined ? true:false; });
        
      nodes.forEach((e,i) => { 
        objectNodes[i] = {
            title: e
        //   submitDetail: $(e.replace('node','h2#title')).next().text(),
        //   link: e.replace('node',`https://www.ozbargain.com.au/node/`),
        //   image: $(`#${e} .foxshot-container img`).attr('src')
    };

    dataArr = [...nodes];
});

//   dataArr = [...objectNodes];
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