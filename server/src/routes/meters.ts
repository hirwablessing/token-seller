import { Request, Response } from "express";
import { isMeterNumberValid, responseMessage } from "../utils/libs";
import prisma from "../client";

export async function getAllMeters(req: Request, res: Response) {
  let meters = await prisma.meter.findMany();

  return res.send(meters);
}

export async function findByMeterNumber(req: Request, res: Response) {
  const { meter_nmber } = req.params;
  if (!isMeterNumberValid(meter_nmber))
    return res.status(400).send(responseMessage("You have 0 days, buy now!"));

  let meter = await prisma.meter.findFirst({
    where: {
      number: meter_nmber,
    },
  });

  if (!prisma)
    return res.status(400).send(responseMessage("You have 0 days, buy now!"));

  return meter;
}
