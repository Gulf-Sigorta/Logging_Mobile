import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
} from 'react-native';
import { TextInput, Button, Text, Title } from 'react-native-paper';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (username === 'admin' && password === '1234') {
      setError('');
      navigation.navigate('Home');
    } else {
      setError('Kullanıcı adı veya şifre yanlış');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={60} // opsiyonel, header varsa değeri arttır
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        style={{ flex: 1 }}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Title style={styles.title}>Giriş Yap</Title>

        <TextInput
          label="Kullanıcı Adı"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus
          mode="outlined"
        />

        <TextInput
          label="Şifre"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry={!showPassword}
          mode="outlined"
          right={
            <TextInput.Icon
              icon={showPassword ? 'eye-off' : 'eye'}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Button
          mode="contained"
          onPress={handleLogin}
          style={styles.button}
          icon="login"
        >
          Giriş
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 400,
    height: 200,
    borderRadius: 20,
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});
