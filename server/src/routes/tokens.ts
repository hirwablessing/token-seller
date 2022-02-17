import { Request, response, Response } from "express";

import {
  isAmountValid,
  isMeterNumberValid,
  isTokenValid,
  responseMessage,
} from "../utils/libs";
import prisma from "../client";

export async function getAllTokens(req: Request, res: Response) {
  let tokens = await prisma.tsellerToken.findMany();

  return res.send(responseMessage("Success", tokens));
}

export async function buyToken(req: Request, res: Response) {
  const bodyData = req.body;

  if (!isMeterNumberValid(bodyData.meter_number))
    return res
      .status(400)
      .send(responseMessage("invalid meter, only 6 digits accepted"));

  if (!isAmountValid(bodyData.amount))
    return res
      .status(400)
      .send(
        responseMessage(
          "invalid amount, only multiples of 100 not greater than 182,500 is accepted"
        )
      );

  let meter = await prisma.meter.findFirst({
    where: {
      number: bodyData.meter_number,
    },
  });

  if (!meter)
    meter = await prisma.meter.create({
      data: {
        number: bodyData.meter_number,
        days: 0,
      },
    });

  let token = prisma.tsellerToken.create({
    data: {
      days: bodyData.amount / 100,
      meterId: meter.id,
      status: "VALID",
      token: await generateToken(),
    },
  });

  return res.status(201).send(responseMessage("Created", token));
}

export async function loadToken(req: Request, res: Response) {
  const bodyData = req.body;

  if (!isTokenValid(bodyData.token))
    return res.status(400).send(responseMessage("Invalid token"));

  let token = await prisma.tsellerToken.findFirst({
    where: {
      token: bodyData.token,
    },
  });

  if (!token) return res.status(400).send(responseMessage("Unknown token"));

  let meter = await prisma.meter.findFirst({
    where: {
      id: token.meterId,
    },
  });

  if (!meter) return res.status(400).send(responseMessage("Unknown token"));

  if (token.status == "USED")
    return res.status(400).send(responseMessage("Token is used already"));

  token.status = "USED";

  await prisma.tsellerToken.update({
    where: {
      id: token.id,
    },
    data: token,
  });

  await prisma.meter.update({
    where: {
      id: token.meterId,
    },
    data: { ...meter, days: meter?.days + token.days },
  });

  return res.send(responseMessage("Loaded", { token, meter }));
}

async function generateToken(): Promise<string> {
  let token = 10000000;

  do {
    token = Math.floor(Math.random() * (999 - 100)) + 10000000;

    var isCreated = await prisma.tsellerToken.findFirst({
      where: {
        token: token.toString(),
      },
    });
  } while (!isCreated);

  return token.toString();
}
