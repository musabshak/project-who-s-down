# Who's Down
![](https://i.imgur.com/M3TWiwW.jpg)

## Running locally
Follow these steps to run the application locally: 
- Clone the repository 
- run ```yarn install``` in the root of the repository
- run ```expo start```

This assumes that you have ```expo-cli``` installed already.


## Project Description
ReactNative application for event creators and event seekers.
![](https://i.imgur.com/g5awbh8.png)

## Dev Site Update
- URL for the front-end React Native app: https://expo.io/@whosdown/project-who-s-down
- The skeleton of the 'add new event' page is up. The title of a new
event can be entered. Clicking on the 'create event' button initiates a 
post request to the api server and the event is saved in a mongodb database.
The api server returns the newly created event object as a confirmation message.
The event title is extracted from this return event object and displayed on the
screen. This demonstrates communication of data between the frontend and the api 
server.
- For some reason, the event title is not displayed in the confirmation prompt
when the app is run on a phone. It displays properly when viewed in the browser.
Need to debug this.

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

## Setup

- Pull the project repo
- ```yarn install```
- ```expo start``` -- this opens up expo interface in the browser, and then you can choose how you'd like to see the app

## Deployment

Since we're using React Native, we will have both an Andoid and iOS app that will be deployed to the Play store and App store respectively. 
## Authors

* Arjun Bhatt
* Anjali Chikkula
* Sihao Huang
* Aarish Iyer
* Musab Shakeel
* April Zhang


## Acknowledgments
We are proud of our whiteboard drawings:)
