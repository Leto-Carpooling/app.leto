import React, { useEffect, useState, useContext } from "react";
import {
    Text,
    View,
    SafeAreaView,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import {
    useFonts,
    Poppins_400Regular,
    Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import { Inter_500Medium, Inter_400Regular } from "@expo-google-fonts/inter";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../assets/colors/colors";
import AppLoading from "expo-app-loading";
import { IconButton } from "../components/IconButton";
import fonts from "../assets/fonts/fonts";
import Spacer from "../components/Spacer";
import { Avatar } from "../components/Avatar";
import { Button } from "../components/Button";
import FlexButton from "../components/FlexButton";
import { LabelledTextInput } from "../components/LabelledTextInput";
import Divider from "../components/Divider";
import * as DocumentPicker from "expo-document-picker";
import { KeyboardSpacer } from "../components/KeyboardSpacer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../config/api";
import { AppContext } from "../util/AppContext";
import { Log } from "../util/Logger";

export default ({ navigation }) => {
    const [scrollEnabled, setScrollEnabled] = useState(false);
    const { user } = useContext(AppContext);
    const [firstName, onChangeFirstName] = useState(user.firstname);
    const [lastName, onChangeLastName] = useState(user.lastname);
    const [avatarLoading, setAvatarLoading] = useState(false);
    const [avatarImg, setAvatarImg] = useState(user.profileImage);

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
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
                        <Text style={styles.title}>Profile</Text>

                        <TouchableOpacity
                            style={styles.avatarContainer}
                            onPress={uploadImage}
                        >
                            <Avatar
                                size={100}
                                src={avatarImg}
                                loading={avatarLoading}
                            />
                            <Text style={styles.avatarText}>
                                Tap to change profile picture
                            </Text>
                        </TouchableOpacity>

                        <Spacer height={10} />
                        <View>
                            <LabelledTextInput
                                label="Firstname"
                                placeholder="Firstname"
                                iconName="person"
                                value={firstName}
                                onChangeText={onChangeFirstName}
                            />
                        </View>
                        <Spacer height={10} />
                        <View>
                            <LabelledTextInput
                                label="Lastname"
                                placeholder="Lastname"
                                iconName="person"
                                value={lastName}
                                onChangeText={onChangeLastName}
                            />
                        </View>

                        <View style={styles.btnContainer}>
                            <Button
                                onPress={() => alert("todo")}
                                text="Save"
                                disabled={false}
                            />
                        </View>

                        <Divider />

                        <View style={styles.btnContainer}>
                            <Button
                                onPress={() =>
                                    navigation.navigate("ResetPassword2")
                                }
                                text="Reset Password"
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

    async function uploadImage() {
        const result = await DocumentPicker.getDocumentAsync({
            type: "image/*",
            copyToCacheDirectory: false,
            multiple: false,
        });
        if (result.type == "success") {
            setAvatarLoading(true);
            let { name, size, uri } = result;
            let nameParts = name.split(".");
            let fileType = nameParts[nameParts.length - 1];
            var fileToUpload = {
                name: name,
                size: size,
                uri: uri,
                type: "image/" + fileType,
            };

            const params = new FormData();
            params.append("first-name", "");
            params.append("last-name", "");
            params.append("email", "");
            params.append("phone", "");
            params.append("profile-image", fileToUpload);
            try {
                const config = {
                    headers: {
                        auth: user.token,
                        "Content-Type": "multipart/form-data; ",
                    },
                };
                api.post(`editProfile.php`, params, config)
                    .then((resp) => {
                        Log("uploadImage", resp.data);
                        if (resp.data.status !== "OK") {
                            // setToastVisible(true);
                            // setToastText(resp.data.message);
                            // setBtnLoading(false);
                            setAvatarLoading(false);
                        } else {
                            //setBtnLoading(false);
                            //navigation.navigate("VerifyEmail");
                            setAvatarLoading(false);
                            const user = JSON.parse(resp.data.message);
                            setAvatarImg(user.profileImage);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        setAvatarLoading(false);
                        // setBtnLoading(false);
                        // setToastVisible(true);
                        // setToastText("Something went wrong.");
                    });
            } catch (error) {
                console.log(error);
                setAvatarLoading(false);
            }
        }
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    backIcon: {},
    avatarContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        padding: 10,
    },
    title: {
        fontFamily: fonts.poppinsRegular,
        fontSize: 40,
        color: colors.textLighter,
        paddingHorizontal: 20,
        paddingVertical: 10,
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
        justifyContent: "space-between",
        marginTop: 40,
        marginHorizontal: 30,
        marginBottom: 10,
        flexDirection: "row",
    },
    avatarText: {
        fontFamily: fonts.interRegular,
        fontSize: 16,
        flex: 1,
        flexWrap: "wrap",
        marginLeft: 10,
        color: colors.textLighter,
    },
});
