import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [animalFacts, setAnimalFacts] = useState<string[]>([]);
  const [animalType, setAnimalType] = useState<string>("cat");

  const axiosList = async () => {
    axios
      .get(
        `https://cat-fact.herokuapp.com/facts/random?animal_type=${animalType}&amount=2`
      )
      .then((value) => {
        const arr = [];
        for (let v of value.data) {
          arr.push(v.text);
        }
        setAnimalFacts(arr);
      });

    return;
  };

  useEffect(() => {
    axiosList();
  }, [animalType]);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <select
            onChange={(e) => {
              setAnimalType(e.target.value);
            }}
          >
            <option value="cat">Cat</option>
            <option value="horse">Horse</option>
          </select>
        </div>
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          {
            <ul>
              {animalFacts.map((v) => (
                <li>{v}</li>
              ))}
            </ul>
          }
        </div>
      </header>
    </div>
  );
}

export default App;
