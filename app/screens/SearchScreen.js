import React, { useState } from 'react';
import { View, Text } from 'react-native'

//components
import Screen from './../components/Screen';
import AppTextInput from './../components/common/AppTextInput';
import BottomTab from '../components/common/BottomTab';

//config
import Colors from '../config/Colors';
import { RFPercentage } from 'react-native-responsive-fontsize';

function SearchScreen(props) {

    const [inputField, setInputFeild] = useState([
        {
            id: 0,
            placeHolder: "Search Area",
            value: '',
            secure: false,
            icon: false
        },

    ]);

    const handleChange = (text, id) => {
        const tempFeilds = [...inputField];
        tempFeilds[id].value = text;
        setInputFeild(tempFeilds);
    }
    return (
        <Screen style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: Colors.white }}>
            {/* Field */}
            <View style={{ marginBottom: RFPercentage(15), marginTop: RFPercentage(3), width: '90%', justifyContent: 'center', alignItems: 'center' }}>
                {inputField.map((item, i) =>
                    <View key={i} style={{ marginTop: i == 4 ? RFPercentage(10) : RFPercentage(2), width: "100%" }} >
                        <Text style={{ color: Colors.primaryLight2, marginBottom: RFPercentage(2), fontSize: RFPercentage(3.5) }} >{item.placeHolder}</Text>
                        <AppTextInput
                            placeHolder={item.placeHolder}
                            backgroundColor={Colors.inputFieldBackgroundColor}
                            width="100%"
                            value={item.value}
                            onChange={(text) => handleChange(text, item.id)}
                            secure={item.secure}
                            icon={item.icon}
                        />
                    </View>
                )}
            </View>
            {/* Bottom Tab */}
            <BottomTab onPressHomeIcon={() => props.navigation.navigate("MyPageScreen")} onPressMapIcon={() => props.navigation.navigate("MapScreen")} onPressSearchIcon={() => props.navigation.navigate("SearchScreen")} />
        </Screen>
    );
}

export default SearchScreen;