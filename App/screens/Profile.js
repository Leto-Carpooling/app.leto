import React, { useEffect } from "react";
import {
    Text,
    View,
    SafeAreaView,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
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

export default ({ navigation }) => {
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
                <Spacer height={5} />

                <View style={styles.avatarContainer}>
                    <Avatar size={100} />
                    <Text style={styles.avatarText}>
                        Tap to change profile picture
                    </Text>
                </View>

                <Spacer height={10} />
                <View>
                    <LabelledTextInput
                        label="Firstname"
                        placeholder="Firstname"
                        iconName="person"
                    />
                </View>
                <Spacer height={10} />
                <View>
                    <LabelledTextInput
                        label="Lastname"
                        placeholder="Lastname"
                        iconName="person"
                    />
                </View>

                <View style={styles.btnContainer}>
                    <Button
                        onPress={() => alert("todo")}
                        text="Save"
                        disabled={true}
                    />
                </View>

                <Divider />

                <View style={styles.btnContainer}>
                    <Button
                        onPress={() => alert("todo")}
                        text="Reset Password"
                    />
                </View>
            </SafeAreaView>
        );
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
        padding: 20,
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
        fontFamily: fonts.interMedium,
        fontSize: 18,
        flex: 1,
        flexWrap: "wrap",
        color: colors.textLighter,
    },
});
