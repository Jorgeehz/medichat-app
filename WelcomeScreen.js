// WelcomeScreen.js
import React, { useState } from 'react';
import { TextInput, StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native';

export default function WelcomeScreen({ onNameSubmit, navigation }) {
  const [userName, setUserName] = useState('');

  return (
    <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require('./assets/LogoPsico.jpg')} style={styles.logo} />
        </View>
        <Text style={styles.welcomeText}>Hola bienvenido, ¿Cómo te llamas?</Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu nombre"
          value={userName}
          onChangeText={setUserName}
        />
        <TouchableOpacity style={styles.button} onPress={() => {onNameSubmit(userName); navigation.navigate('Chat');}}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
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
    borderRadius: 50,
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
    backgroundColor: '#78b9bd',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
