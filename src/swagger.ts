// src/swagger.ts
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const PORT = process.env.PORT || 3000;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Condelivery',
      version: '1.0.0',
      description: 'Documentação da API de Gerenciamento de entragas em condomínios',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export function swaggerDocs(app: Express, port: number) {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      swaggerOptions: {
        tagsSorter: (a: string, b: string) => {
          const order = ['Login', 'Condomínios', 'Moradores', 'Pedidos'];
          return order.indexOf(a) - order.indexOf(b);
        },
        operationsSorter: 'alpha',
      },
    }),
  );
  console.log(`📘 Swagger rodando em: http://localhost:${port}/api-docs`);
}
