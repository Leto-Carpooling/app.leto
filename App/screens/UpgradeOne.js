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
                        <UpgradeProgressIndicator level={1} />
                        <Text style={styles.title}>Upgrade to driver</Text>
                        <Text style={styles.subtitle}>Your details</Text>

                        <Spacer height={20} />

                        {/* {user.profileImage === "./../assets/img/profile.svg" ? (
                            <TouchableOpacity
                                style={styles.avatarContainer}
                                onPress={uploadImage}
                            >
                                <Avatar size={100} src={user.profileImage} />
                                <Text style={styles.avatarText}>
                                    Tap to change profile picture
                                </Text>
                            </TouchableOpacity>
                        ) : null} */}
                        <View style={styles.avatarContainer}>
                            <Avatar size={100} />
                            <Text style={styles.avatarText}>
                                Tap to add profile picture
                            </Text>
                        </View>

                        <Spacer height={10} />

                        <View>
                            <LabelledTextInput
                                label="National ID"
                                placeholder="23535446"
                                iconName="person"
                                keyboardType="number-pad"
                            />
                        </View>

                        <Spacer height={10} />

                        <View>
                            <LabelledTextInput
                                label="Driver's license number"
                                placeholder="AS3535446"
                                iconName="person"
                                keyboardType="numeric"
                            />
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
