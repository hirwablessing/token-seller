import { Express, Request, Response } from "express";
import { findByMeterNumber, getAllMeters } from "./meters";
import { buyToken, getAllTokens, loadToken } from "./tokens";

export default function routes(app: Express) {
  app.get("/", (req: Request, res: Response) => res.sendStatus(200));

  app.get("/api/tokens", (req, res) => getAllTokens(req, res));
  app.get("/api/meters/getBynumber/{number}", (req, res) =>
    findByMeterNumber(req, res)
  );

  app.get("/api/meters", (req, res) => getAllMeters(req, res));
  app.get("/api/token/buy", (req, res) => buyToken(req, res));
  app.get("/api/token/load", (req, res) => loadToken(req, res));
}
