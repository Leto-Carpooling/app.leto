import React, { useState, useContext, useEffect } from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../assets/colors/colors";
import fonts from "../../assets/fonts/fonts";
import * as DocumentPicker from "expo-document-picker";
import { AppContext } from "../../util/AppContext";
import { api } from "../../config/api";
import { Log } from "../../util/Logger";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const FileChooser = ({ label, endPoint, id, setDocCount, docCount }) => {
    const { user } = useContext(AppContext);

    const [status, setStatus] = useState(0);
    const [attachedFile, setAttachedFile] = useState("No file chosen");

    useEffect(() => {
        checkFileSubmitted();
    }, []);

    return (
        <TouchableOpacity style={styles.container} onPress={uploadDocument}>
            <View style={styles.textContainer}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.attachedText} numberOfLines={1}>
                    {attachedFile}
                </Text>
            </View>
            <View style={styles.iconContainer}>{renderStatus()}</View>
        </TouchableOpacity>
    );

    function renderStatus() {
        switch (status) {
            case 0:
                return (
                    <MaterialIcons
                        name="attach-file"
                        color={colors.primary}
                        size={30}
                    />
                );
            case 1:
                return (
                    <ActivityIndicator size="large" color={colors.primary} />
                );
            case 2:
                return (
                    <MaterialIcons
                        name="done-all"
                        color={colors.success}
                        size={30}
                    />
                );
            case 3:
                return (
                    <MaterialIcons
                        name="error"
                        color={colors.danger}
                        size={30}
                    />
                );
        }
    }

    async function checkFileSubmitted() {
        const check = await AsyncStorage.getItem(`@${id}`);
        if (check) {
            setStatus(2);
            setDocCount((docCount) => docCount + 1);
        }
    }

    async function setFileSubmitted() {
        await AsyncStorage.setItem(`@${id}`, id);
    }

    async function uploadDocument() {
        setStatus(1);
        const result = await DocumentPicker.getDocumentAsync({
            type: "image/*",
            copyToCacheDirectory: false,
            multiple: false,
        });
        if (result.type == "success") {
            let { name, size, uri } = result;
            setAttachedFile(name);
            let nameParts = name.split(".");
            let fileType = nameParts[nameParts.length - 1];
            var fileToUpload = {
                name: name,
                size: size,
                uri: uri,
                type: "image/" + fileType,
            };

            const params = new FormData();
            params.append(id, fileToUpload);

            const config = {
                headers: {
                    auth: user.token,
                    "Content-Type": "multipart/form-data; ",
                },
            };

            api.post(endPoint, params, config)
                .then((resp) => {
                    Log("uploadDocument", resp.data);
                    setDocCount((docCount) => docCount + 1);
                    if (resp.data.status === "OK") {
                        setStatus(2);
                        setFileSubmitted(true);
                    } else {
                        setStatus(3);
                    }
                })
                .catch((err) => {
                    Log("uploadDocument", err);
                    setStatus(3);
                });
        } else {
            setStatus(3);
        }
    }
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        elevation: 1,
        borderRadius: 5,
        backgroundColor: colors.white,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    label: {
        fontFamily: fonts.interRegular,
        fontSize: 20,
        color: colors.textDarker,
        width: 150,
    },
    attachedText: {
        fontFamily: fonts.interMedium,
        fontSize: 14,
        color: colors.textLighter,
        marginTop: 8,
        width: 150,
    },
    textContainer: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    iconContainer: {
        padding: 20,
    },
});
