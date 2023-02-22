import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera as ExpoCamera, CameraType } from 'expo-camera';

const Camera: React.FC = () => {
    const [hasPermission, setHasPermission] = ExpoCamera.useCameraPermissions();
    const [type, setType] = useState(CameraType.back);

    useEffect(() => {
        (async () => {
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }


    function alertCode(code: any) {
        alert(code.data)
    }

    return (
        <View style={styles.container}>
            <ExpoCamera style={styles.camera} type={type}
                onBarCodeScanned={(code) => alertCode(code)}
                barCodeScannerSettings={{
                    barCodeTypes: [
                        BarCodeScanner.Constants.BarCodeType.qr,
                        BarCodeScanner.Constants.BarCodeType.code128
                    ]
                }}
                onMountError={(error) => alert(error)}>
                <TouchableOpacity onPress={
                    () => type == CameraType.back ?
                        setType(CameraType.front) :
                        setType(CameraType.back)
                } style={styles.flipContainer}>
                    <Text style={styles.text}>Flip camera</Text>
                </TouchableOpacity>
            </ExpoCamera>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
    flipContainer: {
        position: 'absolute',
        bottom: 30,
        left: '50%',
        transform: [
            { translateX: -50 },
        ],
    }
});


export default Camera
