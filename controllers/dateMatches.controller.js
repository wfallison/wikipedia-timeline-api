/*  dateMatches.controller.js
    Purpose: To return a wtfIpedia sentence for each date that is found
    within a given sentence. 

    To construct clear methodology for parsing wikipedia dates

*/


export const getDateMatches = (sentence) => {
    const regex = /\b(on |.On |in |.In |as of)\b(\b\d{1,2}\D{0,3})?\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|(Nov|Dec)(?:ember)?)\D?(\d{1,2}\D?)?\D?((15[1-9]\d|16[1-9]\d|17[1-9]\d|18[1-9]\d|19[1-9]\d|20\d{2})|\d{2})|(In (15\d{2}|16\d{2}|17\d{2}|18\d{2}|19\d{2}|20\d{2}))/gi;
    const bcDatesRegex = /\d{1,} BC /gi
    
    let array = [...sentence.matchAll(regex)];

    if (array.length == 0){
        // try bcDate?
        array = [...sentence.matchAll(bcDatesRegex)];
    } 
   
    console.log(array)
    return array;
};
