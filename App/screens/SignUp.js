import React, { useState } from "react";
import { Text, View, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import { Inter_500Medium, Inter_400Regular } from "@expo-google-fonts/inter";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../assets/colors/colors";
import AppLoading from "expo-app-loading";
import { Toast } from "../components/Toast";
import { TextField } from "../components/TextField";
import { Button } from "../components/Button";
import { KeyboardSpacer } from "../components/KeyboardSpacer";
import { IconButton } from "../components/IconButton";
import { LabelledTextInput } from "../components/LabelledTextInput";

export default ({ navigation }) => {
    const [scrollEnabled, setScrollEnabled] = useState(false);
    const [username, onChangeText] = useState("");

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
                        <View style={styles.backIcon}>
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
                        </View>
                        <Text style={styles.logoText}>Leto.</Text>
                        <Text style={styles.tagline}>
                            Cheaper greener rides.
                        </Text>
                        <Text style={styles.title}>Sign up</Text>

                        <View style={[styles.center, { marginVertical: 20 }]}>
                            <Toast
                                hidden={false}
                                type="danger"
                                text="Passwords do not match"
                            />
                        </View>

                        <View>
                            <LabelledTextInput
                                label="Email or phone"
                                icon={
                                    <MaterialIcons
                                        name="mail"
                                        size={30}
                                        color={colors.primary}
                                    />
                                }
                                placeholder="Email or phone"
                                text={username}
                                onChangeText={onChangeText}
                                auto={true}
                            />
                            <View style={styles.spacer} />

                            <View style={styles.btnContainer}>
                                <Button
                                    text="Next"
                                    onPress={() =>
                                        navigation.navigate("SetPassword")
                                    }
                                />
                            </View>
                        </View>
                        <KeyboardSpacer
                            onToggle={(visible) => setScrollEnabled(visible)}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
};

function checkEmail() {}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    backIcon: {
        marginTop: 40,
        marginLeft: 30,
        marginBottom: 30,
    },
    logoText: {
        color: colors.textDarker,
        fontFamily: "Poppins_400Regular",
        fontSize: 60,
        marginLeft: 30,
    },
    tagline: {
        color: colors.textLighter,
        fontFamily: "Inter_500Medium",
        fontSize: 20,
        marginBottom: 15,
        marginLeft: 40,
    },
    title: {
        fontFamily: "Inter_400Regular",
        fontSize: 22,
        color: colors.textLighter,
        marginLeft: 20,
        marginTop: 20,
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
        marginTop: 10,
    },
});
