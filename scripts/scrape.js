import * as cheerio from '@toridoriv/cheerio';

import fs from 'fs';

const twiceWikipediaPage = 'https://en.wikipedia.org/wiki/Twice';

const membersURLs = await scrapeTwiceWikipediaPage(twiceWikipediaPage);

//const twiceMembersIndividualData = await scrapeTwiceMembersIndividualWikipediaPages();

async function scrapeTwiceWikipediaPage(url){
    //const data = {}

    const data = [];

    const $ = await cheerio.fromURL(url);

    $('.infobox-data > ul li a').each(function(i){

        //const name = $(this).text();

        //data[name] = {'name': $(this).text(), 'url':$(this).attr('href')}

        data.push("https://en.wikipedia.org" + $(this).attr('href'));
        
    });
return data;
}

async function scrapeTwiceMemberIndividualWikipediaPage(url){

    const data = {};

    const $ = await cheerio.fromURL(url)

    data['name'] = $('.mw-content-ltr p b').first().text()
    data['korean name'] = $('.mw-content-ltr p span[title="Korean-language text"]').first().text()
    data['birth'] = $('.infobox-data span').first().text();
    data['image'] = $('.infobox-image img').attr('src');
    
    return data;

}

const membersData = JSON.stringify(await Promise.all(membersURLs.map(scrapeTwiceMemberIndividualWikipediaPage)), null, 2)

fs.writeFile('membersData.json', membersData, (err) => {
    if (err)
      console.log(err);
    else {
      console.log("File written successfully\n");
      console.log("The written file has the following contents:");
      console.log(fs.readFileSync("membersData.json", "utf8"));
    }
  })

