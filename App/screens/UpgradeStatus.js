import React, { useEffect } from "react";
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
import UpgradeProgressIndicator from "../components/UpgradeProgressIndicator";
import fonts from "../assets/fonts/fonts";
import { LabelledTextInput } from "../components/LabelledTextInput";
import Spacer from "../components/Spacer";
import { Button } from "../components/Button";
import { Avatar } from "../components/Avatar";

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

                        <Text style={styles.title}>Upgrade to driver</Text>

                        <View style={styles.loader}>
                            <Text style={styles.loaderText}>
                                Checking status...
                            </Text>
                            <ActivityIndicator
                                size="small"
                                color={colors.primary}
                            />
                        </View>

                        <View style={styles.status}>
                            <MaterialIcons
                                name="error" //or error/pending
                                color={colors.danger} //or danger/primary
                                size={300}
                            />
                            <Text style={styles.title2}>
                                Your submission was declined.
                            </Text>
                            <Text style={styles.subtitle2}>
                                You can try again.
                            </Text>
                        </View>

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
    loader: {
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
    },
    loaderText: {
        fontFamily: fonts.interMedium,
        fontSize: 16,
        color: colors.textLighter,
        marginRight: 10,
    },
    status: {
        flexDirection: "column",
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
