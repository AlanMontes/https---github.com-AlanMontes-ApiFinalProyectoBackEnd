require('dotenv').config()

const express = require('express')
const cors = require('cors');
const app = express()

const multer = require('multer');
const path = require('path');

app.use(cors());
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const ejerciciosRouter = require('./routes/ejercicios')
// const subscribersRouter = require('./routes/subscribers')
app.use('/ejercicios',ejerciciosRouter)
// app.use('/subscribers',subscribersRouter)


const storage = multer.diskStorage({
    destination: './imagenes/',
    filename: function (req, file, callback) {
      const nombreArchivo = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
      callback(null, nombreArchivo);
    }
  });

  const upload = multer({ storage: storage });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.post('/subirImagen', upload.single('miImagen'), (req, res) => {
    if (req.file) {
      const nombreArchivoSubido = req.file.filename;
      res.json({ nombreArchivo: nombreArchivoSubido });
    } else {
      res.status(400).send('Error al subir la imagen');
    }
  });

app.listen(3000, () => console.log('Server Started'))