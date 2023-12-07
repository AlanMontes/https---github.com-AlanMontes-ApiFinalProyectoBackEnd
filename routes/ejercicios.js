const express = require('express')
const router = express.Router()
const Ejercicio = require('../models/ejercicio')


//Getting all
router.get('/', async (req,res) =>{
    try {
        const ejercicios = await Ejercicio.find()
        res.json(ejercicios)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})
//Getting One
router.get('/:id', getEjercicio, (req,res) =>{
    res.json(res.ejercicio)
})
// Creating one
router.post('/',async (req,res) =>{
    const ejercicio = new Ejercicio({
        nombre: req.body.nombre,
        imagen: req.body.imagen,
        tipoDeTrabajo: req.body.tipoDeTrabajo,
        tipoDeEjercicio: req.body.tipoDeEjercicio,
        grupoMuscular: req.body.grupoMuscular,
        dificultad: req.body.dificultad,
        riesgoDeLesion: req.body.riesgoDeLesion
    })
    try {
        const newEjercicio = await ejercicio.save()
        res.status(201).json(newEjercicio)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})
// Updating one
router.patch('/:id',getEjercicio, async (req,res) =>{
    if (req.body.nombre != null){
        res.ejercicio.nombre = req.body.nombre
    }
    if(req.body.imagen != null){
        res.ejercicio.imagen = req.body.imagen
    }
    if(req.body.tipoDeTrabajo != null){
        res.ejercicio.tipoDeTrabajo = req.body.tipoDeTrabajo
    }
    if(req.body.tipoDeEjercicio != null){
        res.ejercicio.tipoDeEjercicio = req.body.tipoDeEjercicio
    }
    if(req.body.grupoMuscular != null){
        res.ejercicio.grupoMuscular = req.body.grupoMuscular
    }
    if(req.body.dificultad != null){
        res.ejercicio.dificultad = req.body.dificultad
    }
    if(req.body.riesgoDeLesion != null){
        res.ejercicio.riesgoDeLesion = req.body.riesgoDeLesion
    }
    try {
        const updatedEjercicio = await res.ejercicio.save()
        res.json(updatedEjercicio)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})
//Deleting one
router.delete('/:id',getEjercicio, async (req,res) =>{
    try{
        await res.ejercicio.deleteOne()
        res.json({message: 'Eliminar ejercicio'})
    }catch (err){
        res.status(500).json({message: err.message})
    }
})

async function getEjercicio(req,res,next){
    let ejercicio
    try {
        ejercicio = await Ejercicio.findById(req.params.id)
        if(ejercicio == null){
            return res.status(404).json({message: 'No se encontro el ejercicio'})
        }
    } catch (err) {
        return res.status(500).json({message:err.message})
    }

    res.ejercicio = ejercicio
    next()
}

module.exports = router 