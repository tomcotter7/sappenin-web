export async function getLatLngFromPostcode(postcode) {
	const url = "https://api.postcodes.io/postcodes/" + postcode;
	const response = await fetch(url);
	const data = await response.json();
	const lat = data.result.latitude;
	const lng = data.result.longitude;
	return [lat, lng];
}
