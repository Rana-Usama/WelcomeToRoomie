import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, ScrollView, Dimensions, Image } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import * as ImagePicker from 'expo-image-picker';


// components
import RoomieTextFields from '../components/announceFields/RommieTextFields';
import RoomTextFields from '../components/announceFields/RoomTextFields';
import BottomTab from '../components/common/BottomTab';
import Screen from './../components/Screen';

// config
import Colors from '../config/Colors';

const { width } = Dimensions.get("window");

function AnnounceScreen(props) {

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
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const [initialComponent, setinitialComponent] = useState(0);
    const [active, setActive] = useState(0);
    const [xTabOne, setXTabOne] = useState(0);
    const [xTabTwo, setXTabTwo] = useState(0);
    const [translateX, setTranslateX] = useState(new Animated.Value(0));
    const [translateXTabOne, setTranslateXTabOne] = useState(new Animated.Value(0));
    const [translateXTabTwo, setTranslateXTabTwo] = useState(new Animated.Value(width));
    const [translateY, setTranslateY] = useState(-1000);

    const handleSlide = type => {
        setinitialComponent(initialComponent + 1)
        Animated.spring(translateX, {
            toValue: type,
            duration: 100,
            useNativeDriver: true
        }).start();
        if (active === 0) {
            Animated.parallel([
                Animated.spring(translateXTabOne, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: true
                }).start(),
                Animated.spring(translateXTabTwo, {
                    toValue: width,
                    duration: 100,
                    useNativeDriver: true
                }).start()
            ]);
        } else {
            Animated.parallel([
                Animated.spring(translateXTabOne, {
                    toValue: -width,
                    duration: 100,
                    useNativeDriver: true
                }).start(),
                Animated.spring(translateXTabTwo, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: true
                }).start()
            ]);
        }
    };

    return (
        <Screen style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: Colors.white }}>
            {/* Top Heading */}
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: Colors.primary, fontSize: RFPercentage(4.2), marginTop: RFPercentage(5) }}>
                    Annouce
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

            {/* Bottom Contaienr */}
            <View style={{ borderTopRightRadius: RFPercentage(4), borderTopLeftRadius: RFPercentage(4), backgroundColor: Colors.white, width: "100%", flex: 2, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
                {/* Tabs */}
                <View style={{ borderRadius: RFPercentage(10), padding: 3, backgroundColor: Colors.primaryLight2, width: "70%", flexDirection: "row", height: RFPercentage(6.8), marginTop: RFPercentage(6), justifyContent: "center", alignItems: "center" }}>
                    <Animated.View style={{ justifyContent: "center", alignItems: "center", position: "absolute", width: "50%", height: "90%", top: 5, left: active === 0 ? 5 : -5, bottom: 5, backgroundColor: Colors.primary, borderRadius: RFPercentage(10), transform: [{ translateX }] }} />
                    <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center", borderRadius: RFPercentage(10) }}
                        onLayout={event => setXTabOne(event.nativeEvent.layout.x)} onPress={() => { setActive(0); handleSlide(xTabOne) }}
                    >
                        <Text style={{ fontSize: RFPercentage(2.2), color: Colors.white }}>
                            Roomie
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center", borderRadius: RFPercentage(10) }}
                        onLayout={event => { setXTabTwo(event.nativeEvent.layout.x) }} onPress={() => { setActive(1); handleSlide(xTabTwo) }}
                    >
                        <Text style={{ fontSize: RFPercentage(2.2), color: Colors.white }}>
                            Room
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: "100%", justifyContent: 'flex-start', flex: 1, justifyContent: 'center', alignItems: "center" }}>
                    <ScrollView showsVerticalScrollIndicator={false} style={{ width: "100%" }} >
                        {/* Romm and Roomie Container */}
                        <View style={{ marginTop: RFPercentage(6) }} >
                            <Animated.View style={{ justifyContent: "center", alignItems: "center", transform: [{ translateX: translateXTabOne }] }} onLayout={event => setTranslateY(event.nativeEvent.layout.height)}>
                                {initialComponent === 0 ? <RoomieTextFields {...props} /> : <RoomTextFields onPressHandle={() => { setActive(0); handleSlide(xTabOne) }}  {...props} />}
                            </Animated.View>
                            <Animated.View style={{ marginTop: RFPercentage(-43), justifyContent: "center", alignItems: "center", transform: [{ translateX: translateXTabTwo }, { translateY: -translateY / 2 }] }}>
                                <RoomieTextFields {...props} />
                            </Animated.View>
                        </View>
                    </ScrollView>
                </View>
            </View>
            {/* BottomTab */}
            <BottomTab onPressHomeIcon={() => props.navigation.navigate("MyPageScreen")} onPressMapIcon={() => props.navigation.navigate("MapScreen")} onPressSearchIcon={() => props.navigation.navigate("SearchScreen")} />
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        // marginTop: Constants.statusBarHeight,
        flex: 1,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%"
    }
})

export default AnnounceScreen;