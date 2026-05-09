import { useState } from "react";

import { api } from "../services/api";

function SubmitPage() {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [document, setDocument] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("document", document);

    await api.post("/opportunities", formData);

    alert("Enviado com sucesso");
  }

  return (
    <div style={{
      padding: 40
    }}>
      <h1>Enviar oportunidade</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Nome"
          onChange={(e) => setFullName(e.target.value)}
        />

        <br /><br />

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="text"
          placeholder="Telefone"
          onChange={(e) => setPhone(e.target.value)}
        />

        <br /><br />

        <input
          type="file"
          onChange={(e) => setDocument(e.target.files[0])}
        />

        <br /><br />

        <button type="submit">
          Enviar
        </button>

      </form>
    </div>
  );
}

export default SubmitPage;