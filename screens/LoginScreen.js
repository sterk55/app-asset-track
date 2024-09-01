// src/screens/LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import users from '../datas/usersData';

const { width } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      setErrorMessage('');
      navigation.navigate('Home', { user });
    } else {
      setErrorMessage('Credenciales incorrectas, intenta de nuevo.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Asset Track</Text>
      <TextInput
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor="#ffffff" // Color del texto del placeholder
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#ffffff" // Color del texto del placeholder
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Alinea los elementos en el centro
    backgroundColor: '#0f0e17', // Fondo negro
  },
  input: {
    width: width * 0.8, // Ancho reducido para los campos de entrada
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ffffff', // Borde blanco
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#000000', // Fondo negro para los campos de entrada
    color: '#fffffe', // Color del texto en los campos de entrada
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#fffffe', // Texto blanco
    marginBottom: 30,
  },
  button: {
    width: width * 0.8, // Botón del mismo ancho que los campos de entrada
    padding: 15,
    backgroundColor: '#ff8906', // Botón naranja
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fffffe', // Texto del botón en blanco
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default LoginScreen;
