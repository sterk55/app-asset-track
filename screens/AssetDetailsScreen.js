import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, StatusBar, Modal, TouchableOpacity } from 'react-native';
import { updateAsset } from '../datas/assetsData'; // Importa la función de actualización
import { useAuth } from '../context/AuthContext'; // Importa el contexto

const AssetDetailsScreen = ({ route, navigation }) => {
  const { asset } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const { user } = route.params; // Obtén el usuario logueado desde el contexto
  const [refresh, setRefresh] = useState(false);




  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleUpcomingMaintenancePress = (item) => {
    navigation.navigate('ModifyMaintenance', {
      maintenance: item,
      assetId: asset.id,
      user
    });
  };

  const handleLastMaintenancePress = (maintenance) => {
    setModalContent(maintenance);
    toggleModal();
  };



  const renderUpcomingMaintenanceItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleUpcomingMaintenancePress(item)}>
      <View style={styles.maintenanceItem}>
        <Text style={styles.maintenanceText}>
          {item.date} - {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderLastMaintenanceItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleLastMaintenancePress(item)}>
      <View style={styles.maintenanceItem}>
        <Text style={styles.maintenanceText}>
          {item.date} - {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const handleRefresh = () => {
    setRefresh(prev => !prev); // Cambia el estado de refresco para forzar el re-renderizado
  };


  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#f5f5f5" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.assetInfoBox}>
            <Text style={styles.title}>Detalles del Activo</Text>
            <Text style={styles.text}>Nombre: {asset.name}</Text>
            <Text style={styles.text}>Descripción: {asset.description}</Text>
            <Text style={styles.text}>Ubicación: {asset.location}</Text>
          </View>

          {/* Botón de Actualizar */}
          <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
            <Text style={styles.refreshButtonText}>Actualizar</Text>
          </TouchableOpacity>
          {/* Tabla de próximos mantenimientos */}
          <View style={styles.maintenanceContainer}>
            <Text style={styles.subtitle}>Próximos Mantenimientos</Text>
            <FlatList
              data={asset.upcomingMaintenances}
              renderItem={renderUpcomingMaintenanceItem}
              keyExtractor={(item) => `upcoming-${item.id}`} // Usa un ID único para cada mantenimiento
              ListEmptyComponent={<Text style={styles.noMaintenanceText}>No hay próximos mantenimientos.</Text>}
              contentContainerStyle={styles.listContent}
            />
          </View>

          {/* Tabla de últimos mantenimientos realizados */}
          <View style={styles.maintenanceContainer}>
            <Text style={styles.subtitle}>Últimos Mantenimientos Realizados</Text>
            <FlatList
              data={asset.lastMaintenances}
              renderItem={renderLastMaintenanceItem}
              keyExtractor={(item) => `last-${item.id}`} // Usa un ID único para cada mantenimiento
              ListEmptyComponent={<Text style={styles.noMaintenanceText}>No hay mantenimientos realizados.</Text>}
              contentContainerStyle={styles.listContent}
            />
          </View>
        </View>

        {/* Modal para mostrar detalles de mantenimiento */}
        <Modal
          visible={modalVisible}
          onRequestClose={toggleModal}
          transparent={true}
          animationType="slide"
        >
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Detalles del Mantenimiento</Text>
              <Text style={styles.modalText}>Fecha: {modalContent?.date}</Text>
              <Text style={styles.modalText}>Título: {modalContent?.title}</Text>
              <Text style={styles.modalText}>Descripción: {modalContent?.description}</Text>
              <Text style={styles.modalText}>Piezas Cambiadas: {modalContent?.partsChanged}</Text>
              <Text style={styles.modalText}>Técnico: {modalContent?.technician}</Text>
              <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0f0e17',
  },
  container: {
    flex: 1,
    padding: 8,
  },
  assetInfoBox: {
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#a7a9be',
    borderRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#000000',
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
    color: '#000000',
  },
  maintenanceContainer: {
    backgroundColor: '#a7a9be',
    borderRadius: 8,
    elevation: 4,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    paddingHorizontal: 8,
    fontWeight: 'bold',
    marginBottom: 4,
    marginTop: 8,
    textAlign: 'left',
    color: '#000000',
  },
  maintenanceItem: {
    paddingVertical: 8,
    paddingHorizontal: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
  maintenanceText: {
    fontSize: 16,
    paddingHorizontal: 8,
    color: '#000000',
  },
  noMaintenanceText: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
    marginTop: 4,
  },
  listContent: {
    paddingBottom: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 20,
    elevation: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#ff8906',
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  refreshButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 10,
  },
  refreshButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },

});

export default AssetDetailsScreen;
