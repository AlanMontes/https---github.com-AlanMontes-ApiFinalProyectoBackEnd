const mongoose = require('mongoose')

const ejercicioSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    imagen:{
        type: String,
        required: true
    },
    tipoDeTrabajo:{
        type: String,
        required: true
    },
    tipoDeEjercicio:{
        type: String,
        required: true
    },
    grupoMuscular:{
        type: String,
        required: true
    },
    dificultad:{
        type: String,
        required: true
    },
    riesgoDeLesion:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Ejercicio', ejercicioSchema)