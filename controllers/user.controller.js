const User = require("../models/User");
const crypto = require("crypto");

const createUser = async (req, res) => {
  try {
    //Verificar EMAIL en uso

    const user = await User.findOne({ email: req.body.email });

    if (user) {
      throw new Error("Email in use!!");
    }

    //Encriptar Contraseña creada por el usuario
    const salt = crypto.randomBytes(10).toString('hex');
    const hash = crypto.pbkdf2Sync(req.body.password, salt, 5000, 10, 'sha512').toString('hex');
    console.log(hash);
    //Guardar info en nuestra base de datos
    const newUser = new User({...req.body, password: hash});
    console.log(newUser)
    await newUser.save(); //Guarda la info en Mongo Atlas

    res.json({
      success: true,
      message: "User created successfully!",
      id: newUser._id,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("favoriteProducts");
    res.json({ success: true, users });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const result = await User.findByIdAndDelete(id);

    if (!result) {
      throw new Error("Usuario no existe, imposible de eliminar!");
    }

    res.json({ success: true, message: "Usuario Eliminado" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findByIdAndUpdate(id, req.body, { new: true });
    console.log(result);
    if (!result) {
      throw new Error("Usuario no existe, imposible de editar!");
    }
    res.json({ success: true, message: "Usuario editado con éxito!" });
  } catch (error) {
    res.json({ success: true, message: "Usuario Eliminado" });
  }
};

module.exports = { createUser, getUsers, deleteUser, editUser };
