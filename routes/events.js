/*
Rutas de usuarios / Auth
host + /api/events
localhost:4000/api/events
*/

const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");
const { check } = require("express-validator");
const {
  getEventos,
  crearEvento,
  actualizarEvento,
  borrarEvento,
} = require("../controllers/events");
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require("../helpers/isDate");

const router = Router();
// Validadas por el token JWT
// con esto quiere decir que todas las que esten abajo van a tener el middleware de validar token
router.use(validarJWT);

// Obtener Evento
router.get(
  "/",

  getEventos
);

// Craer Evento
router.post(
  "/",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio obligatoria").custom(isDate),
    check("end", "Fecha de finalizacion obligatoria").custom(isDate),

    validarCampos,
  ],
  crearEvento
);

// Actualizar Evento
router.put(
  "/:id",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio obligatoria").custom(isDate),
    check("end", "Fecha de finalizacion obligatoria").custom(isDate),

    validarCampos,
  ],
  actualizarEvento
);

// Borrar Evento
router.delete("/:id", borrarEvento);

module.exports = router;
