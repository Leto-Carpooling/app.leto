import AsyncStorage from "@react-native-async-storage/async-storage";

export const removeUpgradeStatus = async () => {
    await AsyncStorage.removeItem("@upgrade");
    await AsyncStorage.removeItem("@upgradeSubmitted");
};

export const removeDriverStatus = async () => {
    await AsyncStorage.removeItem("@is_driver");
};

export const removeDocSubmissions = async () => {
    const choosers = [
        {
            id: "nid-image",
            label: "National ID",
            endPoint: "driverUploads.php",
        },
        ,
        {
            id: "reg-li-image",
            label: "Driver's License",
            endPoint: "driverUploads.php",
        },
        ,
        {
            id: "psv-li-image",
            label: "PSV License",
            endPoint: "driverUploads.php",
        },
        ,
        {
            id: "good-conduct-image",
            label: "Good Conduct Certificate",
            endPoint: "driverUploads.php",
        },
        {
            id: "v-ins-image",
            label: "Vehicle Insurance",
            endPoint: "vehicleUploads.php",
        },
        {
            id: "v-reg-image",
            label: "Logbook",
            endPoint: "vehicleUploads.php",
        },
        {
            id: "v-ir-image",
            label: "NTSA Inspection Report",
            endPoint: "vehicleUploads.php",
        },
    ];
    choosers.map((chooser) => {
        rmChooserId(chooser.id);
    });
};

async function rmChooserId(id) {
    await AsyncStorage.removeItem(`@${id}`);
}
