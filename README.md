# Yelp Map Viewer React Native App

This react native app is to use the yelp API search method to locate points of interest based on your current location

## Prereq's

* node v4.2.1 to run as a local server running on port 3000
* API keys from yelp
* xCode 7.1
*This is version of the software I used and may work with different versions*

The yelp API call requires that you are authenticated and sets it in the request headers so you cannot just make a call from your client. I had to make node/express server to use it with the app.

## Install

```
npm install
```

Create a yelpAPIKeys.js file in the /server folder

example

```
module.exports = {
  consumer_key: "YOUR API KEY",
  consumer_secret: "YOUR API KEY OF COURSE",
  token: "YOUR API KEY OF COURSE",
  token_secret: "YOUR API KEY OF COURSE"
};
```

## Run

Start the server

```
node ./server/app.js
```

Open xCode and hit the run button to build.
This app is currently optimized for iPhone 6

## TODO's

1. Make new branches
  - Initial single file working version - DONE
  - Break up into different components and use ES2015 syntax
  - Use a flux like pattern like Redux
2. tests :)
