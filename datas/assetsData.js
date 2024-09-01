// datas/assetsData.js

let assets = [
    {
      id: '1',
      name: 'Laptop Dell',
      description: 'Laptop modelo XPS 13',
      location: 'Oficina 101',
      lastMaintenances: [
        { 
          id: 'lm1',
          date: '2024-06-01', 
          title: 'Cambio de Batería', 
          description: 'Se cambió la batería principal del dispositivo.', 
          partsChanged: 'Batería', 
          technician: 'Juan Pérez' 
        },
        { 
          id: 'lm2',
          date: '2024-04-15', 
          title: 'Actualización de Software', 
          description: 'Actualización del sistema operativo y software.', 
          partsChanged: 'N/A', 
          technician: 'María López' 
        }
      ],
      upcomingMaintenances: [
        { 
          id: 'um1',
          date: '2024-09-15', 
          title: 'Revisión General', 
          description: 'Revisión completa del estado del dispositivo.', 
          partsChanged: 'N/A', 
          technician: 'Pendiente' 
        },
        { 
          id: 'um2',
          date: '2024-12-01', 
          title: 'Limpieza Interna', 
          description: 'Limpieza interna para evitar acumulación de polvo.', 
          partsChanged: 'N/A', 
          technician: 'Pendiente' 
        }
      ]
    },
    {
      id: '2',
      name: 'Monitor Samsung',
      description: 'Monitor LED 24 pulgadas',
      location: 'Oficina 202',
      lastMaintenances: [
        { 
          id: 'lm3',
          date: '2024-05-10', 
          title: 'Reemplazo de Cable de Poder', 
          description: 'Cambio del cable de poder del monitor.', 
          partsChanged: 'Cable de poder', 
          technician: 'Luis Fernández' 
        }
      ],
      upcomingMaintenances: [
        { 
          id: 'um3',
          date: '2024-11-25', 
          title: 'Revisión de Conectores', 
          description: 'Revisión y ajuste de conectores del monitor.', 
          partsChanged: 'N/A', 
          technician: 'Pendiente' 
        }
      ]
    },
    {
      id: '3',
      name: 'Proyector Epson',
      description: 'Proyector de alta resolución',
      location: 'Sala de Conferencias',
      lastMaintenances: [
        { 
          id: 'lm4',
          date: '2024-03-20', 
          title: 'Cambio de Lámpara', 
          description: 'Sustitución de la lámpara del proyector.', 
          partsChanged: 'Lámpara', 
          technician: 'Ana Martínez' 
        }
      ],
      upcomingMaintenances: [
        { 
          id: 'um4',
          date: '2024-10-10', 
          title: 'Calibración de Imagen', 
          description: 'Ajuste y calibración de la calidad de imagen.', 
          partsChanged: 'N/A', 
          technician: 'Pendiente' 
        },
        { 
          id: 'um5',
          date: '2024-12-15', 
          title: 'Revisión de Ventilador', 
          description: 'Chequeo del ventilador del proyector.', 
          partsChanged: 'N/A', 
          technician: 'Pendiente' 
        }
      ]
    },
    // Añade más activos aquí
  ];
  
  const updateAsset = (assetId, updatedMaintenance) => {
    // Encuentra el activo
    const asset = assets.find(a => a.id === assetId);
  
    if (asset) {
      // Busca el mantenimiento en próximos mantenimientos
      let maintenanceIndex = asset.upcomingMaintenances.findIndex(m => m.id === updatedMaintenance.id);
  
      if (maintenanceIndex !== -1) {
        // Actualiza el mantenimiento en próximos mantenimientos
        asset.upcomingMaintenances[maintenanceIndex] = updatedMaintenance;
        // Mueve el mantenimiento a últimos mantenimientos
        asset.lastMaintenances.push(asset.upcomingMaintenances.splice(maintenanceIndex, 1)[0]);
      } else {
        // Si no está en próximos mantenimientos, busca en últimos mantenimientos
        maintenanceIndex = asset.lastMaintenances.findIndex(m => m.id === updatedMaintenance.id);
  
        if (maintenanceIndex !== -1) {
          // Actualiza el mantenimiento en últimos mantenimientos
          asset.lastMaintenances[maintenanceIndex] = updatedMaintenance;
        }
      }
  
      console.log('Activo actualizado:', asset);
    } else {
      console.error('Activo no encontrado.');
    }
  };
  
  export { assets, updateAsset };
  