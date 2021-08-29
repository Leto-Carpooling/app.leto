import React, { useEffect, useState, useContext } from "react";
import { Text, View, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import { Inter_500Medium, Inter_400Regular } from "@expo-google-fonts/inter";
import { MaterialIcons } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import ColorPicker from "react-native-wheel-color-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

import colors from "../../assets/colors/colors";
import fonts from "../../assets/fonts/fonts";

import { IconButton } from "../../components/btn/IconButton";
import { Button } from "../../components/btn/Button";
import UpgradeProgressIndicator from "../../components/display/UpgradeProgressIndicator";
import { LabelledTextInput } from "../../components/input/LabelledTextInput";
import Spacer from "../../components/auxx/Spacer";

import { Log } from "../../util/Logger";
import { AppContext } from "../../util/AppContext";
import { api } from "../../util/api";

export default ({ navigation }) => {
    const [currentColor, setCurrentColor] = useState("#000000");
    const [manufacturer, setManufacturer] = useState("Subaru");
    const [model, setModel] = useState("Impreza");
    const [capacity, setCapacity] = useState("3");
    const [licensePlate, setLicensePlate] = useState("KDT 346R");

    const [btnLoading, setBtnLoading] = useState(false);

    const { user } = useContext(AppContext);

    useEffect(() => {
        getUpgradeStage();
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
                        <UpgradeProgressIndicator level={2} />
                        <Text style={styles.title}>Upgrade to driver</Text>
                        <Text style={styles.subtitle}>Vehicle details</Text>

                        <Spacer height={20} />

                        <View>
                            <LabelledTextInput
                                label="Manufacturer"
                                placeholder="Subaru"
                                iconName="time-to-leave"
                                value={manufacturer}
                                onChangeText={setManufacturer}
                            />
                        </View>

                        <Spacer height={15} />

                        <View>
                            <LabelledTextInput
                                label="Model"
                                placeholder="Impreza"
                                iconName="time-to-leave"
                                value={model}
                                onChangeText={setModel}
                            />
                        </View>

                        <Spacer height={15} />

                        <View>
                            <LabelledTextInput
                                label="License plate number"
                                placeholder="KBT 345Y"
                                iconName="time-to-leave"
                                value={licensePlate}
                                onChangeText={setLicensePlate}
                            />
                        </View>

                        <Spacer height={15} />

                        <View>
                            <LabelledTextInput
                                label="Capacity(passangers)"
                                iconName="people"
                                placeholder="3"
                                keyboardType="number-pad"
                                value={capacity}
                                onChangeText={setCapacity}
                            />
                        </View>

                        <Spacer height={15} />

                        <View style={styles.colorPicker}>
                            <Text style={styles.label}>Choose car color</Text>
                            <ColorPicker
                                color={currentColor}
                                swatchesOnly={true}
                                onColorChange={setCurrentColor}
                                thumbSize={40}
                                sliderSize={40}
                                noSnap={true}
                                row={false}
                                swatchesLast={false}
                                swatches={true}
                                discrete={false}
                            />

                            <View style={styles.carContainer}>
                                <MaterialIcons
                                    name="time-to-leave"
                                    color={currentColor}
                                    size={70}
                                />
                            </View>
                        </View>

                        <View style={styles.btnContainer}>
                            <Button
                                onPress={sendDetails}
                                text="Next"
                                loading={btnLoading}
                            />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

    async function getUpgradeStage() {
        const stage = await AsyncStorage.getItem("@upgrade");
        if (stage != null) {
            Log("getUpgradeStage", stage);
            navigation.navigate(`${stage}`);
        }
    }

    async function setUpgradeStage() {
        await AsyncStorage.setItem("@upgrade", "UpgradeThree", () => {
            navigation.navigate("UpgradeThree");
        });
    }

    function sendDetails() {
        setBtnLoading(true);
        const params = new FormData();
        params.append("manufacturer", manufacturer);
        params.append("capacity", capacity);
        params.append("model", model);
        params.append("color", currentColor);
        params.append("license-num", licensePlate);
        params.append("action", "vehicle");

        const config = {
            headers: {
                auth: user.token,
            },
        };

        api.post(`driver/updateDriver.php`, params, config)
            .then((resp) => {
                Log("sendDetails2", resp.data);
                setBtnLoading(false);
                if (resp.data.status === "OK") {
                    setUpgradeStage();
                } else {
                    Alert.alert("Error", resp.data.message);
                }
            })
            .catch((err) => {
                Log("sendDetails2", err);
                setBtnLoading(false);
            });
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
        padding: 10,
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
    colorPicker: {
        paddingHorizontal: 20,
        flexDirection: "column",
    },
    label: {
        color: colors.textLighter,
        fontFamily: fonts.interMedium,
        fontSize: 15,
        marginBottom: 8,
    },
    carContainer: {
        padding: 15,
        justifyContent: "center",
        alignItems: "center",
    },
});
