import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Log } from "./Logger";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        getUser(setUser);
    }, []);

    const context = {
        user,
        setUser,
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
