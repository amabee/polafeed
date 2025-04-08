import express from "express";
import dotenv from "dotenv";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express';
import userRoutes from './routes/users.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PolaFeed API",
      version: "1.0.0",
      description:
        "The PolaFeed API allows users to interact with posts, users, and other social media features.",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ["src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.send("📸 Welcome to PolaFeed API!");
});

app.use('/api/users', userRoutes)


app.listen(PORT, () => {
  console.log(`🚀 PolaFeed server running at http://localhost:${PORT}`);
});
