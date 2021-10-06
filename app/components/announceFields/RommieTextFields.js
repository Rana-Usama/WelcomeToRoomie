import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

// components
import AppTextInput from "../../components/common/AppTextInput"
import AppTextButton from "../../components/common/AppTextButton"
import LoadingModal from "../../components/common/LoadingModal"

// services

// config
import Colors from '../../config/Colors';

function RoomieTextFields(props) {
    const [indicator, showIndicator] = useState(false);

    const [inputField, setInputFeild] = useState([
        {
            id: 0,
            placeHolder: "Name",
            value: '',
            secure: false,
            icon: "account"
        },
        {
            id: 1,
            placeHolder: "Age",
            value: '',
            secure: false,
            icon: "account-clock"
        },
        {
            id: 2,
            placeHolder: "Status",
            value: '',
            secure: false,
            icon: "ring"
        },
        {
            id: 1,
            placeHolder: "Place",
            value: '',
            secure: false,
            icon: "map-marker"
        },
        {
            id: 1,
            placeHolder: "Size",
            value: '',
            secure: false,
            icon: "move-resize-variant"
        },
        {
            id: 1,
            placeHolder: "Prefrences (Place,Sex)",
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


    const handleLogin = () => {
        showIndicator(true);
        let tempfeilds = [...inputField];

        if (tempfeilds[0].value === "" || tempfeilds[1].value === "") {
            alert("Please fill all the feilds !");
            showIndicator(false);
            return true;
        }

        try {
            // API integration will come here
        } catch (error) {
            alert("Login Error");
        }

        showIndicator(false);
    };


    return (
        <View style={styles.container}>

            <LoadingModal show={indicator} />

            {/* Text feilds */}
            {inputField.map((item, i) =>
                <View key={i} style={{ marginTop: i == 0 ? RFPercentage(0) : RFPercentage(3), width: "100%" }} >
                    <Text style={{ marginBottom: RFPercentage(2) }} >{item.placeHolder}</Text>
                    <AppTextInput
                        placeHolder={item.placeHolder}
                        width="100%"
                        value={item.value}
                        onChange={(text) => handleChange(text, item.id)}
                        secure={item.secure}
                        icon={item.icon}
                    />
                </View>
            )}


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "90%",
        justifyContent: "center",
        alignItems: "center"
    }
})

export default RoomieTextFields;