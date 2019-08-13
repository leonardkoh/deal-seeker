const cheerio = require('cheerio');
const request = require('request');

const _OZB_URLS = ['https://www.ozbargain.com.au/',
                  'https://www.ozbargain.com.au/?page=1',
                  'https://www.ozbargain.com.au/?page=2'
                ]
let dataArr = []; 

// function scrapeOzb(url) {
//   request.get(url, (err, res, html) => {
//     if(err) {console.log(`There's an error with url --> ${url}`)}
  
//     else {
//       let $ = cheerio.load(html);
//       let nodes = [], objectNodes = []; 
      
//       $('div.node').map((i,e) => { nodes.push(e.attribs.id); });
//       nodes = nodes.filter(e => { return e!==undefined ? true:false; });

//       nodes.forEach((e,i) => { 
//         objectNodes[i] = {
//           title: e.replace('node','h2#title'),
//           submitDetail: $(e.replace('node','h2#title')).next().text(),
//           link: e.replace('node',`https://www.ozbargain.com.au/node/`),
//         };
//       });
        
//       // remove expired and out of stock deals
//       objectNodes = objectNodes.filter(e => {
//         if($(e.title).text().search('expired') > -1 || $(e.title).text().search('out of stock') > -1) 
//           return false;
//         else return true;
//       });

//       objectNodes.forEach(i => { 
//         console.log($(i.title).text().trim())
//         console.log(i.submitDetail);
//         console.log(i.link);
//         console.log(" ");
//       });
      
//       dataArr = [...objectNodes];
//       dataArr.forEach(e => { e.title = $(e.title).text().trim(); })
//     }
//   });
// }

function scrapeOzb(url) {
      request.get(url, (err, res, html) => {
        if(err) {console.log(`There's an error with url --> ${url}`)}
      
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
            };
          });
            
          // remove expired and out of stock deals
          objectNodes = objectNodes.filter(e => {
            if($(e.title).text().search('expired') > -1 || $(e.title).text().search('out of stock') > -1) 
              return false;
            else return true;
          });
    
        //   objectNodes.forEach(i => { 
        //     console.log($(i.title).text().trim())
        //     console.log(i.submitDetail);
        //     console.log(i.link);
        //     console.log(" ");
        //   });
          
            console.log([...objectNodes].forEach(e => { e.title = $(e.title).text().trim(); }));

          return [...objectNodes].forEach(e => { e.title = $(e.title).text().trim(); })
        }
      });
    }

module.exports = scrapeOzb(_OZB_URLS[0]);

