import { useEffect, useState }
from "react";

import axios from "axios";

import {
  Link
} from "react-router-dom";

export default function DashboardPage() {

  const [opportunities, setOpportunities] =
    useState([]);

  useEffect(() => {

    async function loadData() {

      try {

        const response =
          await axios.get(
            "http://localhost:5000/api/opportunities"
          );

        setOpportunities(response.data);

      } catch (error) {

        console.error(error);
      }
    }

    loadData();

  }, []);

  return (

    <div style={{
      minHeight: "100vh",
      background: "#111827",
      padding: 40,
      color: "white",
      fontFamily: "Arial"
    }}>

      <h1 style={{
        marginBottom: 30,
        fontSize: 32
      }}>
        Dashboard BPA Ventures
      </h1>

      <table
        border="1"
        cellPadding="12"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#1f2937"
        }}
      >

        <thead>

          <tr style={{
            background: "#374151"
          }}>

            <th>Nome</th>

            <th>Email</th>

            <th>Score</th>

            <th>Status</th>

            <th>Veredito IA</th>

          </tr>

        </thead>

        <tbody>

          {opportunities.map((item) => (

            <tr key={item.id}>

              <td>

                <Link
                  to={`/opportunity/${item.id}`}
                  style={{
                    color: "#60a5fa",
                    textDecoration: "none",
                    fontWeight: "bold"
                  }}
                >

                  {item.fullName}

                </Link>

              </td>

              <td>
                {item.email}
              </td>

              <td>
                {item.score ?? "-"}
              </td>

              {/* STATUS HUMANO */}

              <td>

                <span style={{

                  padding: "6px 12px",

                  borderRadius: 8,

                  fontWeight: "bold",

                  background:

                    item.status === "APPROVED"
                    ? "green"

                    : item.status === "REJECTED"
                    ? "red"

                    : "orange"

                }}>

                  {item.status}

                </span>

              </td>

              {/* VEREDITO IA */}

              <td>

                <span style={{

                  padding: "6px 12px",

                  borderRadius: 8,

                  fontWeight: "bold",

                  background:

                    item.verdict === "AVANÇAR"
                    ? "#16a34a"

                    : item.verdict === "APROFUNDAR"
                    ? "#ca8a04"

                    : "#dc2626"

                }}>

                  {item.verdict ?? "N/A"}

                </span>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}