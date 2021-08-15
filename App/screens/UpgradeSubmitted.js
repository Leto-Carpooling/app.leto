import React, { useEffect, useContext } from "react";
import { Text, View, SafeAreaView, StyleSheet, ScrollView } from "react-native";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "../util/AppContext";

export default ({ navigation }) => {
    const { setUpgradeSubmitted } = useContext(AppContext);
    useEffect(() => {
        const isVerified = true;
        if (!isVerified) {
            navigation.navigate("VerifyEmail");
        }
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
                                        name="menu"
                                        size={30}
                                        color={colors.iconDark}
                                    />
                                }
                                onPress={() => navigation.toggleDrawer()}
                            />
                        </View>
                        <Text style={styles.title}>Upgrade to driver</Text>

                        <View style={styles.iconContainer}>
                            <MaterialIcons
                                name="playlist-add-check"
                                color={colors.primary}
                                size={200}
                            />
                        </View>

                        <Text style={styles.title2}>All submitted.</Text>
                        <Text style={styles.subtitle2}>
                            Check approval status via the menu.
                        </Text>

                        <View style={styles.btnContainer}>
                            <Button onPress={toHome} text="OK" />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

    async function toHome() {
        await AsyncStorage.setItem("@upgradeSubmitted", "submitted");
        setUpgradeSubmitted(true);
        navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
        });
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
    title2: {
        fontFamily: fonts.poppinsRegular,
        fontSize: 35,
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
        justifyContent: "flex-end",
        marginTop: 40,
        marginHorizontal: 30,
        marginBottom: 30,
        flexDirection: "row",
    },
    iconContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
});
