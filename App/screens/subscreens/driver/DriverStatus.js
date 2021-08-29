import React, { useState, useEffect, useContext } from "react";
import { Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import SwitchButton from "../../../components/btn/SwitchButton";
import FontStyles from "../../../assets/fonts/FontStyles";
import Spacer from "../../../components/auxx/Spacer";
import LogoTagline from "../../../components/display/LogoTagline";
import { AppContext } from "../../../util/AppContext";
import { api } from "../../../util/api";
import { Log } from "../../../util/Logger";

const DriverStatus = () => {
    const [on, setOn] = useState(false);
    const { user } = useContext(AppContext);

    //Mark driver as online or offline
    useEffect(() => {
        const params = new FormData();
        params.append("online", on ? 1 : 0);

        const config = {
            headers: {
                auth: user.token,
            },
        };

        api.post(`driver/setOnlineStatus.php`, params, config)
            .then((resp) => {
                Log("mark driver on/off-line", resp.data);

                if (resp.data.status === "OK") {
                } else {
                    setOn(false);
                }
            })
            .catch((err) => {
                Log("mark driver on/off-line", err);
                setOn(false);
            });
    }, [on]);
    return (
        <View style={tw`flex-1 bg-white`}>
            <View style={tw`p-4`}>
                <LogoTagline />
            </View>
            <View style={tw`bg-gray-100 flex-1 p-4`}>
                <SwitchButton on={on} setOn={setOn} />
                <Spacer height={10} />
                {renderStatusTxt()}
            </View>
        </View>
    );

    function renderStatusTxt() {
        return on ? (
            <View style={tw`flex-col`}>
                <Text style={[tw`text-gray-600 text-3xl`, FontStyles.fp]}>
                    Online
                </Text>
                <Text style={[tw`text-gray-500 mt-1`, FontStyles.fi]}>
                    Waiting for ride requests..
                </Text>
            </View>
        ) : (
            <View style={tw`flex-col`}>
                <Text style={[tw`text-gray-600 text-3xl`, FontStyles.fp]}>
                    Offline
                </Text>
                <Text style={[tw`text-gray-500 mt-1`, FontStyles.fi]}>
                    You are not accepting rides.
                </Text>
            </View>
        );
    }
};

export default DriverStatus;
