const { matchedData } = require("express-validator");
const { encrypt, compare } = require("../utils/handlePassword");
const { tokenSign } = require("../utils/handleJwt");
const { handleHttpError } = require("../utils/handleError");
const { usersModel } = require("../models");

//Controlador para registrar usuario
  const registerCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const userpassword = await encrypt(req.userpassword);
    const body = { ...req, userpassword };
    
    try {
      const dataUser = await usersModel.create(body); // Intenta crear un usuario en la BD
      dataUser.set("userpassword", undefined, { strict: false }); // Oculta la contraseña

      const data = {
        token: await tokenSign(dataUser),
        user: dataUser, 
      };

      res.send({ data });
    } catch (error) {
      if (error.code === 11000) {
        // Código 11000 indica un error de duplicado (clave única)
        handleHttpError(res,"DUPLICATE_USER");
      } else {
        // Otro tipo de error
        handleHttpError(res,"ERROR_REGISTER_USER");
      }
    }
  } catch (e) {
    handleHttpError(res,"ERROR_REGISTER_USER");
  }

};  





//
const loginCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const user = await usersModel
      .findOne({ useremail: req.useremail }).select('username useremail userpassword userroles')
  
    if (!user) {
      handleHttpError(res, "USER_NOT_EXISTS", 404);
      return;
    }
    const hashPassword = user.get("userpassword");
    const check = await compare(req.userpassword, hashPassword);

    if (!check) {
      handleHttpError(res, "PÁSSWORD_INVALID", 401);
      return;
    }
    user.set("userpassword", undefined, { strict: false });
    const data = {
      token: await tokenSign(user),
      user:{
        _id: user._id,
        username: user.username,
        useremail: user.useremail,
        userestado: user.userestado,
        userroles: user.userroles,
      },
    };
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_LOGIN_USER");
  }
};

module.exports = { registerCtrl, loginCtrl };
