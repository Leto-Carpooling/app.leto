import firebase from "firebase/app";
import "firebase/database";

import {
    FIREBASE_APP_API_KEY,
    FIREBASE_APP_AUTH_DOMAIN,
    FIREBASE_APP_DATABASE_URL,
    FIREBASE_APP_PROJECT_ID,
    FIREBASE_APP_STORAGE_BUCKET,
    FIREBASE_APP_MESSAGING_SENDER_ID,
    FIREBASE_APP_APP_ID,
    FIREBASE_APP_MEASUREMENT_ID,
} from "@env";

const firebaseConfig = {
    apiKey: FIREBASE_APP_API_KEY,
    authDomain: "leto-322311.firebaseapp.com",
    databaseURL: "https://leto-322311-default-rtdb.firebaseio.com",
    projectId: "leto-322311",
    storageBucket: "leto-322311.appspot.com",
    messagingSenderId: "940009095847",
    appId: "1:940009095847:web:e82f40e2ed4bf301e81182",
    measurementId: "G-NJ7P1YNWZ9",
};

firebase.initializeApp(firebaseConfig);

export const database = firebase.database();

/**
 * Writes to the firebase database
 * @param {string} url - the string of the path to which you are writing
 * @param {JSON} data - the json data you want to write to the database
 * @param {firebase.database.Database} db - the firebase database object
 */
export const writeToDatabase = async function (url, data, db){
    return await db.ref(url).set(
        data
    );
}



/**
 * Delete from firebase realtime db
 * @param {string} url 
 * @param {firebase.database.Database} db 
 */
export const deleteFromDatabase = async function (url, db){
    return await db.ref(url).remove();
}

