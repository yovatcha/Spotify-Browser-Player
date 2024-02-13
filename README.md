# Spotify Web Player


This project is a web-based Spotify player built with React and Chakra UI. It allows users to access their Spotify account, view their currently playing track, play/pause songs, skip to the next or previous track, and view their user profile. The application integrates with the Spotify Web API to fetch user data and control playback.


## Features
View currently playing track with album artwork, song name, and artist information.
Play or pause the currently playing track.
Skip to the next or previous track.
View user profile information including profile picture and display name.
Access external links to get an access token and explore the Spotify Developer documentation.
## Example Demo
![ExampleDemo](/demo.png)


## Technologies Used
- React: JavaScript library for building user interfaces.
- Chakra UI: React component library for building accessible and customizable UI components.
- Spotify Web API: RESTful API provided by Spotify for accessing Spotify data and controlling playback.

<b>Installation</b>
Clone the repository to your local machine. Install dependencies using...
```shell
npm install
```
## Usage
1. Obtain a Spotify access token from the Spotify Developer Dashboard.
https://developer.spotify.com/documentation/web-api
2. Update the <b>accessToken.ts</b> file with your access token.
3. Run the application using...
```shell
npm run dev
```
Explore the Spotify player functionalities on the web interface.
