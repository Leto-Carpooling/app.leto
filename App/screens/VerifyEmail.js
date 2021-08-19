import React, { useState, useContext } from "react";
import { Text, View, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import { Inter_500Medium, Inter_400Regular } from "@expo-google-fonts/inter";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../assets/colors/colors";
import AppLoading from "expo-app-loading";
import { IconButton } from "../components/IconButton";
import { LabelledTextInput } from "../components/LabelledTextInput";
import { Button } from "../components/Button";
import { api } from "../config/api";
import { Toast } from "../components/Toast";
import { KeyboardSpacer } from "../components/KeyboardSpacer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "../util/AppContext";

export default ({ route, navigation }) => {
    const [code, onChangeCode] = useState("");
    const [scrollEnabled, setScrollEnabled] = useState(false);
    const [toastVisible, setToastVisible] = useState(false);
    const [toastText, setToastText] = useState("");
    const [btnLoading, setBtnLoading] = useState(false);

    const { token, firstName, lastName, email } = route.params;
    const { setUser } = useContext(AppContext);

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
                        <Text style={styles.logoText}>Leto.</Text>
                        <Text style={styles.tagline}>
                            Cheaper greener rides.
                        </Text>

                        <Text style={styles.title}>Sign up</Text>
                        <View style={[styles.center, { marginVertical: 10 }]}>
                            <Toast
                                hidden={!toastVisible}
                                type="danger"
                                text={toastText}
                            />
                        </View>
                        <View style={styles.spacer} />
                        <LabelledTextInput
                            label="Enter the 6-digit verification code sent to your email"
                            placeholder="6-digit code"
                            iconName="vpn-key"
                            value={code}
                            onChangeText={onChangeCode}
                        />
                        <View style={styles.btnContainer}>
                            <Button
                                text="Submit"
                                onPress={() => submit(token)}
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

    function submit(token) {
        setBtnLoading(true);
        const params = new FormData();
        params.append("code", code);

        const config = {
            headers: {
                auth: token,
            },
        };

        api.post(`user/confirmEmail.php`, params, config)
            .then((resp) => {
                console.log(resp.data); //OK
                if (resp.data.status !== "OK") {
                    setToastVisible(true);
                    setToastText(resp.data.message);
                    setBtnLoading(false);
                } else {
                    setBtnLoading(false);
                    const user = {
                        token: token,
                        firstname: firstName,
                        lastname: lastName,
                        profileImage: "./../assets/img/profile.svg",
                        email: email,
                    };
                    setUser(user);
                    toSuccessSignUp(navigation, user);
                }
            })
            .catch((err) => {
                console.log(err);
                setBtnLoading(false);
                setToastVisible(true);
                setToastText("Something went wrong.");
            });
    }
};
async function toSuccessSignUp(navigation, user) {
    await AsyncStorage.setItem("@user", JSON.stringify(user));
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
    topBar: {
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: 40,
        marginHorizontal: 30,
        marginBottom: 30,
        flexDirection: "row",
    },
    spacer: {
        marginVertical: 10,
    },
});
