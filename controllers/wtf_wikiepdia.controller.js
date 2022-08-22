const wtf = require('wtf_wikipedia');
import { getDateMatches } from '../controllers/dateMatches.controller';

export const fetchWtf = async (searchString) => {
	try {
		const data = await wtf.fetch(searchString);
		const parsed = data !== null ? await parseWtf(data.json()) : [];

		const headerData = {
			header: {
				searchedValue: searchString,
				foundArticleTitle: parsed[0] ? parsed[0].articleTitle : '',
				countRecords: parsed ? parsed.length : 0,
			},
		};

		return { sorted: parsed, headerData: headerData };
	} catch (err) {
		console.log(err);
	}
};

export const parseWtf = async (wtFetchData) => {
	const sections = wtFetchData.sections;
	const timelineEntries = [];

	const pageID = wtFetchData.pageID;

	sections.map((section) => {
		const sectionTitle = section.title;
		const paragraphs = section.paragraphs ? section.paragraphs : [];
		paragraphs.map((paragraph) => {
			const sentences = paragraph.sentences;
			sentences.map((sentence) => {
				const sentenceDate = getDateMatches(sentence.text);
				for (const element of sentenceDate) {
					const humanDate = element[0];
					const realDate = inferDatefromString(element[0]);

					if (!realDate.dateSortMs) {
						console.log('missing sort for ', realDate.realDate);
					}

					const timelineEntry = {
						articleTitle: wtFetchData.title,
						pageId: pageID,
						stringDate: humanDate,
						context: element.input, //Should be entire paragraph? Or previous and next few sentences? Position in paragraph may matter.
						sentence: element.input,
						dateSortMs: realDate ? realDate.dateSortMs : '',
						meta: {
							sectionTitle: sectionTitle,
						},
					};

					timelineEntries.push(timelineEntry);
				}
			});
		});
	});
	return timelineEntries;
};

function inferDatefromString(dateString) {
	const cleanupRegex = /\b(on |in |as of |the |in |around\b)\b/gi;

	try {
		const cleanDate = dateString.replace(cleanupRegex, '');
		let realDate =
			!isNaN(parseFloat(Date.parse(cleanDate))) && isFinite(Date.parse(cleanDate))
				? Date.parse(cleanDate)
				: null;

		let dateSortMs = null; //!isNaN(parseFloat(Date.parse(cleanDate))) && isFinite(Date.parse(cleanDate)) ? Date.parse(cleanDate).getTime() : null
		// if realDate is null after native date functions
		// then try to use moment to get a js date for BC times?

		if (realDate == null) {
			// try bc dates
			if (cleanDate.indexOf('BC') > 0) {
				const BcYear = cleanDate.replace('BC', '').replace(/,/g, '');
				const paddedYear = BcYear.padStart(7, 0);
				realDate = `-${paddedYear}`;
				const startDate = new Date(realDate, 0, 1);
				if (typeof startDate.getTime === 'function') {
					dateSortMs = startDate.getTime();
				} else {
					dateSortMs = realDate;
				}
			}
			if (cleanDate.indexOf('AD') > 0) {
				const BcYear = cleanDate.replace('AD', '').replace(/,/g, '');
				const paddedYear = BcYear.padStart(7, 0);
				realDate = `${paddedYear}`;
				const d = new Date(realDate).toISOString().slice(0, 19).replace('T', ' ');
				if (typeof d.getTime === 'function') {
					dateSortMs = d.getTime();
				} else {
					dateSortMs = realDate;
				}
			}
			if (cleanDate.indexOf('ago') > 0) {
				const today = new Date();
				if (cleanDate.indexOf('years ago') > 0) {
					let yearsAgo = cleanDate.replace('years ago', '').replace(/,/g, '');
					if (yearsAgo.indexOf('million') > 0) {
						yearsAgo = yearsAgo.replace('million', '');
						const today = new Date();
						const oneMillionYearsMS = 31556952000000000;
						realDate = today.getTime() - yearsAgo * oneMillionYearsMS;
						dateSortMs = today.getTime() - yearsAgo * oneMillionYearsMS;
					}
					if (yearsAgo.indexOf('billion') > 0) {
						yearsAgo = yearsAgo.replace('billion', '');
						const today = new Date();
						const oneBillingYearsMS = 31556952000000000000;
						realDate = today.getTime() - yearsAgo * oneBillingYearsMS;
						dateSortMs = today.getTime() - yearsAgo * oneBillingYearsMS;
					} else if (yearsAgo <= 271821) {
						//oldest date js can handle?
						realDate = today.setFullYear(today.getFullYear() - yearsAgo);
					} else {
						const today = new Date();
						const yearMS = 31556952000;
						realDate = today.getTime() - yearsAgo * yearMS;
						dateSortMs = today.getTime() - yearsAgo * yearMS;
					}
				}
			}
		}
		if (realDate == null) {
			throw `Could not find date from string:  ${dateString}`;
		}

		return {
			realDate: realDate,
			dateSortMs: dateSortMs ? dateSortMs : realDate,
		};
	} catch (err) {
		console.log(err);
		return null;
	}
}

export default fetchWtf;
