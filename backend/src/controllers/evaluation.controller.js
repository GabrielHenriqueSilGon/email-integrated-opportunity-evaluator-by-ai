import { PrismaClient }
from "@prisma/client";

import {
  sendFinalEmail
} from "../services/email.service.js";

const prisma = new PrismaClient();

export async function approveOpportunity(req, res) {

  try {

    const opportunity =
      await prisma.opportunity.update({

        where: {
          id: req.params.id
        },

        data: {
          status: "APPROVED"
        },

        select: {
          id: true,
          email: true,
          status: true,
          score: true
        }
      });

    console.log(opportunity);

    await sendFinalEmail(opportunity);

    return res.send(
      "Oportunidade aprovada"
    );

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Erro ao aprovar"
    });
  }
}

export async function rejectOpportunity(req, res) {

  try {

    const opportunity =
      await prisma.opportunity.update({

        where: {
          id: req.params.id
        },

        data: {
          status: "REJECTED"
        },

        select: {
          id: true,
          email: true,
          status: true,
          score: true
        }
      });

    console.log(opportunity);

    await sendFinalEmail(opportunity);

    return res.send(
      "Oportunidade reprovada"
    );

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Erro ao reprovar"
    });
  }
}