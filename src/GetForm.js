import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const GetForm = (props) => {
  const [Data, setData] = useState();

  const getAllData = () => {
    axios
      .get("http://localhost:8080/api/person")
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(getAllData, []);

  return (
    <>
      <h1>All the entries</h1>

      <ul>
        {Data?.map((data) => {
            return(
                <li key={data._id}>
                    <h4>{data.name}</h4>
                    <p>{data.gender}</p>
                    <p>{data.country}</p>
                    <p>{data.email}</p>
                    <p>{data.visitedPlaces}</p>


                </li>
            )
        })}
      </ul>
    </>
  );
};

export default GetForm; // eslint-disable-line
