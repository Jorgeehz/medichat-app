import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const UserOptions = ({ userName, onOptionSelect }) => {
  return (
    <View style={styles.container}>
      <Image source={require('./assets/LogoPsico.jpg')} style={styles.logo} />
      <Text style={styles.welcomeText}>Hola {userName}, ¿cómo puedo ayudarte?</Text>
      <TouchableOpacity style={styles.optionButton} onPress={() => onOptionSelect('Dime algo que me levante el ánimo y me haga sentir bien')}>
        <Text style={styles.optionTitle}>No te sientes bien?</Text>
        <Text style={styles.optionText}>Dime algo que me levante el ánimo y me haga sentir bien.</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionButton} onPress={() => onOptionSelect('Quiero que me des consejos para el cuidado de mi salud mental para mi día a día')}>
        <Text style={styles.optionTitle}>¿Quieres consejos de salud?</Text>
        <Text style={styles.optionText}>Quiero que me des consejos para el cuidado de mi salud mental para mi día a día.</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionButton} onPress={() => onOptionSelect('Bríndame información sobre las enfermedades de salud mental actuales')}>
        <Text style={styles.optionTitle}>¿Información sobre enfermedades?</Text>
        <Text style={styles.optionText}>Bríndame información sobre las enfermedades de salud mental actuales.</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius: 50,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  optionButton: {
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  optionText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  },
});

export default UserOptions;
