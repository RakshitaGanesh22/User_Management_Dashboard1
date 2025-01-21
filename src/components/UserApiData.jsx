import React, { useEffect, useContext } from "react";
import axios from "axios";
import { Context } from "./contextProvider";
export default function UserApiData() {
  const { setData, setLoading } = useContext(Context);
  useEffect(() => {
    let url = "https://jsonplaceholder.typicode.com/users";
    async function fetchData() {
      try {
        setLoading(true);
        const response = await axios.get(url);
        console.log(response.data);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        alert("facing Error in fetching the data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
}
