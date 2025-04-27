const moment = require("moment");

// Para ver lo que podemos desestructurar(isDate = (value, { req, location, path }))
// console.log(value);
// console.log(req, location, path);
const isDate = (value) => {
  if (!value) return false;

  const fecha = moment(value);
  if (fecha.isValid()) {
    return true;
  } else {
    return false;
  }
};

module.exports = { isDate };
