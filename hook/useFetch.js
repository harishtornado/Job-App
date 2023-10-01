import { useState, useEffect } from "react";

import axios from "axios";
// import RAPID_API_KEY from '@env';

// const rapidApiKey = RAPID_API_KEY;

const useFetch = (endpoint, query) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      "X-RapidAPI-Key": "cfa1ea4f98msh27cf25c1220ca8dp162116jsnc19a86911fa9",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: {
      ...query,
    },
  };
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.request(options);
      setData((prev) => {
        return { ...prev, ...response.data };
      });
      setIsLoading(false);
    } catch (err) {
      setError(err);
      console.log(err);
      alert("There was an error fetching");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };
  return { data, isLoading, error, refetch };
};

export default useFetch;
