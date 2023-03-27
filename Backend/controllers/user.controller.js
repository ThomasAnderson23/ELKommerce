const User = require("../models/User");

const createUser = async (req, res) => {
  try {
    //Verificar EMAIL en uso

    const user = await User.findOne({ email: req.body.email });

    if (user) {
      throw new Error("Email in use!!");
    }

    //Encriptar Contraseña creada por el usuario
    //const salt = crypto.randomBytes(10).toString('hex');
    //const hash = crypto.pbkdf2Sync(req.body.password, salt, 5000, 10, 'sha512').toString('hex');
    //Guardar info en nuestra base de datos
    const newUser = new User(req.body);
    newUser.hashPassword(req.body.password);

    await newUser.save(); //Guarda la info en Mongo Atlas

    res.json({
      success: true,
      msg: "User created successfully!",
      id: newUser._id,
      token: newUser.generateToken(),
    });
  } catch (error) {
    res.json({ success: false, msg: error.msg });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("favoriteProducts");
    res.json({ success: true, users });
  } catch (error) {
    res.json({ success: false, msg: error.msg });
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

    res.json({ success: true, msg: "Usuario Eliminado" });
  } catch (error) {
    res.json({ success: false, msg: error.msg });
  }
};

const editUser = async (req, res) => {
  try {

    const authId = req.auth.id;

    console.log("authId ", authId);
    console.log(req.auth.email);

    const user = await User.findOne({ email: req.body.email });

    if (user = req.auth.email ) {
      throw new Error("Email in use!!");
    }

    const result = await User.findByIdAndUpdate(authId, req.body, {
      new: true,
    });


    if (!result) {
      throw new Error("User does not exist. Impossible to edit");
    }
    res.json({ success: true, msg: "User succesfully edited!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.msg });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("llego")

    const user = await User.findOne({ email });

    if (!user) {


      throw new Error("User not registered");

    }
    const validate = user.hashValidation(password, user.salt, user.password);

    if (!validate) {
      throw new Error("Wrong Credentials");
    }

    // const hash = crypto.pbkdf2Sync(password, user.salt, 5000, 10, 'sha512').toString('hex')
    //if(user.password !== hash) {
    //throw new Error('Wrong Password')
    //}

    res.json({
      success: true,
      msg: "You have succesfully logged in",
      token: user.generateToken(),
    });
  } catch (error) {
    res.json({ success: false, msg: error.message });
  }
};

module.exports = { createUser, getUsers, deleteUser, editUser, signIn };
