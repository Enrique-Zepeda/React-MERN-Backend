const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email }); //Validar personalizada(si no existe el correo retorna null)

    if (usuario) {
      // si ya existe el correo del usuario
      return res.status(400).json({
        ok: false,
        msg: "Un usuario existe con ese correo",
      });
    }

    usuario = new Usuario(req.body);

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();
    // Generar JWT
    const token = await generarJWT(usuario.id, usuario.name);

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Porfavor hable con el administrador",
    });
  }
};

const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Correo o Contraseña no valido",
      });
    }

    // Confirmar las contraseñas
    const validPassword = bcrypt.compareSync(password, usuario.password);

    if (!validPassword) {
      res.status(400).json({
        ok: false,
        msg: "Contraseña incorrecta",
      });
    }

    // Generar JWT
    const token = await generarJWT(usuario.id, usuario.name);

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Porfavor hable con el administrador",
    });
  }
};

const revalidarToken = async (req, res = response) => {
  const uid = req.uid;
  const name = req.name;

  //Generar new JWT
  const token = await generarJWT(uid, name);

  res.json({
    ok: true,
    token,
  });
};

module.exports = { crearUsuario, loginUsuario, revalidarToken };
