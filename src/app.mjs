import express, { json } from "express";
import helmet from "helmet";
import cors from "cors";
import rootRoutes from "./routes/index.js";
import dotenv from 'dotenv';
const app = express();
dotenv.config();


app.use(json());
app.use(cors());
app.use(helmet());
app.use("/api", rootRoutes);

export default app;
