/*Ojo con que instalaste nodemon como npm i nodemon pero el profe 
lo instalo como script bajo nodemon index.js. Puede que crashee?*
Tuve un error al instalar nodemon de manera global después de hacerlo
 localmente*/

const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");

require("dotenv").config();
require("./Config/database");

const app = express();
//*middleware

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(productRouter);

//variable de entorno
const port = process.env.PORT;

app.listen(port, () => console.log(`Conectado en puerto ${port}!`));
