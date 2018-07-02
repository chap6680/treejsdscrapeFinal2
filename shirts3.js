const scrapeIt = require("scrape-it")
let groupAll = []

function getpage(tempURL) {
	scrapeIt(tempURL, {
		shirtitems: {
			listItem: "html",
			data: {
				title: "head title",
				price: ".price",
				imageURL: {
					selector: ".shirt-picture img"
					, attr: "src"
				}
			}
		},

	}).then(({ data, response }) => {
		data.shirtitems[0].url = tempURL
		data.shirtitems[0].time = new Date().toTimeString();
		console.log(`Status Code: ${response.statusCode}`)
		console.log(data)
		console.log(data.shirtitems[0].price)
		groupAll.push(data.shirtitems[0])
		console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxx")
		//console.log(groupAll[0])
		//console.log(groupAll);
	})
}	

let listItemDetailURLs = [
	'http://shirts4mike.com/shirt.php?id=101',
	'http://shirts4mike.com/shirt.php?id=102',
	'http://shirts4mike.com/shirt.php?id=103',
	'http://shirts4mike.com/shirt.php?id=104',
	'http://shirts4mike.com/shirt.php?id=105',
	'http://shirts4mike.com/shirt.php?id=106'
];

/*listItemDetailURLs.forEach(element => {
	getpage(element)
	});
	*/
let actions = listItemDetailURLs.map(getpage);
Promise.all(actions).then(data => { 
	console.log('yyyyyyyyyyyyy');
	console.log(groupAll);
});

// map over forEach since it returns
/* 
let results = Promise.all(actions);
results.then();


var actions = items.map(fn); // run the function over all items

// we now have a promises array and we want to wait for it

var results = Promise.all(actions); // pass array of promises

results.then(data => // or just .then(console.log)
    console.log(data) // [2, 4, 6, 8, 10]
); */
//console.log(groupAll[0])
