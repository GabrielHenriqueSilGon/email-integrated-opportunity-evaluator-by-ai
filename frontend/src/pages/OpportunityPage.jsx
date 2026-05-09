import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router-dom";

import axios from "axios";

export default function OpportunityPage() {

  const { id } = useParams();

  const [data, setData] =
    useState(null);

  useEffect(() => {

    async function loadData() {

      const response =
        await axios.get(
          `http://localhost:5000/api/opportunities/${id}`
        );

      setData(response.data);
    }

    loadData();

  }, []);

  if (!data) {
    return <h1>Carregando...</h1>;
  }

  return (

    <div style={{
      padding: 40,
      color: "white"
    }}>

      <h1>
        {data.fullName}
      </h1>

      <h2>
        Veredito: {data.verdict}
      </h2>

      <h3>
        Score: {data.score}
      </h3>

      <pre style={{
        whiteSpace: "pre-wrap"
      }}>

        {data.analysis}

      </pre>

    </div>
  );
}