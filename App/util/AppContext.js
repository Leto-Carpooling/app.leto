import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { database } from "./firebase";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isDriver, setIsDriver] = useState(false);
    const [origin, setOrigin] = useState(null);
    const [dest, setDest] = useState(null);
    const [upgradeSubmitted, setUpgradeSubmitted] = useState(false);
    const [db] = useState(database);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        (async () => {
            await getUser(setUser);
            await getIsDriver(setIsDriver);
            await getUpgradeSubmitted(setUpgradeSubmitted);
            setReady(true);
        })();
    }, []);

    const context = {
        user,
        setUser,
        upgradeSubmitted,
        setUpgradeSubmitted,
        origin,
        setOrigin,
        dest,
        setDest,
        isDriver,
        setIsDriver,
        db,
        ready,
    };
    return (
        <AppContext.Provider value={context}>{children}</AppContext.Provider>
    );
};

async function getUser(setUser) {
    const user = await AsyncStorage.getItem("@user");
    setUser(JSON.parse(user));
}

async function getIsDriver(setIsDriver) {
    const is_driver = await AsyncStorage.getItem("@is_driver");
    setIsDriver(is_driver ? true : true);
}

async function getUpgradeSubmitted(setUpgradeSubmitted) {
    const submitted = await AsyncStorage.getItem("@upgradeSubmitted");
    if (submitted) {
        setUpgradeSubmitted(true);
    }
}
