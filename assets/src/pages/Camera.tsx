import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'

import { Camera as ExpoCamera, CameraType } from 'expo-camera';

const Camera: React.FC = () => {
    const [hasPermission, setHasPermission] = useState<any>(null);
    const [type, setType] = useState(CameraType.back);

    useEffect(() => {
        (async () => {
            const { status } = await ExpoCamera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={{ flex: 1 }}>
            <ExpoCamera style={{ flex: 1 }} />
        </View>
    )
}

export default Camera
