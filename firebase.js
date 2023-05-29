// Inicializar Firebase con la URL de la base de datos
var firebaseConfig = {
    databaseURL: "https://bateria-dc506-default-rtdb.firebaseio.com/",
  };
  
  firebase.initializeApp(firebaseConfig);
  
  // Obtener referencia a la base de datos
  var database = firebase.database();
  
  function guardarDatosBateria(nivelBateria) {
    // Crear una nueva referencia en la base de datos
    var bateriaRef = database.ref("bateria");
  
    // Guardar el nivel de batería en la base de datos
    bateriaRef.set({
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
  