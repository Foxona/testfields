import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App(props: any) {
  const initialAnimal = props.initialAnimal;

  const [animalFacts, setAnimalFacts] = useState<string[]>([]);
  const [animalType, setAnimalType] = useState<string>(initialAnimal);

  useEffect(() => {
    const p = new Promise((res, rej) => {
      setTimeout(() => {
        res(666);
      }, 2000);
    });

    p.then(() => {
      axios
        .get(
          `https://cat-fact.herokuapp.com/facts/random?animal_type=${animalType}&amount=2`
        )
        .then((value) => {
          setAnimalFacts(value.data.map((v: any) => v.text));
        });
    });
  }, [animalType]);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <select
            defaultValue={initialAnimal}
            onChange={(e) => {
              setAnimalType(e.target.value);
            }}
          >
            <option value="cat">Cat</option>
            <option value="horse">Horse</option>
            <option value="dog">Dog</option>
          </select>
        </div>
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          {
            <ul>
              {animalFacts.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
          }
        </div>
      </header>
    </div>
  );
}

export default App;
