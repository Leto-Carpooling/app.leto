import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Log } from "./Logger";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [upgradeSubmitted, setUpgradeSubmitted] = useState(false);
    useEffect(() => {
        getUser(setUser);
        getUpgradeSubmitted(setUpgradeSubmitted);
    }, []);

    const context = {
        user,
        setUser,
        upgradeSubmitted,
        setUpgradeSubmitted,
    };
    return (
        <AppContext.Provider value={context}>{children}</AppContext.Provider>
    );
};

async function getUser(setUser) {
    const user = await AsyncStorage.getItem("@user");
    //Log("getUser", user);
    setUser(JSON.parse(user));
}

async function getUpgradeSubmitted(setUpgradeSubmitted) {
    const submitted = await AsyncStorage.getItem("@upgradeSubmitted");
    //Log("getUser", user);
    if (submitted) {
        setUpgradeSubmitted(true);
    }
}
