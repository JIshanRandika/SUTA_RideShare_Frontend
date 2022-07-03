import React, {useContext} from 'react';
import {ActivityIndicator, Button, StyleSheet, Text, TouchableOpacity, View, SafeAreaView,ScrollView } from 'react-native';
import {AuthContext} from '../context/AuthContext';
// import Token from './Token';

function AboutScreen({ navigation }) {
    const {userInfo, isLoading, logout} = useContext(AuthContext);

    return (
        <View style={{ flex: 1,width:'100%',justifyContent:'center' }}>
            {/*<Token/>*/}
            {/*<Spinner visible={isLoading} />*/}
            {/*<Text style={styles.welcome}>Welcome {userInfo.message}</Text>*/}
            <SafeAreaView>
                <ScrollView>
            <View style={{margin:30,flex:1}}>

                <Text style={{margin:10}}>
                    SL RideShare වර්තමාන ඉන්දන අර්බුදයට හොඳ විසඳුමකි.
                </Text>
                <Text style={{margin:10}}>
                    SL RideShare හරහා, ඔබ වාහනයකින් ගමනක් යනවිට, තවස් හිස් අසුන් ඇතිනම් එම අසුන්, වාහනයක් නොමැතිව අපහසුතාවට පත්ව සිටින මගියෙකුට ලබාදිය හැකිය. ඒ වගේම තමයි වාහනයක් නොමැතිව අපහසුතාවට පත්වන මගියෙකුට, තම ගමානාන්තයට සුදුසු වාහනයක් තොරාගත හැකිය.
                </Text>
                <Text style={{margin:10}}>
                    SL RideShare මගින් ලබා දෙන මෙම සේවාව, ඔබට කැමති කණ්ඩායමක් අතර බෙදාගත හැක. උදාහරණක් ලෙස, ඔයාගෙ office එකේ හෝ අසල්වැසියන්ට එකතු වෙලා කණ්ඩායමක් සාදාගත් හැකිය. එවිට ඔබ කණ්ඩායමේ ප්‍රවාහන පහසුකම් ලබාදිය හැකි පුද්ගලයන්ට, කණ්ඩායමේ අනෙකුත් මගියන්ට මහඟු සේවාවක් ලබාදිය හැකිය.
                </Text>

                <Text style={{margin:10}}>
                    இன்றைய எரிபொருள் நெருக்கடிக்கு SL RideShare ஒரு சிறந்த தீர்வாகும்.
                </Text>

                <Text style={{margin:10}}>
                    SL RideShare மூலம், வாகனத்தில் சவாரி செய்யும்போது, ​​காலி இருக்கைகள் இருந்தால், வாகனம் இல்லாமல் சிரமப்படும் பயணிகளுக்கு அந்த இருக்கைகளை விட்டுக்கொடுக்கலாம். அதேபோல், வாகனம் இல்லாமல் சிரமப்படும் பயணி, தான் செல்லும் இடத்திற்கு ஏற்ற வாகனத்தை தேர்வு செய்யலாம்.
                </Text>
                <Text style={{margin:10}}>
                    SL RideShare வழங்கும் இந்தச் சேவையை, நீங்கள் விரும்பும் குழுவில் பகிர்ந்து கொள்ளலாம். உதாரணமாக, நீங்கள் உங்கள் அலுவலகத்தில் அல்லது உங்கள் அண்டை வீட்டாருடன் ஒரு குழுவை உருவாக்கலாம். பின்னர் நீங்கள் குழுவின் போக்குவரத்து வசதிகளை வழங்கலாம் மற்றும் குழுவின் மற்ற பயணிகளுக்கு சிறந்த சேவையை வழங்கலாம்.
                </Text>

                <Text style={{margin:10}}>
                    SL RideShare is a great solution to today's fuel crisis.
                </Text>
                <Text style={{margin:10}}>
                    Through SL RideShare, when you take a ride in a vehicle, if there are empty seats, you can give up those seats to a passenger who is inconvenient without a vehicle. Similarly, a passenger who is inconvenient without a vehicle can choose a suitable vehicle for his destination.
                </Text>
                <Text style={{margin:10}}>
                    This service provided by SL RideShare, you can share among a group of your choice. For example, you can form a group in your office or with your neighbors. Then you can provide the transportation facilities of the group and provide a great service to the other passengers of the group.
                </Text>

                <Text style={{margin:10}}>
                    Contact Number: +94 71 57 57 700
                </Text>
                <Text style={{margin:10}}>
                    Email: jishanrandika@gmail.com
                </Text>
            </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    welcome: {
        fontSize: 18,
        marginBottom: 0,
    },
});

export default AboutScreen;
