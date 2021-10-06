import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, ScrollView, Dimensions, Modal } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import * as ImagePicker from 'expo-image-picker';
import { Video, AVPlaybackStatus } from 'expo-av';


// components
import RoomieTextFields from '../components/announceFields/RommieTextFields';
import RoomTextFields from '../components/announceFields/RoomTextFields';
import BottomTab from '../components/common/BottomTab';
import Screen from './../components/Screen';

// config
import Colors from '../config/Colors';

const { width } = Dimensions.get("window");

function AnnounceScreen(props) {
    const [initialComponent, setinitialComponent] = useState(0);
    const [active, setActive] = useState(0);
    const [xTabOne, setXTabOne] = useState(0);
    const [xTabTwo, setXTabTwo] = useState(0);
    const [translateX, setTranslateX] = useState(new Animated.Value(0));
    const [translateXTabOne, setTranslateXTabOne] = useState(new Animated.Value(0));
    const [translateXTabTwo, setTranslateXTabTwo] = useState(new Animated.Value(width));
    const [translateY, setTranslateY] = useState(-1000);

    const [pickedVideo, setVideo] = useState(null);
    const [modelVisible, setmodelVisible] = useState(false)
    const [status, setStatus] = useState({});
    const video = useRef(null);

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

    const pickVideo = async (pickerType) => {
        let result;

        if (pickerType === "gallery") {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Videos,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
        } else if (pickerType === "camera") {
            result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Videos,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
        }

        console.log(result);

        if (!result.cancelled) {
            setVideo(result);
        }
    };




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
            <ScrollView showsVerticalScrollIndicator={false} style={{ width: "100%" }} >
                <View style={{ justifyContent: 'center', alignItems: 'center', width: "100%" }}>


                    {/* Top Heading */}
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: Colors.primary, fontSize: RFPercentage(4.2), marginTop: RFPercentage(5) }}>
                            Annouce
                        </Text>
                    </View>

                    {/* Adding Video */}
                    {!pickedVideo ?
                        <TouchableOpacity onPress={() => setmodelVisible(true)} style={{ marginTop: RFPercentage(5), width: '70%', backgroundColor: Colors.lightGrey, height: RFPercentage(25), alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: Colors.grey, fontSize: RFPercentage(2.5) }}>
                                Add Vedio
                            </Text>
                        </TouchableOpacity>
                        : <View style={{ marginTop: RFPercentage(5), width: '70%', alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ backgroundColor: Colors.lightGrey, width: "100%", justifyContent: "center", alignItems: "center", height: RFPercentage(25), }} >
                                <Video
                                    ref={video}
                                    style={{ width: '100%', height: '100%' }}
                                    source={pickedVideo}
                                    useNativeControls
                                    resizeMode="contain"
                                    isLooping
                                    onPlaybackStatusUpdate={status => setStatus(() => status)}
                                />
                            </View>
                            <TouchableOpacity onPress={() => setmodelVisible(true)} style={{ borderRadius: RFPercentage(3), padding: RFPercentage(1), marginTop: RFPercentage(2), borderWidth: 1, borderColor: Colors.grey }} ><Text style={{ fontSize: RFPercentage(2.1), color: Colors.grey }} >Uplload again</Text></TouchableOpacity>
                        </View>
                    }



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
                </View>
            </ScrollView>

            {/* BottomTab */}
            <BottomTab props={props} />

            <Modal visible={modelVisible} transparent={true}  >
                <View style={{ width: '100%', justifyContent: "center", alignItems: "center", flex: 1 }}>
                    <View style={{
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.23,
                        shadowRadius: 2.62,

                        elevation: 4, justifyContent: "space-evenly", alignItems: 'center', width: RFPercentage(40), height: RFPercentage(18), backgroundColor: Colors.white, borderRadius: 15
                    }} >
                        <TouchableOpacity onPress={() => {
                            setmodelVisible(false)
                            pickVideo("camera")
                        }} style={{ width: "70%", borderWidth: 1, borderRadius: 10, borderColor: Colors.mediumGrey, height: RFPercentage(5), justifyContent: "center", alignItems: "center" }} >
                            <Text style={{ fontSize: RFPercentage(2.2) }} >Select Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            setmodelVisible(false)
                            pickVideo("gallery")
                        }} style={{ width: "70%", borderWidth: 1, borderRadius: 10, borderColor: Colors.mediumGrey, height: RFPercentage(5), justifyContent: "center", alignItems: "center" }} >
                            <Text style={{ fontSize: RFPercentage(2.2) }} >Select Gallery</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

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