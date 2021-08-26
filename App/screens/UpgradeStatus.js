import React, { useEffect, useContext, useState } from "react";
import {
    Text,
    View,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import { Inter_500Medium, Inter_400Regular } from "@expo-google-fonts/inter";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../assets/colors/colors";
import AppLoading from "expo-app-loading";
import { IconButton } from "../components/IconButton";
import { AppContext } from "../util/AppContext";
import fonts from "../assets/fonts/fonts";
import { Button } from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tw from "tailwind-react-native-classnames";
import FontStyles from "../components/FontStyles";
import ApprovalStatus from "../components/info/ApprovalStatus";
import { api } from "../config/api";
import { Log } from "../util/Logger";

export default ({ navigation }) => {
    const { setUpgradeSubmitted, user } = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(0);
    useEffect(() => {
        getUpgradeStatus();
    }, []);
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Inter_500Medium,
        Inter_400Regular,
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View>
                        <View style={styles.topBar}>
                            <IconButton
                                icon={
                                    <MaterialIcons
                                        name="arrow-back-ios"
                                        size={25}
                                        color={colors.iconDark}
                                    />
                                }
                                onPress={() => navigation.goBack()}
                            />
                            <IconButton
                                icon={
                                    <MaterialIcons
                                        name="menu"
                                        size={30}
                                        color={colors.iconDark}
                                    />
                                }
                                onPress={() => navigation.toggleDrawer()}
                            />
                        </View>

                        <Text style={styles.title}>Check approval</Text>
                        {loading ? (
                            <View style={styles.loader}>
                                <Text style={styles.loaderText}>
                                    Checking status...
                                </Text>
                                <ActivityIndicator
                                    size="small"
                                    color={colors.primary}
                                />
                            </View>
                        ) : (
                            <ApprovalStatus
                                status={status}
                                refresh={getUpgradeStatus}
                            />
                        )}

                        {status === 1 && (
                            <View style={styles.btnContainer}>
                                <Button onPress={reset} text="Retry" />
                            </View>
                        )}
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

    function getUpgradeStatus() {
        setLoading(true);
        const config = {
            headers: {
                auth: user.token,
            },
        };

        api.post(`driver/checkApproval.php`, {}, config)
            .then((resp) => {
                Log("getUpgradeStatus", resp.data);
                setLoading(false);
                if (resp.data.status === "OK") {
                    switch (resp.data.message) {
                        case "pending":
                            setStatus(0);
                            break;
                        case "declined":
                            setStatus(1);
                            break;
                    }
                }
            })
            .catch((err) => {
                Log("getUpgradeStatus", err);
            });
    }

    async function reset() {
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
        await AsyncStorage.removeItem("@upgrade", async () => {
            await AsyncStorage.removeItem("@upgradeSubmitted", () => {
                setUpgradeSubmitted(false);
                navigation.reset({
                    index: 0,
                    routes: [{ name: "Home" }],
                });
            });
        });
    }

    async function rmChooserId(id) {
        await AsyncStorage.removeItem(`@${id}`);
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    title: {
        fontFamily: fonts.poppinsRegular,
        fontSize: 40,
        color: colors.textLighter,
        paddingHorizontal: 20,
        marginTop: 10,
    },
    subtitle: {
        fontFamily: fonts.interMedium,
        paddingHorizontal: 20,
        fontSize: 17,
        color: colors.textLighter,
    },
    label: {
        color: colors.textLighter,
        fontFamily: "Inter_500Medium",
        fontSize: 17,
        marginBottom: 8,
        marginLeft: 20,
    },
    center: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
    },
    btnContainer: {
        padding: 20,
        marginTop: 20,
    },
    topBar: {
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 40,
        marginHorizontal: 30,
        marginBottom: 30,
        flexDirection: "row",
    },
    loader: {
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
    },
    loaderText: {
        fontFamily: fonts.interRegular,
        fontSize: 16,
        color: colors.textLighter,
        marginRight: 10,
    },
    status: {
        flexDirection: "row",
        alignItems: "center",
    },
    title2: {
        fontFamily: fonts.poppinsRegular,
        fontSize: 30,
        color: colors.textLighter,
        paddingHorizontal: 20,
        marginTop: 5,
        textAlign: "center",
    },
    subtitle2: {
        fontFamily: fonts.interRegular,
        paddingHorizontal: 20,
        fontSize: 19,
        color: colors.textLighter,
        textAlign: "center",
    },
});
