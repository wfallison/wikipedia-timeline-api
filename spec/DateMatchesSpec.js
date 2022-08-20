import { getDateMatches } from '../controllers/dateMatches.controller.js';

describe('Date Matcher', function () {

	it('should extract BC Date dates from string', function () {
		const sentence = `Ancient Egyptian texts dating from 2750 BCE referred to these 
      fish as the "Thunderer of the Nile", and described them as the 
      "protectors" of all other fish.`;
		expect(getDateMatches(sentence)[0][0]).toEqual('2750 BC');
	});

	it("should extract 'until 1600' from string", function () {
		const sentence = `Electricity would remain little more than an intellectual curiosity 
    for millennia until 1600, when the English scientist William Gilbert wrote De Magnete, 
    in which he made a careful study of electricity and magnetism, distinguishing the 
    lodestone effect from static electricity produced by rubbing amber.`;
		expect(getDateMatches(sentence)[0][0]).toEqual('until 1600');
	});

  it("should extract 'of 1646' from string", function () {
		const sentence = `This association gave rise to the English words "electric" and 
    "electricity", which made their first appearance in print in Thomas Browne's 
    Pseudodoxia Epidemica of 1646.`;
		expect(getDateMatches(sentence)[0][0]).toEqual('of 1646');
	});

  it("should extract 'In June 1752' from string", function () {
		const sentence = `In June 1752 he is reputed to have attached a metal key to the 
    bottom of a dampened kite string and flown the kite in a storm-threatened sky.`;
		expect(getDateMatches(sentence)[0][0]).toEqual('In June 1752');
	});

  it("should extract 'in 1821' and 'in 1827' from string", function () {
		const sentence = `Michael Faraday invented the electric motor in 1821, and 
    Georg Ohm mathematically analysed the electrical circuit in 1827.`;
		expect(getDateMatches(sentence)[0][0]).toEqual('in 1821');
    expect(getDateMatches(sentence)[1][0]).toEqual('in 1827');
	});

  it("should extract '100000 years ago' from string", function () {
		const sentence = `This small variation in human DNA compared to many other 
    species suggests a population bottleneck during the Late Pleistocene (around 
      100000 years ago) in which the human population was reduced to a small 
      number of breeding pairs.`;
		expect(getDateMatches(sentence)[0][0]).toEqual('100000 years ago');
	});

  

});
