const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Ruta para mostrar el formulario de contacto
router.get('/contact', (req, res) => {
  res.locals.title = 'Formulario de contacto';
  res.render('contact');
});

// Ruta para enviar el correo
router.post('/send-email', (req, res) => {
  const { name, email, phone, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: '__servidor__smpt_correo',// modificar el servidor de correo saliente
    port: 25, // modificar el puerto del correo saliente
    secure: false, // true para 465, false para otros puertos
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, 
    },
    tls: {
      rejectUnauthorized: false,
    }
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_DESTINO,
    subject: 'Formulario de Contacto',
    text: `Nombre: ${name}\nEmail: ${email}\nTeléfono: ${phone}\nMensaje: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      req.flash('msg', 'Error al enviar el mensaje. Inténtalo de nuevo más tarde.');
      req.flash('msgType', 'alert-danger');
      res.redirect('/contact');
    } else {
      console.log('Email sent: ' + info.response);
      req.flash('msg', 'Mensaje enviado con éxito!');
      req.flash('msgType', 'alert-success');
      res.redirect('/contact');
    }
  });
});

module.exports = router;
