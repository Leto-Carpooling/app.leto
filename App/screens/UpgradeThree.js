import React, { useEffect } from "react";
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
import { FileChooser } from "../components/FileChooser";

export default ({ navigation }) => {
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
                        <UpgradeProgressIndicator level={3} />
                        <Text style={styles.title}>Upgrade to driver</Text>
                        <Text style={styles.subtitle}>Legal docs</Text>

                        <Spacer height={20} />

                        <FileChooser label="National ID" />
                        <Spacer height={10} />
                        <FileChooser label="National ID" />
                        <Spacer height={10} />
                        <FileChooser label="National ID" />

                        <View style={styles.btnContainer}>
                            <Button onPress={() => alert("todo")} text="Next" />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
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
});
