import React from "react";
import DrawerNavigation from "./config/DrawerNavigation";

import { AppContextProvider } from "./util/AppContext";

export default () => (
    <AppContextProvider>
        <DrawerNavigation />
    </AppContextProvider>
);
