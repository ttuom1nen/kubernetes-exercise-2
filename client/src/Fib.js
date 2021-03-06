import React, { useState, useEffect } from "react";
import axios from "axios";

const Fib = () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState("");

  const fetchValues = async () => {
    const fetchedValues = await axios.get("/api/values/current");
    console.log("fetchedValues");
    console.log(fetchedValues);
    setValues(fetchedValues.data);
  };

  const fetchIndexes = async () => {
    try {
      const seenIndexes = await axios.get("/api/values/all");
      setSeenIndexes(seenIndexes.data);
      console.log("seenIndexes");
      console.log(seenIndexes);
    } catch (e) {
      console.error(e.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/api/values", {
        index: index,
      });
    } catch (e) {
      console.error(e.message);
    }
    setIndex("");
  };

  useEffect(() => {
    fetchValues();
    fetchIndexes();
    return () => {
      console.log("Clean-up");
    };
  }, []);

  const renderSeenIndexes = () => {
    return seenIndexes.map(({ number }) => number).join(", ");
  };

  const renderValues = () => {
    const entries = [];

    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      );
    }

    return entries;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input
          value={index}
          onChange={(event) => setIndex(event.target.value)}
        />
        <button>Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {renderSeenIndexes()}

      <h3>Calculated values:</h3>
      {renderValues()}
    </div>
  );
};

export default Fib;
