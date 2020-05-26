// Start by obtaining the data from the API. 
// I'm borrowing this code from the TH course on the same topic. 

const galleryDiv = document.querySelector('#gallery');

async function fetchData(url) {
	const response = await fetch(url);
	const data = await response.json();
	dataPusher(data.results);
}
fetchData("https://randomuser.me/api/?results=12&nat=us");

function dataPusher(userList) {
	userList.forEach( user => {
		generateMainHTML(user.picture.medium, user.name.first, 
				user.name.last, user.email, 
				user.location.city, user.location.state);
	});
}

// So the fact of the matter is that I don't need my dataPusher function. I should just
// push the data into the function and then use a forEach in the function to achieve the same effect.
// I should refactor this code to embrace that idea before setting up the modal window as 
// I want it to work in basically the same fashion. 

function generateMainHTML(userImgURL, firstName, lastName, email, city, state) {
	const cardDiv = document.createElement('div');
	const imgContDiv = document.createElement('div');
	const infoContDiv = document.createElement('div');

	cardDiv.className = 'card';
	imgContDiv.className = 'card-img-container';
	infoContDiv.className = 'card-info-container';
	galleryDiv.appendChild(cardDiv);
	cardDiv.appendChild(imgContDiv);
	cardDiv.appendChild(infoContDiv);

	imgContDiv.innerHTML = `<img class="card-img" src="${userImgURL}" alt="profile picture">`;
	infoContDiv.innerHTML = `<h3 id="name" class="card-name cap">${firstName} ${lastName}</h3>
					<p class="card-text">${email}</p>
					<p class="card-text cap">${city}, ${state}</p>`;
}

function generateModalHTML(userImgURL, firstName, lastName, email, city, cell, address, birthday) {
	
}
