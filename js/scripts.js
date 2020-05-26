const galleryDiv = document.querySelector('#gallery');

// async to retrieve Promise when ready
async function fetchData(url) {
	const response = await fetch(url);
	const data = await response.json();
	const userList = data.results;
	// passes data to create main html
	generateMainHTML(userList);

	// The following function should compare the userList against the user interaction and display data
	// based on the user's click. 
	// generateModalHTML(userList);
}

// calls api for data promise object
fetchData("https://randomuser.me/api/?results=12&nat=us");

function generateMainHTML(userList) {
	userList.forEach(user => {
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
}

// generateModalHTML(userList) {}
