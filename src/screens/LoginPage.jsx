import React, { useState } from 'react';
import { View, Alert, TouchableOpacity, Text } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { signInWithPhoneNumber } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [showVerificationCode, setShowVerificationCode] = useState(false);
  const { colors } = useTheme();
  const navigation = useNavigation();

  const sendVerificationCode = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(`+91${phoneNumber}`);
      setConfirm(confirmation);
      setShowVerificationCode(true);
    } catch (error) {
      console.log('Error sending verification code:', error);
      Alert.alert('Error', 'Failed to send verification code');
    }
  };

  const verifyCode = async () => {
    try {
      const isVerified = await confirm.confirm(verificationCode);
      if (!isVerified) {
        throw new Error('Invalid verification code');
      }
      Alert.alert('Success', 'Phone number verified successfully');
      navigation.navigate('Home');
    } catch (error) {
      console.log('Error verifying code:', error);
      Alert.alert('Error', 'Invalid verification code');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <Text variant="titleLarge" style={{ color: colors.primary, marginBottom: 16 }}>
        Welcome to OTP Verification
      </Text>
      <TextInput
        style={{
          marginBottom: 16,
          padding: 12,
          borderWidth: 1,
          borderRadius: 8,
          borderColor: colors.border,
        }}
        label="Phone Number"
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TouchableOpacity
        style={{
          marginBottom: 16,
          padding: 12,
          borderRadius: 8,
          backgroundColor: colors.primary,
        }}
        onPress={sendVerificationCode}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Send Verification Code</Text>
      </TouchableOpacity>
      {showVerificationCode && (
        <>
          <Text variant="bodySmall" style={{ alignSelf: 'center', marginVertical: 16 }}>
            Enter the verification code you received
          </Text>
          <TextInput
            style={{
              marginBottom: 16,
              padding: 12,
              borderWidth: 1,
              borderRadius: 8,
              borderColor: colors.border,
            }}
            label="Verification Code"
            placeholder="Enter the verification code"
            value={verificationCode}
            onChangeText={setVerificationCode}
          />
          <TouchableOpacity
            style={{
              marginBottom: 16,
              padding: 12,
              borderRadius: 8,
              backgroundColor: colors.primary,
            }}
            onPress={verifyCode}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>Verify</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default LoginPage;
