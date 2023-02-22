import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera as ExpoCamera, CameraType } from 'expo-camera';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Camera: React.FC = () => {
    const [hasPermission, setHasPermission] = useState(ExpoCamera.useCameraPermissions())
    const [type, setType] = useState<any>(CameraType.back);
    const [blockCamera, setBlockCamera] = useState(false);

    if (hasPermission === null || blockCamera === true) {
        return <View />;
    }

    function changeCamera() {
        setBlockCamera(true);
        type == CameraType.back ?
            setType(CameraType.front) :
            setType(CameraType.back)
        setBlockCamera(false);
    }

    return (
        <View style={styles.container}>
            <ExpoCamera style={styles.camera} type={type}

                onBarCodeScanned={(code) => alert(code.data)}
                barCodeScannerSettings={{
                    barCodeTypes: [
                        BarCodeScanner.Constants.BarCodeType.qr,
                        BarCodeScanner.Constants.BarCodeType.code128
                    ]
                }}
                onMountError={(error) => alert(error)}>
                <TouchableOpacity onPress={() => changeCamera()} style={styles.flipContainer}>
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
