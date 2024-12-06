// src/components/ErrorsHeader.tsx

import React, { useState, useEffect } from "react";
import { ResponsiveContainer, LineChart, XAxis, YAxis, Tooltip, Line } from "recharts";
import { useCookies } from "react-cookie";

interface RawInteraction {
  timestamp: string;
  action: string;
  id: number;
  username: string;
}

interface InteractionData {
  timestamp: string;
  count: number;
}

const ErrorsHeader: React.FC = () => {
  const [data, setData] = useState<InteractionData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    let isMounted = true; // To prevent state updates if component is unmounted

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_STATS_REMOTE_URL}/interactions`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookies.token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Erreur HTTP! statut: ${response.status}`);
        }

        const result: RawInteraction[] = await response.json();

        // Agréger les données par minute
        const aggregatedData: { [key: string]: number } = {};

        result.forEach((item) => {
          // Extraire l'heure et la minute
          const date = new Date(item.timestamp);
          const key = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

          if (aggregatedData[key]) {
            aggregatedData[key] += 1;
          } else {
            aggregatedData[key] = 1;
          }
        });

        // Convertir l'objet agrégé en tableau
        const formattedData: InteractionData[] = Object.keys(aggregatedData).map((key) => ({
          timestamp: key,
          count: aggregatedData[key],
        })).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

        if (isMounted) {
          setData(formattedData);
        }
      } catch (error: unknown) {
        console.error("Erreur lors de la récupération des données:", error);
        if (isMounted) {
          setError(error instanceof Error ? error.message : "Erreur inconnue");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup function to set isMounted to false if the component unmounts
    return () => {
      isMounted = false;
    };
  }, [cookies.token]);

  if (loading) {
    return <div>Chargement des données...</div>;
  }

  if (error) {
    return <div className="text-red-500">Erreur: {error}</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="timestamp" tick={{ fontSize: 10 }} />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Line type="monotone" dataKey="count" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ErrorsHeader;
