import React, { useEffect, useContext, useState } from "react";
import {
    Text,
    View,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Alert,
} from "react-native";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import { Inter_500Medium, Inter_400Regular } from "@expo-google-fonts/inter";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../assets/colors/colors";
import AppLoading from "expo-app-loading";
import { IconButton } from "../components/IconButton";
import UpgradeProgressIndicator from "../components/UpgradeProgressIndicator";
import fonts from "../assets/fonts/fonts";
import { LabelledTextInput } from "../components/LabelledTextInput";
import Spacer from "../components/Spacer";
import { Button } from "../components/Button";
import { Avatar } from "../components/Avatar";
import { AppContext } from "../util/AppContext";
import { api } from "../config/api";
import { Log } from "../util/Logger";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default ({ navigation }) => {
    const { user } = useContext(AppContext);
    const [natID, onChangeNatID] = useState("23535446");
    const [dlNum, onChangeDlNum] = useState("AS3535446");
    const [btnLoading, setBtnLoading] = useState(false);

    useEffect(() => {
        getUpgradeStage();
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
                        <UpgradeProgressIndicator level={1} />
                        <Text style={styles.title}>Upgrade to driver</Text>
                        <Text style={styles.subtitle}>Your details</Text>

                        <Spacer height={20} />

                        {renderProfileBox(checkHasAvatar())}

                        <Spacer height={10} />

                        <View>
                            <LabelledTextInput
                                label="National ID"
                                placeholder="23535446"
                                iconName="person"
                                keyboardType="number-pad"
                                value={natID}
                                onChangeText={onChangeNatID}
                            />
                        </View>

                        <Spacer height={10} />

                        <View>
                            <LabelledTextInput
                                label="Driver's license number"
                                placeholder="AS3535446"
                                iconName="person"
                                keyboardType="numeric"
                                value={dlNum}
                                onChangeText={onChangeDlNum}
                            />
                        </View>

                        <View style={styles.btnContainer}>
                            <Button
                                onPress={sendDetails}
                                text="Next"
                                loading={btnLoading}
                            />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

    async function getUpgradeStage() {
        const stage = await AsyncStorage.getItem("@upgrade");
        if (stage != null) {
            Log("getUpgradeStage", stage);
            navigation.navigate(`${stage}`);
        }
    }

    async function setUpgradeStage() {
        await AsyncStorage.setItem("@upgrade", "UpgradeTwo", () => {
            navigation.navigate("UpgradeTwo");
        });
    }

    async function sendDetails() {
        //navigation.navigate("UpgradeTwo");
        setBtnLoading(true);

        const params = new FormData();
        params.append("action", "personal");
        params.append("national-id", natID);
        params.append("regular-license", dlNum);

        const config = {
            headers: {
                auth: user.token,
            },
        };

        api.post(`driver/updateDriver.php`, params, config)
            .then((resp) => {
                setBtnLoading(false);
                Log("sendDetailsOne", resp.data);
                if (resp.data.status === "OK") {
                    setUpgradeStage();
                } else {
                    Alert.alert("Error", resp.data.message);
                }
            })
            .catch((err) => {
                setBtnLoading(false);
                Log("sendDetailsOne", err);
            });
    }

    function renderProfileBox(hasAvatar) {
        if (!hasAvatar) {
            return (
                <View style={styles.avatarContainer}>
                    <Avatar size={100} src={user.profileImage} />
                    <Text style={styles.avatarText}>
                        Tap to add profile picture
                    </Text>
                </View>
            );
        }
    }

    function checkHasAvatar() {
        return !(
            user.profileImage ===
                "profile_images/./../assets/img/profile.svg" ||
            user.profileImage === "./../assets/img/profile.svg"
        );
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
    avatarContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        padding: 10,
    },
    avatarText: {
        fontFamily: fonts.interRegular,
        fontSize: 16,
        flex: 1,
        marginLeft: 10,
        flexWrap: "wrap",
        color: colors.textLighter,
    },
});
