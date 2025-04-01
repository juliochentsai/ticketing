import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@jc-tickets/common";
import { createChargeRouter } from "./routes/new";

const app = express();
app.set("trust proxy", true); //still trust nginx.ingress

app.use(json());
app.use(
  cookieSession({
    signed: false, //do not encrypt
    secure: process.env.NODE_ENV !== "test", //https only
  })
);

app.use(currentUser);
app.use(createChargeRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);
export { app };
