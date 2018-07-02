const scrapeIt = require("scrape-it")
let groupAll = []

scrapeIt("http://shirts4mike.com/shirt.php?id=101", {
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
	data.shirtitems[0].url = 'http://google.com'
	data.shirtitems[0].time = new Date().toTimeString();
	console.log(`Status Code: ${response.statusCode}`)
	console.log(data)
	console.log(data.shirtitems[0].price)
	groupAll.push(data.shirtitems)
	console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxx")

	console.log(groupAll[0])
})
	
	/* , (err, { data }) => {
	console.log(err || data)
});
 */