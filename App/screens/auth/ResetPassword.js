import React, { useState } from "react";
import { Text, View, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import { Inter_500Medium, Inter_400Regular } from "@expo-google-fonts/inter";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../assets/colors/colors";
import AppLoading from "expo-app-loading";
import { Toast } from "../../components/display/Toast";
import { Button } from "../../components/btn/Button";
import { LabelledTextInput } from "../../components/input/LabelledTextInput";
import { KeyboardSpacer } from "../../components/auxx/KeyboardSpacer";
import { IconButton } from "../../components/btn/IconButton";
import { api } from "../../util/api";
import { validatePassword } from "../../util/PasswordValidator";
import { Log } from "../../util/Logger";
import fonts from "../../assets/fonts/fonts";

export default ({ route, navigation }) => {
    const [scrollEnabled, setScrollEnabled] = useState(false);
    const [toastGroup, setToastGroup] = useState([]);
    const [textFieldTheme, settextFieldTheme] = useState("neutral");
    const [password, onChangePassword] = useState("mogoaOmbaso2021");
    const [code, onChangeCode] = useState("");
    const [passwordConfir, onChangePasswordConfir] =
        useState("mogoaOmbaso2021");
    const [btnLoading, setBtnLoading] = useState(false);

    const { msg } = route.params;

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
                        <Text style={styles.title}>Reset Password</Text>
                        <View style={styles.subtitleContainer}>
                            <Text style={styles.subtitle} numberOfLines={3}>
                                {msg}
                            </Text>
                        </View>

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
                                label="Enter the code"
                                placeholder="Enter the code"
                                iconName="vpn-key"
                                value={code}
                                onChangeText={onChangeCode}
                            />
                            <View style={styles.spacer} />
                            <LabelledTextInput
                                label="New password"
                                iconName="lock"
                                value={password}
                                onChangeText={onChangePassword}
                                placeholder="Choose a password"
                                secureTextEntry={true}
                                theme={textFieldTheme}
                            />
                            <View style={styles.spacer} />
                            <LabelledTextInput
                                label="Confirm password"
                                iconName="lock"
                                value={passwordConfir}
                                onChangeText={onChangePasswordConfir}
                                placeholder="Repeat password"
                                secureTextEntry={true}
                                theme={textFieldTheme}
                            />
                            <View style={styles.btnContainer}>
                                <Button
                                    text="Reset Password"
                                    onPress={checkPassword}
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

    function checkPassword() {
        const errors = validatePassword(password, passwordConfir);
        console.log(errors);
        if (errors.length > 0) {
            const toastErrors = [];
            errors.forEach((err) => {
                toastErrors.push({ toastText: err });
            });
            setToastGroup(toastErrors);
            settextFieldTheme("danger");
        } else {
            setBtnLoading(true);
            settextFieldTheme("success");
            setToastGroup([]);
            const params = new URLSearchParams();
            params.append("action", "cp");
            params.append("code", code);
            params.append("new-password", password);
            const config = {
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded; charset=UTF-8",
                },
            };
            api.post(`user/forgotPassword.php`, params, config)
                .then((resp) => {
                    Log("checkPassword:147", resp.data);
                    if (resp.data.status !== "OK") {
                        setToastGroup([{ toastText: resp.data.message }]);
                        setBtnLoading(false);
                    } else {
                        navigation.navigate("SuccessResetPassword");
                    }
                })
                .catch((err) => {
                    Log("checkPassword:160", err);
                    setToastGroup([{ toastText: "Something went wrong." }]);
                    setBtnLoading(false);
                });
        }
    }
};

function toSuccessSignUp(navigation) {
    navigation.reset({
        index: 0,
        routes: [{ name: "SuccessSignUp" }],
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
        fontFamily: fonts.poppinsRegular,
        fontSize: 40,
        color: colors.textLighter,
        paddingHorizontal: 20,
        marginTop: 10,
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
    subtitle: {
        fontFamily: fonts.interRegular,
        fontSize: 16,
        color: colors.textLighter,
        flex: 1,
        flexWrap: "wrap",
    },
    subtitleContainer: {
        paddingHorizontal: 15,
        marginBottom: 10,
    },
});
