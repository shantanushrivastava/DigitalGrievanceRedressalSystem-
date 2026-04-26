import { useState } from "react";
import { getMyGrievances } from "../api/grievanceApi";

export const useGrievance = () => {
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMyGrievances = async () => {
    setLoading(true);
    try {
      const res = await getMyGrievances();
      setGrievances(res.data);
    } finally {
      setLoading(false);
    }
  };

  return { grievances, loading, fetchMyGrievances };
};
