import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';

const MedicationScanner = () => {
  const navigation = useNavigation();

  const onSuccess = async (e) => {
    const scannedData = e.data;
    navigation.navigate('MedicationInfo', { barcode: scannedData });
  };

  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={onSuccess}
        flashMode={RNCamera.Constants.FlashMode.off}
        topContent={<Text>Scan the medication barcode</Text>}
        bottomContent={<Text>Align the barcode within the frame</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MedicationScanner;