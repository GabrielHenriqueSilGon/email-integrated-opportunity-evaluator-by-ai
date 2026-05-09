import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import evaluationRoutes
from "./routes/evaluation.routes.js";

import opportunityRoutes from "./routes/opportunity.routes.js";

console.log("SERVER INICIOU");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/opportunities", opportunityRoutes);

app.use("/api/evaluation", evaluationRoutes);

app.listen(5000, () => {
  console.log("Server running on 5000");
});