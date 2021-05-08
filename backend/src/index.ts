import "reflect-metadata";
import { createConnection } from "typeorm";
import express, { Application } from 'express';
import http = require('http');
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import swaggerUi from "swagger-ui-express";
import { Server, Socket } from 'socket.io';

import Router from "./routes";
import dbConfig from "./config/database";

const PORT = process.env.PORT || 4000;

const app: Application = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL!,
    methods: ["GET", "POST"]
  }
});

app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL!,
  credentials: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));

app.use(
  "/swagger",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

app.use(Router);

io.on('connection', (socket: Socket) => {
  console.log('connection');
  const id = socket.handshake.query.id;
  socket.join(id!);

  socket.on('send-message', ({ recipients, text }) => {
    recipients.forEach((recipient: any) => {
      const newRecipients = recipients.filter((r: any) => r !== recipient);
      newRecipients.push(id);
      socket.broadcast.to(recipient).emit('receive-message', {
        recipients: newRecipients, sender: id, text
      });
    });
  });
});

createConnection(dbConfig)
  .then((_connection) => {
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Unable to connect to db", err);
    process.exit(1);
  })