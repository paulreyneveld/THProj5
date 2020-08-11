const galleryDiv = document.querySelector('#gallery');

/** Async function uses fetch to obtain and parse data.
 *
 * @param {string} URL to be fetched.
 * return {promise} Retrieved data.
 */

async function fetchData(url) {
	const response = await fetch(url);
	const data = await response.json();
	const { results } = data;
	// Passes data to create main html
	generateMainHTML(results);
}

// Calls async function to obtain data from the API. 
fetchData("https://randomuser.me/api/?results=12&nat=us");

/** Function to generate main page based on data from the API. 
 *
 * @param {object} Returned data from API.
 */ 

function generateMainHTML(results) {
	// Generates the HTML based on the data passed. 
	results.forEach(user => {
		const cardDiv = document.createElement('div');
		const imgContDiv = document.createElement('div');
		const infoContDiv = document.createElement('div');

		cardDiv.className = 'card';
		imgContDiv.className = 'card-img-container';
		infoContDiv.className = 'card-info-container';
		galleryDiv.appendChild(cardDiv);
		cardDiv.appendChild(imgContDiv);
		cardDiv.appendChild(infoContDiv);

		imgContDiv.innerHTML = `<img class="card-img" src="${user.picture.medium}" alt="profile picture">`;
		infoContDiv.innerHTML = `<h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
						<p class="card-text">${user.email}</p>
						<p class="card-text cap">${user.location.city}, ${user.location.state}</p>`;
	});

	// Uses the supplied card class to create an event listener for each card. 
	// And, passes the data from the async function along with the index from the 
	// event listener on to the generateModalHTML function. 
	const cardNodeList = document.querySelectorAll('.card');

	// Force nodelist into an array like structure for easier manipulation. 
	const cardArr = Array.from(cardNodeList);
	cardArr.forEach((card, index) => {
		card.addEventListener('click', (e) => {
			generateModalHTML(results, index)
		});
	});
}

/** Function to generate html for the modal window on click.
 *
 * @param {object} Returned data from API. 
 * @param {integer} Index from event listener. 
 */

function generateModalHTML(results, index) {
	// Manipulates results data for the appropriate DOB formatting on output. 
	let dob = results[index].dob.date.substring(0,10);
	let formattedDate = `${dob.substring(5,7)}/${dob.substring(8,12)}/${dob.substring(2,4)}`;

	// Generates HTMl for the modal window. 
	const modalContDiv = document.createElement('div');
	const modalDiv = document.createElement('div');
	const button = document.createElement('button');
	const modalInfoContDiv = document.createElement('div');

	modalContDiv.className = 'modal-container';
	modalDiv.className = 'modal';
	button.id = 'modal-close-btn';
	button.className = 'modal-close-btn';
	button.type = 'button';
	modalInfoContDiv.className = 'modal-info-container';

	galleryDiv.after(modalContDiv);
	modalContDiv.appendChild(modalDiv);
	modalDiv.appendChild(button);
	button.after(modalInfoContDiv);
	button.innerHTML = '<strong>X</strong>';
	modalInfoContDiv.innerHTML = 
                       `<img class="modal-img" src="${results[index].picture.large}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${results[index].name.first} ${results[index].name.last}</h3>
                        <p class="modal-text">${results[index].email}</p>
                        <p class="modal-text cap">${results[index].location.city}</p>
                        <hr>
                        <p class="modal-text">${results[index].cell}</p>
                        <p class="modal-text">${results[index].location.street.number}, ${results[index].location.street.name} ${results[index].location.city}, ${results[index].location.state} ${results[index].location.postcode}  </p>
                        <p class="modal-text">Birthday: ${formattedDate} </p>`;
	
	// Event listener on button closes modal window when user is finished. 	
	button.addEventListener('click', (e) => {
		modalContDiv.style.display = 'none';
	});
}
