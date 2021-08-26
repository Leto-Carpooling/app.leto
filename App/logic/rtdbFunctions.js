
/**
 * Writes to the firebase database
 * @param {string} url - the string of the path to which you are writing
 * @param {JSON} data - the json data you want to write to the database
 * @param {firebase.database.Database} db - the firebase database object
 */
export const writeToDatabase = async (url, data, db) => {
    return await db.ref(url).set(data);
};

/**
 * Delete from firebase realtime db
 * @param {string} url
 * @param {firebase.database.Database} db
 */
export const deleteFromDatabase = async (url, db) => {
    return await db.ref(url).remove();
};

/**
 * Updates the firebase realtime database
 * @param {JSON} updates - the data, following the update format
 * @param {firebase.database.Database} db - the database 
 */
export const updateDatabase = async (updates, db) => {
    return await db.ref().update(updates);
}