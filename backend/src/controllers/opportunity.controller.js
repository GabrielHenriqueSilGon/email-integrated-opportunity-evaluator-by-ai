import { PrismaClient } from "@prisma/client";

import {
  analyzeOpportunity
} from "../services/openai.service.js";

import {
  sendEvaluationEmail
} from "../services/email.service.js";

const prisma = new PrismaClient();

export async function createOpportunity(req, res) {

  try {

    const {
      fullName,
      email,
      phone
    } = req.body;

    const file = req.file;

    if (!file) {

      return res.status(400).json({
        error: "PDF obrigatório"
      });
    }

    // ANALISA PDF COM IA
    const result =
      await analyzeOpportunity(file.path);

    // SALVA NO BANCO
    const opportunity =
      await prisma.opportunity.create({
        data: {
          fullName,
          email,
          phone,
          documentPath: file.path,
          analysis: result.analysis,
          score: result.score,
          verdict: result.verdict
        }
              });

    await sendEvaluationEmail(opportunity);
    return res.status(201).json(opportunity);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Erro interno"
    });
  }
}

export async function getOpportunity(req, res) {

  try {

    const opportunity =
      await prisma.opportunity.findUnique({
        where: {
          id: req.params.id
        }
      });

    return res.json(opportunity);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Erro interno"
    });
  }
}

export async function listOpportunities(req, res) {

  try {

    const opportunities =
      await prisma.opportunity.findMany({

        orderBy: {
          createdAt: "desc"
        }
      });

    return res.json(opportunities);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Erro ao listar"
    });
  }
}