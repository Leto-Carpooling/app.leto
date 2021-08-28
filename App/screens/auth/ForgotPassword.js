import React, { useState } from "react";
import { Text, View, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import { Inter_500Medium, Inter_400Regular } from "@expo-google-fonts/inter";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../assets/colors/colors";
import fonts from "../../assets/fonts/fonts";
import AppLoading from "expo-app-loading";
import { IconButton } from "../../components/btn/IconButton";
import { LabelledTextInput } from "../../components/input/LabelledTextInput";
import Spacer from "../../components/aux/Spacer";
import { Button } from "../../components/btn/Button";
import { validate } from "validate.js";
import { constraintsEmail } from "../../util/constraints";
import { Toast } from "../../components/display/Toast";
import { api } from "../../util/api";
import { KeyboardSpacer } from "../../components/aux/KeyboardSpacer";

export default ({ navigation }) => {
    const [email, onChangeEmail] = useState("");
    const [toastVisible, setToastVisible] = useState(false);
    const [toastText, setToastText] = useState("");
    const [btnLoading, setBtnLoading] = useState(false);
    const [scrollEnabled, setScrollEnabled] = useState(false);

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
                                        size={30}
                                        color={colors.iconDark}
                                    />
                                }
                                onPress={() => navigation.goBack()}
                            />
                        </View>
                        <Text style={styles.title}>Forgot Password</Text>
                        <Spacer height={10} />

                        <View style={styles.center}>
                            <Toast
                                hidden={!toastVisible}
                                type="danger"
                                text={toastText}
                            />
                        </View>
                        <Spacer height={10} />
                        <View>
                            <LabelledTextInput
                                label="Enter your email"
                                placeholder="Email address"
                                iconName="email"
                                value={email}
                                onChangeText={onChangeEmail}
                            />
                        </View>
                        <View style={styles.btnContainer}>
                            <Button
                                onPress={sendResetReq}
                                text="Request password reset"
                                loading={btnLoading}
                            />
                        </View>
                        <KeyboardSpacer
                            onToggle={(visible) => setScrollEnabled(visible)}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
    function sendResetReq() {
        setBtnLoading(true);
        const validationResult = validate(
            { emailAddress: email },
            constraintsEmail
        );

        if (validationResult) {
            setToastVisible(true);
            setToastText(validationResult["emailAddress"]);
        }

        const config = {
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded; charset=UTF-8",
            },
        };
        const params = new URLSearchParams();
        params.append("email", email);
        params.append("action", "sc");

        setBtnLoading(true);

        api.post(`user/forgotPassword.php`, params, config)
            .then((resp) => {
                if (resp.data.status !== "OK") {
                    setToastVisible(true);
                    setToastText(resp.data.message);
                    setBtnLoading(false);
                    console.log(resp.data);
                } else {
                    console.log(resp.data);
                    navigation.navigate("ResetPassword", {
                        msg: resp.data.message,
                    });
                }
            })
            .catch((err) => {
                Log("login:124", err);
                setBtnLoading(false);
                setToastVisible(true);
                setToastText("Something went wrong");
            });
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    backIcon: {},
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

    topBar: {
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: 40,
        marginHorizontal: 30,
        marginBottom: 30,
        flexDirection: "row",
    },
});
