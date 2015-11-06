const rootUrl = 'http://localhost:3000/search?';
// specific end point url required for this fetch
export default function(latitute, longitude, term) {
  let termEncoded = encodeURI(term);
  let url = rootUrl + "latitude=" + latitute + "&longitude=" + longitude + "&term=" + termEncoded;
  // returns so the fetch in the app can treat it as a promise
  return fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      return json.businesses;
    });
};
