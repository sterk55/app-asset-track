// src/screens/HomeScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { assets } from '../datas/assetsData'; // Importa los datos de los activos

const HomeScreen = ({ route, navigation }) => {
  const { user } = route.params;
  const [assetId, setAssetId] = useState('');

  const handleSearch = () => {
    // Asegúrate de que `assets` esté definido y no sea `undefined`
    if (!assets) {
      Alert.alert('Error', 'No se pudo cargar los datos de los activos.');
      return;
    }

    const asset = assets.find(a => a.id === assetId);

    if (asset) {
      navigation.navigate('AssetDetails', { asset, user });
    } else {
      Alert.alert('No encontrado', 'El activo con ese código no existe.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenido {user.name} a</Text>
      <Text style={styles.texta}>ASSET TRACK!</Text>
      <Text style={styles.text}>Ingrese el código del activo</Text>
      <TextInput
        style={styles.input}
        placeholder="Código del Activo"
        value={assetId}
        onChangeText={setAssetId}
        keyboardType="numeric"
        placeholderTextColor="#666"
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#0f0e17',
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
    color: '#fffffe', // Color de texto blanco
  },
  texta: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#e53170', // Color de texto blanco
  },
  input: {
    borderWidth: 1,
    borderColor: '#0f0e17', // Borde blanco
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
    width: '80%',
    textAlign: 'center',
    color: '#0f0e17', // Color del texto de entrada
    backgroundColor: '#a7a9be', // Fondo negro
  },
  button: {
    backgroundColor: '#FFA500', // Color de fondo naranja
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    alignItems: 'center',
    width: '80%', // Ancho del botón igual al de los campos de entrada
  },
  buttonText: {
    color: '#0f0e17', // Color del texto del botón en blanco
    fontWeight: 'bold',
  },
});

export default HomeScreen;
