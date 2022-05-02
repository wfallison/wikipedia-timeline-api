/*  dateMatches.controller.js
    Purpose: To return a wtfIpedia sentence for each date that is found
    within a given sentence. 

    Return multiple responses if more than one match found in 
    the sentence.

    To construct clear methodology for parsing wikipedia dates.
    
*/


export const getDateMatches = (sentence) => {

    const regex = /\b(on |.On |in |.In |as of |the |.The |of |around )\b(\b\d{1,2}\D{0,3})?\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|(Nov|Dec)(?:ember)?)\D?(\d{1,2}\D?)?\D?((15[1-9]\d|16[1-9]\d|17[1-9]\d|18[1-9]\d|19[1-9]\d|20\d{2})|\d{2})|(The (15\d{2}|16\d{2}|17\d{2}|18\d{2}|19\d{2}|20\d{2}))|(In (15\d{2}|16\d{2}|17\d{2}|18\d{2}|19\d{2}|20\d{2}))|(Of (15\d{2}|16\d{2}|17\d{2}|18\d{2}|19\d{2}|20\d{2}))|(Around (15\d{2}|16\d{2}|17\d{2}|18\d{2}|19\d{2}|20\d{2}))/gi;
    const bcDatesRegex = /\d{1,} BC|\d{1,}BC/gi

    /* ============== NOT HANDLED ==============
        > around the year 270 BC.
        > in the 7th century BC,
        > in 332 BC. 
        > from 305 BC to 30 BC    // Should become two different entries
        > from 2920 BC to 525 BC  // Should become two different entries
        > the year 270 BC
      ==========================================
      ================ BUGS ====================
        > to a depth of 2000 m. (Earth Article)
    */ 
    
    // use the old method of doing it all at once
    let array = [...sentence.matchAll(regex)];

    if (array.length == 0){

        const bcDates = [...sentence.matchAll(bcDatesRegex)];
        if (bcDates.length !== 0) {
            array = bcDates;
        }
    } 

    return array;
};

export default getDateMatches;