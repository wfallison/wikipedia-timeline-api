import { getArticleParts } from '../controllers/getArticleParts.controller.js';
// will getArticleParts deal with the API layer? Maybe its fine to interact
// with the controller only here?

describe('Article Part Extractor', function () {

	it('should be able to get +n sentences and -n senentences from a specific point in an article', function () {

    //Implement this as a "more context" menu in the UI
    //Will return more context about a specific sentence
    //Could possibly show outlinks to other articles that
    //are linked within the context
    //modify the context response already provided to 
    //include an object from the partExtractor function
    //Might need to give this a specific input because the article may change

		/*
      articleId: 
      paragraph:
      sentence:
      nMinus:
      nPlus:
    */

		//expect(getDateMatches(sentence)[0][0]).toEqual('2750 BC');

    expect(true).toEqual(false)
	});

});
