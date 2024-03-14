import * as cheerio from '@toridoriv/cheerio';

import fs from 'fs';

/**
 * Twice Wikipedia page
 */
const twiceWikipediaPage = 'https://en.wikipedia.org/wiki/Twice';

/**
 * URL addresses for the Wikipedia page of each member
 */
const membersURLs = await scrapeTwiceWikipediaPage(twiceWikipediaPage);

/**
 * @param {string} url 
 * @returns {Promise<string[]>} A promise that resolves to an array with the url of each member page
 */
async function scrapeTwiceWikipediaPage(url){

    const data = [];

    const $ = await cheerio.fromURL(url);

    $('.infobox-data > ul li a').each(function(i){

        data.push("https://en.wikipedia.org" + $(this).attr('href'));
        
    });
return data;
}

/**
 * @param {string} url - The URL of each member's Wikipedia page
 * @returns {Promise<Array<{[k: string]: string}>>}
 */
async function scrapeTwiceMemberIndividualWikipediaPage(url){

    const data = {};

    const $ = await cheerio.fromURL(url)

    data['name'] = $('.mw-content-ltr p b').first().text()
    data['korean name'] = $('.mw-content-ltr p span[title="Korean-language text"]').first().text()
    data['birth'] = $('.infobox-data span').first().text();
    data['birthplace'] = $('.birthplace').text() || $('a[title=Gangdong-gu]').text();
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

