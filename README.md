# Who's Down


## Project Description
React Native application for event creators and event seekers. Developed as the final project for CS52 Web Full-Stack Web Development at Dartmouth College. Application uses a REST API server written using the Express.js framework. The server is hosted on Heroku.


Contributors: 
* Aarish Iyer
* Anjali Chikkula
* April Zhang
* Arjun Bhatt
* Musab Shakeel
* Sihao Huang


## Demo
![demo](assets/GIF-200608_232258.gif)

## Running locally
Follow these steps to run the application locally: 
- Clone the repository 
- run ```yarn install``` in the root of the repository
- run ```expo start```

This assumes that you have ```expo-cli``` installed already.


## Architecture
Main Components
- MapView
    - Geographic event view
    - Google maps API
- EventFeed
    - List-display of events
- NewEvent
    - Event creation view
- EventInfoPreview
    - Little thing that comes up on google maps
- EventInfo
    - Event 
- EventChat
    - Event specific chat board/group chat
    - Requires user sign-in
- Settings
- UserProfile
- SignIn
    - Sign in/up page

