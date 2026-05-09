import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,

  port: process.env.MAIL_PORT,

  secure: false,

  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

export async function sendEvaluationEmail(opportunity) {

  const approveUrl =
    `http://localhost:5000/api/evaluation/${opportunity.id}/approve`;

  const rejectUrl =
    `http://localhost:5000/api/evaluation/${opportunity.id}/reject`;

    console.log("EMAIL:", process.env.EVALUATOR_EMAIL);

  await transporter.sendMail({

    from: process.env.MAIL_USER,

    to: process.env.EVALUATOR_EMAIL,

    subject: "Nova oportunidade recebida",

    html: `
      <h2>Nova oportunidade</h2>

      <p><strong>Nome:</strong> ${opportunity.fullName}</p>

      <p><strong>Email:</strong> ${opportunity.email}</p>

      <p><strong>Telefone:</strong> ${opportunity.phone}</p>

      <p><strong>Score:</strong> ${opportunity.score}</p>

      <pre>${opportunity.analysis}</pre>

      <br />

      <a href="${approveUrl}">
        Aprovar
      </a>

      <br /><br />

      <a href="${rejectUrl}">
        Reprovar
      </a>
    `
  });
}

export async function sendFinalEmail(opportunity) {

  console.log(
    "EMAIL FINAL:",
    opportunity.email
  );

  const approved =
    opportunity.status === "APPROVED";

  await transporter.sendMail({

    from: process.env.MAIL_USER,

    to: opportunity.email,

    subject: approved
      ? "Oportunidade aprovada"
      : "Oportunidade reprovada",

    html: `
      <h2>
        ${
          approved
            ? "Sua oportunidade foi aprovada!"
            : "Sua oportunidade foi reprovada."
        }
      </h2>

      <p>Status: ${opportunity.status}</p>

      <p>Score: ${opportunity.score}</p>
    `
  });
}