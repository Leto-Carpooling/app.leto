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
import { KeyboardSpacer } from "../components/KeyboardSpacer";
import { IconButton } from "../components/IconButton";
import { api } from "../config/api";
import { validatePassword } from "../util/PasswordValidator";

export default ({ navigation }) => {
    const [scrollEnabled, setScrollEnabled] = useState(false);
    const [toastGroup, setToastGroup] = useState([]);
    const [fieldBorderStyle, setFieldBorderStyle] = useState({});
    const [password, onChangePassword] = useState("");
    const [passwordConfir, onChangePasswordConfir] = useState("");

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
                            {toastGroup.map((toast, index) => {
                                return (
                                    <Toast
                                        key={index}
                                        hidden={false}
                                        type="danger"
                                        text={toast.toastText}
                                        style={{ marginBottom: 10 }}
                                    />
                                );
                            })}
                        </View>

                        <View>
                            <LabelledTextInput
                                label="New password"
                                icon={
                                    <MaterialIcons
                                        name="lock"
                                        size={30}
                                        color={colors.primary}
                                    />
                                }
                                value={password}
                                onChangeText={onChangePassword}
                                placeholder="Choose a password"
                                secureTextEntry={true}
                                style={fieldBorderStyle}
                            />
                            <View style={styles.spacer} />
                            <LabelledTextInput
                                label="Confirm password"
                                icon={
                                    <MaterialIcons
                                        name="lock"
                                        size={30}
                                        color={colors.primary}
                                    />
                                }
                                value={passwordConfir}
                                onChangeText={onChangePasswordConfir}
                                placeholder="Repeat password"
                                secureTextEntry={true}
                                style={fieldBorderStyle}
                                // style={{
                                //     borderWidth: 2,
                                //     borderColor: colors.danger,
                                // }}
                            />
                            <View style={styles.btnContainer}>
                                <Button
                                    text="Create account"
                                    onPress={checkPassword}
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

    function checkPassword() {
        const errors = validatePassword(password, passwordConfir);
        console.log(errors);
        if (errors.length > 0) {
            const toastErrors = [];
            errors.forEach((err) => {
                toastErrors.push({ toastText: err });
            });
            setToastGroup(toastErrors);
            setFieldBorderStyle({
                borderWidth: 2,
                borderColor: colors.danger,
            });
        } else {
            setFieldBorderStyle({});
            setToastGroup([]);
            const params = new URLSearchParams();
            params.append("password", password);
            params.append("email", +Math.random(0, 200) + "tony__@gmail.com");
            const config = {
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded; charset=UTF-8",
                },
            };
            api.post(`signup.php`, params, config)
                .then((resp) => {
                    console.log(resp.data); //OK
                    //navigation.navigate("SuccessSignUp");
                    if (resp.data.status !== "OK") {
                        // setToastVisible(true);
                        // setToastText(resp.data.message);
                    }
                })
                .catch((err) => {
                    console.log("err: " + err);
                    // setToastVisible(true);
                    // setToastText("Something went wrong.");
                });
        }
    }
};

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
