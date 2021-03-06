import React, { useState } from "react";
import { Text, View, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import { Inter_500Medium, Inter_400Regular } from "@expo-google-fonts/inter";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../assets/colors/colors";
import AppLoading from "expo-app-loading";
import { Toast } from "../../components/display/Toast";
import { Button } from "../../components/btn/Button";
import { KeyboardSpacer } from "../../components/auxx/KeyboardSpacer";
import { IconButton } from "../../components/btn/IconButton";
import { LabelledAutoTextField } from "../../components/input/LabelledAutoTextField";
import { api } from "../../util/api";
import { validate } from "validate.js";
import { constraintsEmail } from "../../util/constraints";

export default ({ navigation }) => {
    const [scrollEnabled, setScrollEnabled] = useState(false);
    const [toastVisible, setToastVisible] = useState(false);
    const [toastText, setToastText] = useState("");
    const [username, onChangeText] = useState("tony.mogoa@strathmore.edu");
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
                        <Text style={styles.title}>Sign up</Text>

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
                                value={username}
                                onChangeText={onChangeText}
                            />
                            <View style={styles.spacer} />

                            <View style={styles.btnContainer}>
                                <Button
                                    text="Next"
                                    onPress={() => checkEmail()}
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

    function checkEmail() {
        const validationResult = validate(
            { emailAddress: username },
            constraintsEmail
        );

        if (validationResult) {
            setToastVisible(true);
            setToastText(validationResult["emailAddress"]);
        } else {
            setBtnLoading(true);
            const params = new URLSearchParams();
            params.append("email", username);
            params.append("action", "e");
            const config = {
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded; charset=UTF-8",
                },
            };
            api.post(`user/signup.php`, params, config)
                .then((resp) => {
                    console.log(resp.data); //OK
                    if (resp.data.status !== "OK") {
                        setToastVisible(true);
                        setToastText(resp.data.message);
                        setBtnLoading(false);
                    } else {
                        setBtnLoading(false);
                        navigation.navigate("SetPassword", { email: username });
                    }
                })
                .catch((err) => {
                    console.log(err.response);
                    setBtnLoading(false);
                    setToastVisible(true);
                    setToastText("Something went wrong.");
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
});
