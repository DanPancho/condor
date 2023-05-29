window.addEventListener('DOMContentLoaded', function() {
  // Verificar si el navegador admite la Battery Status API
  if ('getBattery' in navigator || ('battery' in navigator && 'Promise' in window)) {
    navigator.getBattery()
      .then(function(battery) {
        updateBatteryStatus(battery);
        battery.addEventListener('levelchange', function() {
          updateBatteryStatus(battery);
        });
      })
      .catch(function(error) {
        console.error('Error al acceder a la información de la batería:', error);
      });
  } else {
    console.error('La Battery Status API no está soportada en este navegador.');
  }
  
  function updateBatteryStatus(battery) {
    var batteryLevel = Math.round(battery.level * 100);
    document.getElementById('battery-level').innerText = 'Nivel de batería: ' + batteryLevel + '%';
    
    // Guardar el nivel de batería en Firebase
    guardarDatosBateria(batteryLevel);
  }
});

function guardarDatosBateria(nivelBateria) {
  // Crear una nueva referencia en la base de datos
  var bateriaRef = database.ref("bateria");

  // Generar una nueva clave única para el registro
  var nuevoRegistroRef = bateriaRef.push();

  // Guardar el nivel de batería en el nuevo registro
  nuevoRegistroRef.set({
    nivel: nivelBateria,
    fecha: new Date().toISOString()
  })
  .then(function() {
    console.log('Información de batería guardada en Firebase.');
  })
  .catch(function(error) {
    console.error('Error al guardar información de batería en Firebase:', error);
  });
}
