// URL de la API en tu servidor Node.js
const apiUrl = 'http://127.0.0.1:3000/ejercicios';

// Realizar la solicitud GET utilizando fetch
fetch(apiUrl)
  .then(response => {
    // Verificar si la respuesta es exitosa (código de estado 200)
    if (!response.ok) {
      throw new Error(`Error de red: ${response.status}`);
    }
    // Convertir la respuesta a formato JSON
    return response.json();
  })
  .then(data => {
    // Manejar los datos obtenidos de la API
    console.log('Datos de la API:', data);

    data.forEach(ejercicio => {
        const id = ejercicio._id;
        const nombre = ejercicio.nombre;
        const imagen = ejercicio.imagen;
        const tipoDeTrabajo = ejercicio.tipoDeTrabajo;
        const tipoDeEjercicio = ejercicio.tipoDeEjercicio;
        const grupoMuscular = ejercicio.grupoMuscular;
        const dificultad = ejercicio.dificultad;
        const riesgoDeLesion = ejercicio.riesgoDeLesion;
        

        const contenedor = document.getElementById('contenedor');

        // Definir el HTML que deseas insertar
        const nuevoContenidoHTML = 
        '<div class="item"> <div class=" nombre ">'+nombre+'</div><div class=" imagen "> <img src="'+imagen+'" alt=""> </div> <div class=" trabajo ">Id: '+id+'</div> <div class=" trabajo ">Tipo de trabajo: '+tipoDeTrabajo+'</div><div class=" ejercicio ">Tipo de ejercicio: '+tipoDeEjercicio+'</div><div class=" muscular ">Grupo muscular: '+grupoMuscular+'</div><div class=" dificultad ">Dificultad: '+dificultad+' </div> <div class=" riesgo ">Riesgo de lesion :'+riesgoDeLesion+'</div> <div class=" riesgo "><button id="buttonCambio" onclick="editar('+"'"+nombre+"'"+",'"+imagen+"'"+",'"+tipoDeTrabajo+"'"+",'"+tipoDeEjercicio+"'"+",'"+grupoMuscular+"'"+",'"+dificultad+"'"+",'"+riesgoDeLesion+"'"+",'"+id+"'"+')">Editar</button></div> <button id="buttonBaja" onclick="eliminar('+"'"+id+"'"+')">Eliminar</button></div>'
        ;
    
        // Insertar el HTML en el div contenedor
        contenedor.innerHTML += nuevoContenidoHTML;
        
    });

  })
  .catch(error => {
    // Manejar errores de red o errores en la API
    console.error('Error al obtener datos:', error);
  });


  function editar(name,img,trab,eje,mus,dif,ries,id) {
  
     var ide = document.getElementById("ide");
     ide.value = id;
     var nombre = document.getElementById("namee");
     nombre.value = name;
     var imagee = document.getElementById("imagee");
     imagee.src = img;
     var trabaje = document.getElementById("trabaje");
     trabaje.value = trab;
     var ejercicie = document.getElementById("ejercicie");
     ejercicie.value = eje;
     var musculare = document.getElementById("musculare");
     musculare.value = mus;
     var dificultade = document.getElementById("dificultade");
     dificultade.value = dif;
     var riesge = document.getElementById("riesge");
     riesge.value = ries;
  }

//PETICION PETCH EDITAR
function hacerEdicion() {
  var ide = document.getElementById("ide");
  var nombre = document.getElementById("namee");
  var imagee = document.getElementById("imagee");
  var trabaje = document.getElementById("trabaje");
  var ejercicie = document.getElementById("ejercicie");
  var musculare = document.getElementById("musculare");
  var dificultade = document.getElementById("dificultade");
  var riesge = document.getElementById("riesge");

  const url = 'http://127.0.0.1:3000/ejercicios/'+ide.value;
  const datos = {
    nombre: nombre.value,
    imagen: imagee.src,
    tipoDeTrabajo: trabaje.value,
    tipoDeEjercicio: ejercicie.value,
    grupoMuscular: musculare.value,
    dificultad: dificultade.value,
    riesgoDeLesion: riesge.value
  };
  
  const opciones = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(datos)
  };
  
  fetch(url, opciones)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la petición.');
      }
      return response.json();
    })
    .then(data => {
      console.log('Respuesta del servidor:', data);
      setTimeout(function() {
        location.reload();
      }, 200); 
    })
    .catch(error => {
      console.error('Error:', error);
    });

}

//PETICION POST ALTA
function alta() {
  var nombre = document.getElementById("name");
  var imagee = document.getElementById("img");
  var trabaje = document.getElementById("traba");
  var ejercicie = document.getElementById("ejer");
  var musculare = document.getElementById("muscu");
  var dificultade = document.getElementById("difi");
  var riesge = document.getElementById("ries");

  const url = 'http://localhost:3000/ejercicios';
  const datos = {
    nombre: nombre.value,
    imagen: imagee.value,
    tipoDeTrabajo: trabaje.value,
    tipoDeEjercicio: ejercicie.value,
    grupoMuscular: musculare.value,
    dificultad: dificultade.value,
    riesgoDeLesion: riesge.value
  };
  
  const opciones = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(datos)
  };
  
  fetch(url, opciones)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la petición.');
      }
      return response.json();
    })
    .then(data => {
      console.log('Respuesta del servidor:', data);
      setTimeout(function() {
        location.reload();
      }, 200); 
    })
    .catch(error => {
      console.error('Error:', error);
    });

}


//DELETE

function eliminar(id){
  const url = 'http://localhost:3000/ejercicios/'+id;
  const opciones = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json' 
    }
  };
  
  fetch(url, opciones)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la petición.');
      }
      return response.json();
    })
    .then(data => {
      console.log('Respuesta del servidor:', data);
      alert("Registro Eliminado con Exito");
      setTimeout(function() {
        location.reload();
      }, 200); 
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

  //CSS
  function cambiarColor() {
    var boton = document.getElementById("buttonAlta");
    // Cambiar de color al hacer clic
    boton.classList.toggle("clicked");
    setTimeout(function() {
      boton.classList.toggle("clicked");
    }, 100);
  }

  //Subir foto
  function subir() {
    const input = document.getElementById('miInput');
    const archivo = input.files[0];
  
    if (archivo) {
      const url = 'http://localhost:3000/subirImagen';

      const datos = new FormData();
      datos.append('miImagen', archivo);
  
      fetch(url, {
        method: 'POST',
        body: datos
      })
      .then(response => response.json())
      .then(data => {
        alert("se subio");
        console.log('Respuesta del servidor:', data);
        const nombreArchivoSubido = data.nombreArchivo;
        var imag = document.getElementById("img");
        imag.value = "../imagenes/"+nombreArchivoSubido;
      })
      .catch(error => {
        console.error('Error:', error);
      });
    } else {
      console.error('Selecciona un archivo primero.');
    }
  }