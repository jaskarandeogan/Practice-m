import { set } from "mongoose";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Postform = (props) => {
  const [input, setInput] = useState({
    name: " ",
    gender: " ",
    country: "India",
    email: " ",
    visitedPlaces: [],
  });

  const handleChange = (event) => {
    // console.log(event.target);
    const { name, value } = event.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  };

  const handleSubmit = (event) => {
    // event.preventDefault();
    console.log(input);

    const newPerson = {
      name: input.name,
      gender: input.gender,
      country: input.country,
      email: input.email,
      visitedPlaces: input.visitedPlaces
    };
    axios
      .post("http://localhost:8080/api/person", newPerson)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <form >
        <div>
          <label htmlFor="name">Name : </label>
          <input
            type="text"
            name="name"
            id="name"
            value={input.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="gender">Gender : </label>
          <input
            type="radio"
            name="gender"
            id="gender"
            value="Male"
            onChange={handleChange}
          />{" "}
          Male
          <input
            type="radio"
            name="gender"
            id="gender"
            value="Female"
            onChange={handleChange}
          />{" "}
          Female
        </div>
        <div>
          <label>Country of residence : </label>
          <select name="country" id="country" onChange={handleChange}>
            <option value="India">India</option>
            <option value="Canada">Canada</option>
            <option value="US">The US</option>
          </select>
        </div>
        <div>
          <label htmlFor="Email">Email : </label>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={handleChange}
            id="email"
          />
        </div>
        <div>
          <label htmlFor="visited">Place visited :</label>
          <input
            type="checkbox"
            value="Lynn"
            name="visitedPlaces"
            id="visited"
            onChange={handleChange}
          />{" "}
          Lynn
          <input
            type="checkbox"
            value="Stanley"
            name="visitedPlaces"
            id="visited"
            onChange={handleChange}
          />{" "}
          Stanley
          <input
            type="checkbox"
            value="English Bay"
            name="visitedPlaces"
            id="visited"
            onChange={handleChange}
          />{" "}
          English Bay
        </div>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </>
  );
};
export default Postform;
