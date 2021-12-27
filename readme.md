# Leto

#### Cross-platform mobile application for car-pooled ride hailing

##### Built using React Native and Expo

## Running the project
1. Download and install Node JS : https://nodejs.org/en/
2. Install `Expo` using `npm install --global expo-cli`
3. Clone the repo
4. Open a terminal and at the project's root directory run ```npm install```
5. Install `yarn` using ```npm install --global yarn```
6. Then run ```yarn``` at the root still - `yarn` and `npm install` serve to install dependencies
7. Run project (still from the root directory) using `expo start`. It will open a browser window :)


## How to use Firebase in app

Okay, so I have setup firebase optimally such that we only initialize it once and access the database object via React Context. Below are instructions on how to access it from the context.

#### Step 1: Import the react hook useContext

`import React, {useContext} from React"`

#### Step 2: Import AppContext component

This is where the context information and metadata is stored

`import {AppContext} from "../util/AppContext"`

#### Step 3: Initialize context and extract context data

Now inside your functional component add this line which will extract the db object via object destructuring from the context data.

`const {db} = useContext(AppContext)`

#### Step 4: Use the extracted object

You can then use the data as you wish

```
db.ref().on()...
...

```
