import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera as ExpoCamera, CameraType } from 'expo-camera';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Camera: React.FC = () => {
    const [hasPermission, setHasPermission] = useState(ExpoCamera.useCameraPermissions());
    const [scannedContent, setScannedContent] = useState<string | null>(null);
    const [type, setType] = useState<any>(CameraType.back);
    const [blockCamera, setBlockCamera] = useState(false);

    if (hasPermission === null || blockCamera === true) {
        return <View />;
    }

    if (scannedContent !== null) {
        return <View style={{ flex: 1 }}>
            <View style={styles.scannedContent}>
                <Text style={styles.titleText}>Scanned content</Text>
                <Text>{scannedContent}</Text>
            </View>

            <Button
                onPress={() => {
                    setBlockCamera(false);
                    setScannedContent(null);
                }}
                title="Scann another one"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />

        </View>;

    }

    function changeCamera() {
        setBlockCamera(true);
        setTimeout(() => {
            type == CameraType.back ?
                setType(CameraType.front) :
                setType(CameraType.back)
            setBlockCamera(false);
        }, 100);
    }

    return (
        <View style={styles.container}>
            <ExpoCamera style={styles.camera} type={type}

                onBarCodeScanned={(code) => {
                    setScannedContent(code.data);
                }}
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
    },
    scannedContent: {
        width: '100%',
        marginTop: 30,
        padding: 20,
        marginBottom: 20
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold'
    }

});


export default Camera
