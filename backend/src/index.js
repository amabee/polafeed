import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import swaggerSetup from "./swagger.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

swaggerSetup(app);

app.get("/", (req, res) => {
  res.send("📸 Welcome to PolaFeed API!");
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`🚀 PolaFeed server running at http://localhost:${PORT}`);
});
