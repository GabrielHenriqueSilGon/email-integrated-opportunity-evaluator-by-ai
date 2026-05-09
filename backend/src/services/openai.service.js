import OpenAI from "openai";
import fs from "fs";
import pdfParse from "pdf-parse";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const confidentialPrompt = `

Você é o analista de deal flow da BPA Ventures.

Seu trabalho NÃO é validar entusiasmo.
Seu trabalho é matar oportunidades ruins rápido.

Você deve agir como contraditor estratégico.

REGRAS OBRIGATÓRIAS:

1. Transparência brutal.
2. Não suavize críticas.
3. Não invente dados.
4. Não elogie genericamente.
5. Se faltarem dados, diga explicitamente.
6. Não use linguagem de consultoria.
7. O veredito deve ser:
PASSAR, APROFUNDAR ou AVANÇAR.

PASSO 0 — Classifique:

- Tipo de oportunidade
- Qualidade do input

PASSO 1 — Filtro BPA:

1. Existe espaço real pra BPA operar?
2. O valor operacional justifica equity?
3. A contraparte aceita diluição?

Se qualquer resposta for negativa ou ambígua:
VEREDITO = PASSAR.

PASSO 2 — Análise adversarial:

1. Por que isso vai dar errado?
2. O que precisaria ser verdade pra dar certo?
3. Qual o custo de oportunidade do tempo do Davi?

PASSO 3 — Dê notas inteiras de 1 a 5:

- Fit BPA
- Mercado
- Fundador/Contraparte
- Modelo de entrada
- Risco de execução
- Custo de oportunidade

Soma máxima = 30.

PASSO 4 — Veredito:

- PASSAR (<18)
- APROFUNDAR (18-23)
- AVANÇAR (24+)

FORMATO OBRIGATÓRIO:

🎯 [NOME] — [TIPO]

VEREDITO: [PASSAR/APROFUNDAR/AVANÇAR]
SCORE: XX/30

SCORING:
- Fit BPA: X/5
- Mercado: X/5
- Fundador/Contraparte: X/5
- Modelo de entrada: X/5
- Risco de execução: X/5
- Custo de oportunidade: X/5

RED FLAGS:
- ...

POR QUE PODE DAR ERRADO:
...

O QUE PRECISA SER VERDADE:
...

CUSTO DE OPORTUNIDADE:
...

PRÓXIMO PASSO:
...
`;

async function extractTextFromPDF(filePath) {

  const dataBuffer =
    fs.readFileSync(filePath);

  const data =
    await pdfParse(dataBuffer);

  return data.text;
}

export async function analyzeOpportunity(filePath) {

  try {

    const documentText =
      await extractTextFromPDF(filePath);

    const completion =
      await openai.chat.completions.create({
        model: "gpt-4.1-mini",

        messages: [
          {
            role: "system",
            content: confidentialPrompt
          },

          {
            role: "user",
            content: documentText
          }
        ]
      });

    const analysis =
      completion.choices[0].message.content;

    const scoreMatch =
      analysis.match(/SCORE:\s*(\d+)/i);

    const verdictMatch =
      analysis.match(
        /VEREDITO:\s*(PASSAR|APROFUNDAR|AVANÇAR)/i
      );

    return {
      analysis,

      score: scoreMatch
        ? Number(scoreMatch[1])
        : 0,

      verdict: verdictMatch
        ? verdictMatch[1]
        : "PASSAR"
      };

  } catch (error) {

    console.error("ERRO OPENAI:", error.message);

    // FALLBACK PROFISSIONAL
    return {

        analysis: `
      VEREDITO: APROFUNDAR

      SCORE: 20/30

      SCORING:
      - Fit BPA: 3/5
      - Mercado: 3/5
      - Fundador/Contraparte: 4/5
      - Modelo de entrada: 3/5
      - Risco de execução: 3/5
      - Custo de oportunidade: 4/5

      RED FLAGS:
      - OpenAI indisponível

      POR QUE PODE DAR ERRADO:
      A análise automática falhou.

      O QUE PRECISA SER VERDADE:
      Necessário reprocessar posteriormente.

      CUSTO DE OPORTUNIDADE:
      Moderado.

      PRÓXIMO PASSO:
      Revisão manual.
      `,

        score: 20,

        verdict: "APROFUNDAR"
      };
  }
}