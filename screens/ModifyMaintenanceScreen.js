// screens/ModifyMaintenanceScreen.js
import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext'; // Importa el contexto
import { updateAsset } from '../datas/assetsData'; // Importa la función de actualización

const ModifyMaintenanceScreen = ({ route, navigation }) => {
  const { maintenance, assetId } = route.params || {};
  // Obtén el usuario logueado desde el contexto
  const { user } = route.params;
  if (!maintenance || !assetId) {
    console.error('Faltan parámetros de mantenimiento o activo.');
    return null;
  }

  const [description, setDescription] = useState(maintenance.description || '');
  const [partsChanged, setPartsChanged] = useState(maintenance.partsChanged || '');

  const handleSave = () => {
    const updatedMaintenance = {
      ...maintenance,
      description,
      partsChanged,
      technician: user?.name || 'Desconocido',
      date: new Date().toISOString().split('T')[0], // Fecha en formato YYYY-MM-DD
    };

    try {
      // Llama a la función para actualizar el activo
      updateAsset(assetId, updatedMaintenance);

      // Regresa a la pantalla anterior
      navigation.goBack();
    } catch (error) {
      console.error('Error al actualizar el mantenimiento:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Modificar Mantenimiento</Text>
        <Text style={styles.title2}>{maintenance.title}</Text>
        <Text style={styles.subtitle}>Descripción:</Text>
        <TextInput
          style={styles.input}
          placeholder="Descripción"
          value={description}
          onChangeText={setDescription}
        />
        <Text style={styles.subtitle}>Piezas cambiadas:</Text>
        <TextInput
          style={styles.input}
          placeholder="Piezas Cambiadas"
          value={partsChanged}
          onChangeText={setPartsChanged}
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0f0e17',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 10,
    textAlign: 'center',
    color: '#fffffe',

  },
  subtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fffffe',
  },
  title2: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#fffffe',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginBottom: 16,
    backgroundColor: '#a7a9be',
  },
  saveButton: {
    backgroundColor: '#ff8906',
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default ModifyMaintenanceScreen;
