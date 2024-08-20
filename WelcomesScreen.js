// WelcomeScreen.js
import React, { useState } from 'react';
import { TextInput, StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native';

export default function WelcomeScreen({ onNameSubmit }) {
  const [userName, setUserName] = useState('');

  return (
    <View style={styles.container}>
      <ImageBackground source={require('./assets/bg3-1.png')} resizeMode="cover" style={styles.background}>
        <View style={styles.logoContainer}>
          <Image source={require('./assets/medichat.png')} style={styles.logo} />
        </View>
        <Text style={styles.welcomeText}>Hola bienvenido, ¿Cómo te llamas?</Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu nombre"
          value={userName}
          onChangeText={setUserName}
        />
        <TouchableOpacity style={styles.button} onPress={() => onNameSubmit(userName)}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    width: '80%',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
