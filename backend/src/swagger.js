import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PolaFeed API",
      version: "1.0.0",
      description:
        "This is the API documentation for PolaFeed, a social media platform.",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}/api/`,
      },
    ],
  },

  apis: ["./src/routes/*.js", './src/swaggerDoc/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
