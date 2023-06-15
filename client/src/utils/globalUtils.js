export default {
	addRoomToURL: (homeUrl, token, hex) => {
		// console.log(homeUrl);
		// console.log(token);
		homeUrl === `http://localhost:3000/home?access_token=${token}` ||
		homeUrl === `http://localhost:3000/home?access_token=${token}#_=_`
			? window.location.replace(
					`http://localhost:3000/room?access_token=${token}&room_id=${hex}`
			  )
			: homeUrl ===
					`https://playlistr-io.herokuapp.com/home?access_token=${token}` ||
			  homeUrl ===
					`https://playlistr-io.herokuapp.com/home?access_token=${token}#_=_`
			? window.location.replace(
					`http://playlistr-io.herokuapp.com/room?access_token=${token}&room_id=${hex}`
			  )
			: console.log('URL Error');
	}
};