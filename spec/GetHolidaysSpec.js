import { getDateMatches } from '../controllers/dateMatches.controller.js';

describe('Date Matcher - Holidays', function () {

  it("should extract May 1 1900 from MayDay", function () {
    const sentence = `mass meeting for May Day 1900`;
    expect(getDateMatches(sentence)[0][0]).toEqual('May 1 1900');
  });

  it("should extract December 25 1914 from Christmas", function () {
    const sentence = `was a series of widespread unofficial ceasefires 
    along the Western Front of the First World War around Christmas 1914`;
    expect(getDateMatches(sentence)[0][0]).toEqual('December 25 1914');
  });

  it("should extract January 1 2022 from New Years", function () {
    const sentence = `On new years day 2022`;
    expect(getDateMatches(sentence)[0][0]).toEqual('January 1 2022');
  });

});
