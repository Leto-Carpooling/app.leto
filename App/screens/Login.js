import React, { useState } from "react";
import { Text, View, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import { Inter_500Medium, Inter_400Regular } from "@expo-google-fonts/inter";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../assets/colors/colors";
import AppLoading from "expo-app-loading";
import { Toast } from "../components/Toast";
import { Button } from "../components/Button";
import { LabelledTextInput } from "../components/LabelledTextInput";
import { IconButton } from "../components/IconButton";
import { KeyboardSpacer } from "../components/KeyboardSpacer";
import { LabelledAutoTextField } from "../components/LabelledAutoTextField";
import { Log } from "../util/Logger";
import { api } from "../config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default ({ navigation }) => {
    const [scrollEnabled, setScrollEnabled] = useState(false);
    const [username, onChangeText] = useState("tony@gmail.com");
    const [password, onChangePassword] = useState("mogoaOmbaso2001");
    const [toastVisible, setToastVisible] = useState(false);
    const [toastText, setToastText] = useState("");
    const [btnLoading, setBtnLoading] = useState(false);

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
                        <Text style={styles.title}>Login</Text>

                        <View style={[styles.center, { marginVertical: 20 }]}>
                            <Toast
                                hidden={!toastVisible}
                                type="danger"
                                text={toastText}
                            />
                        </View>

                        <View>
                            <LabelledAutoTextField
                                label="Email or phone"
                                placeholder="Email or phone"
                                contentType="emailAddress"
                                value={username}
                                onChangeText={onChangeText}
                            />
                            <View style={styles.spacer} />
                            <LabelledTextInput
                                label="Password"
                                iconName="lock"
                                placeholder="Enter your password"
                                secureTextEntry={true}
                                theme="neutral"
                                value={password}
                                onChangeText={onChangePassword}
                            />
                            <View style={styles.btnContainer}>
                                <Button
                                    text="Login"
                                    onPress={login}
                                    loading={btnLoading}
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

    function login() {
        const config = {
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded; charset=UTF-8",
            },
        };
        const params = new URLSearchParams();
        params.append("email", username);
        params.append("password", password);

        setBtnLoading(true);

        api.post(`login.php`, params, config)
            .then((resp) => {
                Log("login:113", resp.data);
                if (resp.data.status !== "OK") {
                    setToastVisible(true);
                    setToastText(resp.data.message);
                    setBtnLoading(false);
                } else {
                    storeAuthToken(
                        resp.data.message,
                        navigation,
                        setBtnLoading
                    );
                }
            })
            .catch((err) => {
                Log("login:122", err);
                setBtnLoading(false);
                setToastVisible(true);
                setToastText("Something went wrong");
            });
    }
};

//store auth token
const storeAuthToken = async (token, navigation, setBtnLoading) => {
    try {
        await AsyncStorage.setItem("@token", token);
        setBtnLoading(false);
        toHome(navigation);
    } catch (e) {
        console.log(e);
    }
};

function toHome(navigation) {
    navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
    });
}

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
    spacer: {
        marginVertical: 10,
    },
});
