const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./.env.local" });

mongoose.connect(process.env.DATABASE).then((con) => {});

const port = 3000;
app.listen(port, () => console.log("app running"));
