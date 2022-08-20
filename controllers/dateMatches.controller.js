/*  dateMatches.controller.js
    Purpose: To return a wtfIpedia sentence for each date that is found
    within a given sentence. 

    Return multiple responses if more than one match found in 
    the sentence.

    To construct clear methodology for parsing wikipedia dates.
    
*/

export const getDateMatches = (sentence) => {

    const regex = /\b(on |.On |in |.In |as of |the |.The |of |around |a)\b(\b\d{1,2}\D{0,3})?\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|(Nov|Dec)(?:ember)?)\D?(\d{1,2}\D?)?\D?((15[1-9]\d|16[1-9]\d|17[1-9]\d|18[1-9]\d|19[1-9]\d|20\d{2})|\d{2})|(The (15\d{2}|16\d{2}|17\d{2}|18\d{2}|19\d{2}|20\d{2}))|(In (15\d{2}|16\d{2}|17\d{2}|18\d{2}|19\d{2}|20\d{2}))|(Of (15\d{2}|16\d{2}|17\d{2}|18\d{2}|19\d{2}|20\d{2}))|(Around (15\d{2}|16\d{2}|17\d{2}|18\d{2}|19\d{2}|20\d{2}))/gi;
    const bcDatesRegex = /\d{1,} BC|\d{1,}BC|\d{1,}AD |\d{1,} AD /gi

    /* ============== NOT HANDLED ==============
        > around the year 270 BC.
        > in the 7th century BC,
        > the year 270 BC
        > 600–1000 CE
        > late 1590s
        > from the late 1590s
        > From 1817 to 1823
        > since at least the early 1660s
        > after 1600 // not to be confused with a 
                     // number like, 'after 1600 
                     // bottles of...'
        > until 1826
        > in 2007–2008  ?
        > in the 1560s–70s
        > between 1540 and 1818
        > c. 1471–1493
        > 1810–1814
        > date back to about 2.5 million years ago
        > After several efforts, Spanish troops 
          from Peru took advantage of the 
          internecine strife to reconquer Chile 
          in 1814, when they reasserted control 
          by the Battle of Rancagua on 
          October 12. O'Higgins, Carrera and 
          many of the Chilean rebels escaped 
          to Argentina.

          > Infer October 12, 1814
            Instead of 
                - October 12, 1970
                - January 1, 1814

      ==========================================
      ================ BUGS ====================
        > to a depth of 2000 m. (Earth Article)    
            ==> The year 2000
        > In Mark 14 "In Mark 14:61 the high..."   
            ==> A not real date "Mark 14"
        > 1683.3 /sqmi.
            ==> from Las Vegas article
        > in Oregon with more than 50,000 adherents
            ==> 000 AD
            *Poorly fixed*
    */ 
    
    // use the old method of doing it all at once
    let array = [...sentence.matchAll(regex)];

    // if the old method doesnt get a match
    if (array.length == 0){

        const bcDates = [...sentence.matchAll(bcDatesRegex)];
        if (bcDates.length !== 0) {
            array = bcDates;
        }
    } 

    return array;
};

export default getDateMatches;