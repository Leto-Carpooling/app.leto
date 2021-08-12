import React from "react";
import DrawerNavigation from "./config/DrawerNavigation";
import Navigation from "./config/Navigation";

import { AppContextProvider } from "./util/AppContext";

export default () => (
    <AppContextProvider>
        <DrawerNavigation />
    </AppContextProvider>
);
