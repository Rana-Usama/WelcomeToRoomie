import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

//config
import Colors from '../../config/Colors';

function BottomTab({ onPressMapIcon = () => { }, onPressSearchIcon = () => { }, onPressHomeIcon = () => { } }) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', justifyContent: 'center', bottom: 0, width: "100%", height: RFPercentage(7), backgroundColor: Colors.primaryLight2 }}>
            <TouchableOpacity onPress={onPressHomeIcon} style={{ position: 'absolute', left: RFPercentage(4) }}>
                <MaterialIcons name="home" size={RFPercentage(4)} color={Colors.white} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressSearchIcon} >
                <Ionicons name="search" size={RFPercentage(4)} color={Colors.white} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressMapIcon} style={{ position: 'absolute', right: RFPercentage(4) }}>
                <MaterialIcons name="map" size={RFPercentage(4)} color={Colors.white} />
            </TouchableOpacity>
        </View>
    );
}

export default BottomTab;