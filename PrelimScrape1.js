const scrapeIt = require("scrape-it")
const fs = require('fs');
const csvParse = require('json2csv').Parser;

//array capturing scraped item detail - gets pushed to csv
let arrayTShirtDetail = [];

// get current date
const date = new Date();

//tempNotification - used as a flag - that there was an error.
let consoleNotify = 0;
let csvError = 0;

//default urls & paths to save files
const searchURL = "http://shirts4mike.com/shirts.php/";
const topURL = "http://shirts4mike.com/"
const localdir = './data';
const fileName = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.csv`;
//let dateStringScrape = "./data/scrapper-err" + date.getFullYear() + "-" + date.getMonth() + ".log";

//Error Log file name and location
errorPathName = "./data/scrapper-err.log";

// CSV - Set default fields 
const fields = ["Title", "Price", "ImageURL", "URL", "Time"];

// Add fields - json2csv parser
const csvParser = new csvParse({ fields, quote:"", delimiter:', ' });
const csvHandler = (data) => {
	try {
		const parser = csvParser.parse(data);
		fs.writeFile(`${localdir}/${fileName}`, parser, error => {
			if (error) { 

			if (csvError === 0) {
				console.log(`Error saving CSV.  CSV Not updated.  Check to see if file at ${errorPathName} is currently open`);
				csvError = 1;
				consoleNotify = 1;
			}
		}
		});

	} catch (error) {
		console.log("error writing to file");
//		console.log(error);
		if (csvError === 0) {
			csvError = 1;
		}
	};
	return csvError;
}

// csv - writes and creates file;  will overwrite existing file
/* const csvHandler = (data) => {
	//try {
	const parser = csvParser.parse(data);
    
	fs.writeFile(`${localdir}/${fileName}`, parser, error => {
		if (err) throw 'error writing file: ' + err;
 */

 /* 		const errorMsg = ;
				fs.appendFile(errorPathName, "\n" + `[${date.toString()}] <${errorMsg}>\n`, err => {
					if (err) throw error;
				}); */

				/*
		const parser = csvParser.parse(data);fs.writeFile(`${localdir}/${fileName}`, parser, error => {
			
			const errorMsg = ;
			fs.appendFile(errorPathName, "\n" + `[${date.toString()}] <${errorMsg}>\n`, err => {
				if (err) throw error;
			});
 */	

		//console.log({ error });
	/* 	if (error) {
			console.log({ error });
			if (errno === -4082) {
				console.log("Scrape Failed.  Appears the CSV File is open");
				process.exit();
			};
		} 
//      if (error) throw error;
		if (error) { 
			return console.log(error)
		}
	});
}
*/

// Create localdirectory 
if(!fs.existsSync(localdir)){
    fs.mkdirSync(localdir);
}

// direct urls - used for testing
/* let listItemDetailURLs = [
	'http://shirts4mike.com/shirt.php?id=101',
	'http://shirts4mike.com/shirt.php?id=102',
	'http://shirts4mike.com/shirt.php?id=103',
	'http://shirts4mike.com/shirt.php?id=104',
	'http://shirts4mike.com/shirt.php?id=105',
	'http://shirts4mike.com/shirt.php?id=106'
];
 */

/*  Main Working Function - from scrape-it NPM
DATA TITLE NOTE - treated name of shirt and color as title
Removed comma between the shirt and color.  This may
need to be modified depending on use 
*/
scrapeIt(searchURL, {
	shirts: {
		listItem: ".products li",
		data: {
			url: {
				selector: "a",
				attr: "href"
			}
		}
	}
}).then(({
	data
}) => {
	    // store url item found in top url
		const scrapeIndividualURL = data.shirts.map(url => `${topURL}${url.url}`);
		scrapeIndividualURL.map(tempURL => {
	
	//listItemDetailURLs.map(tempURL => {
		scrapeIt(tempURL, {
			shirtitems: {
				listItem: "html",
				data: {
					Title: "head title",
					Price: ".price",
					ImageURL: {
						selector: ".shirt-picture img",
						attr: "src"
					}
				}
			},

		}).then(({
			data
		}) => {
			//getting info before pushing to array

			//this removes the comma from the shirt & color title
			const temptitle = data.shirtitems[0].Title;
			data.shirtitems[0].Title = temptitle.replace(",", "");
			data.shirtitems[0].URL = tempURL;
			data.shirtitems[0].Time = new Date().toTimeString();

			//this pushes info into the array
			arrayTShirtDetail.push(data.shirtitems[0]);
			return data;
		}).then(data => {
			//console.log(arrayTShirtDetail);

			//CSV - call function to create 
			const csvtemp = csvParser.parse(arrayTShirtDetail);
			csvHandler(arrayTShirtDetail);
			if (consoleNotify === 0) {
				console.log(`Data scraped and saved at ${localdir}/${fileName}`);
				consoleNotify = 1;
			}
			if (csvError === 1) { 
				console.log('Failed to update CSV');
				fs.appendFile(errorPathName, ("\r\n" + "Failed to update CSV.  CSV not updated."), err => { 
					if (err) throw error;
				});
				
			}
		})
	})
	}).catch(
		function(error) {
			if (error.code === "ENOTFOUND" || error.code === "ENOENT") {
				const errorMsg = `There's been a 404 error. Cannot connect to ${searchURL}.  See ${errorPathName}`;
				console.log(errorMsg);
				// When an error occurs, it is logged to a file named scraper-error.log 
				fs.appendFile(errorPathName, "\r\n" + `[${date.toString()}] <${errorMsg}>\n`, err => {
					if (err) throw error;
				});
			}
	 })

	
/* const displayError = (error) => {
	if (error) {
		if (error.code === "ENOTFOUND" || error.code === "ENOENT") {
			const errorMsg = `There's been a 808 error. Cannot connect to http://shirts4mike.com`;
			console.log(errorMsg);
			// When an error occurs, it is logged to a file named scraper-error.log 
			fs.appendFile("./scrapper-err.log", "\n" + `[${date.toString()}] <${errorMsg}>\n`, err => {
				if (err) throw error;
			});
		}

	}
}
 */

// push info on every t-shirt into an array and store in a file 
/* 	data.shirtitems[0].url = tempURL
	data.shirtitems[0].time = new Date().toTimeString();
	console.log(data)
	console.log(data.shirtitems[0].price)
	groupAll.push(data.shirtitems[0])
	console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxx")
	return groupAll; */


/* setTimeout(function () {
	console.log('done3');
	console.log(tShirtData);

}, 3000) */


/* getpage('http://shirts4mike.com/shirt.php?id=101');

 */


/* Promise.all( [listItemDetailURLs.map(item => getpage(item))
]).then(result => console.log(groupAll))

 */
/* async function bridge() {
	return new Promise(function (resolve, reject) {
		listItemDetailURLs.map(item => getpage(item));
		resolve(groupAll);
	});
}; */
/* 
let bridge = new Promise(function (resolve, reject) {
		listItemDetailURLs.map(item => getpage(item));
		resolve(groupAll);
	});
 */
/* 
Promise.all(bridge).then(data => { console.log('done2') }); */

/* var askMom = function() { 
	
		console.log('starting');
//		let cross = await bridge();
		bridge.then(function(fulfilled) { 
			console.log(fulfilled);
			console.log('done3');
		});	
		console.log('done');
	}
 */
/* (async () => {
	await askMom();
	setTimeout(function() {
		console.log('done2');
		console.log(groupAll)
	}, 3000);
})(); */

/* Promise.all(askMom()).then(function () {
	setTimeout(function () {
		console.log('done2');
		console.log(groupAll)
	}, 3000)
}); */