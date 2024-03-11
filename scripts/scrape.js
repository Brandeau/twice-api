import * as cheerio from '@toridoriv/cheerio';

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

    //data[1] = $('.infobox-above .fn').text();
    data['name'] = $('.nickname').text() || $('.infobox-above .fn').text();
    data['birth'] = $('.infobox-data span').first().text();
    data['image'] = $('.infobox-image img').attr('src');
    data['Korean Name'] = $('span[title="Korean-language text"]').first().text();
    data['Kanji'] = $('span[title="Japanese-language text"]').first().text() || $('span[title="Chinese-language text"]').first().text() || 'Does not apply';

    return data;

}

console.log(await Promise.all(membersURLs.map(scrapeTwiceMemberIndividualWikipediaPage)));

