import React from "react";
import {
    View,
    Text,
    StatusBar,
    SafeAreaView,
    StyleSheet,
    ImageBackground,
} from "react-native";
import colors from "../assets/colors/colors";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import { Inter_500Medium, Inter_400Regular } from "@expo-google-fonts/inter";
import AppLoading from "expo-app-loading";
import { Button } from "../components/Button";

export default () => {
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Inter_500Medium,
        Inter_400Regular,
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <SafeAreaView>
                <StatusBar backgroundColor={colors.primary} />
                <ImageBackground
                    source={require("./../assets/img/onboarding.png")}
                    style={styles.container}
                >
                    <View style={{ margin: 20 }}>
                        <Text style={styles.logoText}>Leto.</Text>
                        <Text style={styles.tagline}>
                            Cheaper greener rides.
                        </Text>
                        <Text style={styles.toutText}>
                            Easily hail carpooled rides, share the cost, reduce
                            traffic and save the planet.
                        </Text>
                        <View style={styles.btn}>
                            <Button
                                onPress={() => alert("todo")}
                                text="Sign up"
                            />
                        </View>
                        <View style={styles.btn}>
                            <Button
                                onPress={() => alert("todo")}
                                text="Login"
                            />
                        </View>
                        <Text style={styles.creditText}>
                            Photo by Tomsadventures on Unsplash
                        </Text>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        justifyContent: "flex-end",
        flexDirection: "column",
    },
    logoText: {
        color: colors.white,
        fontFamily: "Poppins_400Regular",
        fontSize: 80,
    },
    tagline: {
        color: colors.white,
        fontFamily: "Inter_500Medium",
        fontSize: 20,
        marginBottom: 15,
        marginLeft: 10,
    },
    toutText: {
        color: colors.white,
        fontFamily: "Inter_400Regular",
        marginLeft: 10,
        fontSize: 15,
        marginBottom: 20,
    },
    btn: {
        marginVertical: 10,
    },
    creditText: {
        color: colors.white,
        marginTop: 20,
        fontFamily: "Inter_400Regular",
        fontSize: 12,
    },
});
