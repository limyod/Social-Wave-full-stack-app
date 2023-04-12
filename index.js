import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";
import authRoutes from "./routes/auth.js";

/** configuration */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"))
app.use(cors())
app.use("/assets", express.static(path.join(__dirname, 'public/assets')))

// File Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "public/assets");
    },
    filename : function(req, file, cb){
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });
/* Routes */
//upload single requires the register route to be separate from the rest of the auth routes
app.post("/auth/register", upload.single("picture"), register);
/* Routes */
app.use("/auth", authRoutes);



/* Mongoose Setup */

const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    app.listen(PORT, ()=> console.log(`server port: ${PORT}`));
}).catch((error)=>{
    console.log(`${error} did not connect`);
})





