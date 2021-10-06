import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize';
import * as ImagePicker from 'expo-image-picker';

//components
import Screen from './../components/Screen';
import AppTextInput from './../components/common/AppTextInput';
import BottomTab from '../components/common/BottomTab';

//config
import Colors from './../config/Colors';


function MyPageScreen(props) {
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const [inputField, setInputFeild] = useState([
        {
            id: 0,
            placeHolder: "Name",
            value: '',
            secure: false,
            icon: false
        },
        {
            id: 1,
            placeHolder: "Age",
            value: '',
            secure: false,
            icon: false
        },
        {
            id: 2,
            placeHolder: "Status",
            value: '',
            secure: false,
            icon: false
        },
        {
            id: 3,
            placeHolder: "Sex",
            value: '',
            secure: false,
            icon: false
        },
        {
            id: 4,
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

    return (
        <Screen style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: Colors.white }}>
            {/* Top Heading */}
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: Colors.primary, fontSize: RFPercentage(4.2), marginTop: RFPercentage(5) }}>
                    My Page
                </Text>
            </View>
            {/* Adding Vedio */}
            <TouchableOpacity onPress={pickImage} style={{ marginTop: RFPercentage(5), width: '70%', backgroundColor: Colors.lightGrey, height: RFPercentage(25), alignItems: 'center', justifyContent: 'center' }}>
                {image && <Image source={{ uri: image }} style={{ width: '100%', height: '100%' }} />
                    ||
                    <Text style={{ color: Colors.grey, fontSize: RFPercentage(2.5) }}>
                        Add Vedio
                    </Text>
                }

            </TouchableOpacity>

            {/* input Fields */}
            <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: Colors.white, flex: 1, width: '100%', marginTop: RFPercentage(1) }} >
                <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <View style={{ marginBottom: RFPercentage(15), marginTop: RFPercentage(3), width: '90%', justifyContent: 'center', alignItems: 'center' }}>
                        {inputField.map((item, i) =>
                            <View key={i} style={{ marginTop: i == 4 ? RFPercentage(10) : RFPercentage(2), width: "100%" }} >
                                <Text style={{ color: Colors.primaryLight2, marginBottom: RFPercentage(2), fontSize: RFPercentage(2.3) }} >{item.placeHolder}</Text>
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
                </View>
            </ScrollView>
            {/* Bottom Tab */}
            <BottomTab onPressMapIcon={() => props.navigation.navigate("MapScreen")} onPressSearchIcon={() => props.navigation.navigate("SearchScreen")} />

        </Screen>
    );
}



export default MyPageScreen;