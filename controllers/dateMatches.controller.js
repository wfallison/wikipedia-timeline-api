/*  dateMatches.controller.js
    Purpose: To return a wtfIpedia sentence for each date that is found
    within a given sentence. 

    Return multiple responses if more than one match found in 
    the sentence.

    To construct clear methodology for parsing wikipedia dates.
    
*/

export const getDateMatches = (sentence) => {


    //console.log(sentence)
    //remove comma making 10,000 BC turn into 000 BC
    //probably more instances of this kind of thing 
    if (typeof sentence === 'string'){
        sentence = sentence.replace(/,/g, '')
    }

    /*  bigRegex
      - Handles a ton of different things
    */
    const bigRegex = /\b( on |.On |in |.In |as of |the |.The |of |around |a |c. )\b(\b\d{1,2}\D{0,3})?\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|(Nov|Dec)(?:ember)?)\D?(\d{1,2}\D?)?\D?((15[1-9]\d|16[1-9]\d|17[1-9]\d|18[1-9]\d|19[1-9]\d|20\d{2})|\d{2})|(The (15\d{2}|16\d{2}|17\d{2}|18\d{2}|19\d{2}|20\d{2}))|(In (15\d{2}|16\d{2}|17\d{2}|18\d{2}|19\d{2}|20\d{2}))|(Of (15\d{2}|16\d{2}|17\d{2}|18\d{2}|19\d{2}|20\d{2}))|(Around (15\d{2}|16\d{2}|17\d{2}|18\d{2}|19\d{2}|20\d{2})|(until (15\d{2}|16\d{2}|17\d{2}|18\d{2}|19\d{2}|20\d{2})))/gi;
    /*  bcDatesRegex
      - Contains BC or AD
      - Use for older dates, eventually adding ba. and ka.
    */
    const bcDatesRegex = /\d{1,} BC|\d{1,}BC|\d{1,}AD |\d{1,} AD /gi
    /*  relativeDatesRegex
      - Used for "ago" format
      - Date calculations based on today
    */
    const relativeDatesRegex = /\b((\d+|([0-9]+\.?[0-9]*|\.[0-9]+))( years ago| months ago| days ago| centuries ago| decades ago | million years ago| billion years ago))/gi

    /*
      e.g. "the 31st of October, 2022"
    */
    const longAmericanDatesRegex = /\b(the \d{1,2})(st|nd|rd|th)(.of.)?\b(\b\d{1,2}\D{0,3})?(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|(Nov|Dec)(?:ember)?)\D?(15\d{2}|16\d{2}|17\d{2}18\d{2}|19\d{2}|20\d{2})/gi

    /*
      Start filling array, and overwrite it if any other method 
      finds a match for the given string.
    */

    let array = [...sentence.matchAll(bigRegex)];

    const bcDates = [...sentence.matchAll(bcDatesRegex)];
      if (bcDates.length !== 0) {
        array = bcDates;
      }

    const relativeDates = [...sentence.matchAll(relativeDatesRegex)]
      if (relativeDates.length !== 0){
        array = relativeDates
      }
    
    const longAmericanDates= [...sentence.matchAll(longAmericanDatesRegex)]
      if (longAmericanDates.length !== 0){
        array = longAmericanDates
      }

    return array;
};

export default getDateMatches;