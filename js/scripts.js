// Start by obtaining the data from the API. 
// I'm borrowing this code from the TH course on the same topic. 
function fetchData(url) {
	return fetch(url)
		.then(response => response.json())
} 

const data = fetchData('https://randomuser.me/api/?results=12')
	// The following line allows for access to individual pieces of data from the returned object. 
	//.then(data => console.log(data.info, data.results, data.results[3].email) );
	.then(data => {
		console.log(data.results[3].email);
		console.log(data.results);
		console.log(typeof data);
		const users = data.results.map(user => {
			return user.email;
		});
		console.log(users)
	});

	// Okay, I have some things going for me right now, but I need to figure out how to map the incoming data to
	// individual objects with only the info I want. I also need to do some error checking with regard to the 
	// initial retrieval of the data. 

console.log(data);
// Okay, so I have the data coming in. I'm going to want to map it somehow, but I'm 
// not yet clear on exactly how I'm going to do that. 
