import React, { useEffect, useState } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import axios from "axios";
import './carta.css';
import  Card  from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function App() {
  const [data, setData] = useState({});
  const [pokemonId, setPokemonID] =useState(1)

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [pokemonId]);

  console.log(data)

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      {/[0-9]/.test(event.target.value) &&(
        setPokemonID(event.target.value),
        event.target.value=""
      )}
    }
  };

  const Clickear = (e) =>{
    console.log("Clickeaste a la card")
  }

  return (
    <>
    <div className="d-flex justify-content-center mt-2 mb-2">
    <input type="text"
      
        onKeyPress={handleKeyPress} />
        </div>
        <div className="noFuncionaenFold d-flex justify-content-center p-md-5 p-sm-5 ">
       <Card style={{ width: '18rem' }} onClick={Clickear} >
       {data.sprites && data.sprites.other && data.sprites.other["official-artwork"] && (
      <Card.Img variant="top" src={data.sprites.other["official-artwork"].front_default} className="img-fluid" />
      )}
      <Card.Body>
        <Card.Title>{data.name}</Card.Title>
        <Card.Text>
        #{data.id}
        </Card.Text>
        {data.types && data.types.length > 0 && (

        <div className={`btn me-2 ${data.types && data.types[0]?.type.name === "dragon" ? "dragon" :
        data.types && data.types[0]?.type.name === "poison" ? "poison" :
        data.types && data.types[0]?.type.name === "fire" ? "fire" :
        data.types && data.types[0]?.type.name === "grass" ? "grass" :
        data.types && data.types[0]?.type.name === "ice" ? "ice" :
        data.types && data.types[0]?.type.name === "ghost" ? "ghost" :
        data.types && data.types[0]?.type.name === "electric" ? "electric" :
        data.types && data.types[0]?.type.name === "water" ? "water" :
        data.types && data.types[0]?.type.name === "fighting" ? "fighting" :
        data.types && data.types[0]?.type.name === "ground" ? "ground" :
        data.types && data.types[0]?.type.name === "steel" ? "steel" :
        data.types && data.types[0]?.type.name === "fairy" ? "fairy" :
        data.types && data.types[0]?.type.name === "dark" ? "dark" :
        data.types && data.types[0]?.type.name === "psychic" ? "psychic" :
        data.types && data.types[0]?.type.name === "normal" ? "normal" :
        data.types && data.types[0]?.type.name === "flying" ? "flying" :
        data.types && data.types[0]?.type.name === "bug" ? "bug" :
        data.types && data.types[0]?.type.name === "rock" ? "rock" :
        ""}`}>{data.types[0]?.type.name}</div>
      )}
      {data.types && data.types.length > 1 && (
        
        <div className={`btn ${data.types && data.types[1]?.type.name === "dragon" ? "dragon" :
                   data.types && data.types[1]?.type.name === "poison" ? "poison" :
                   data.types && data.types[1]?.type.name === "fire" ? "fire" :
                   data.types && data.types[1]?.type.name === "grass" ? "grass" :
                   data.types && data.types[1]?.type.name === "ice" ? "ice" :
                   data.types && data.types[1]?.type.name === "ghost" ? "ghost" :
                   data.types && data.types[1]?.type.name === "electric" ? "electric" :
                   data.types && data.types[1]?.type.name === "water" ? "water" :
                   data.types && data.types[1]?.type.name === "fighting" ? "fighting" :
                   data.types && data.types[1]?.type.name === "ground" ? "ground" :
                   data.types && data.types[1]?.type.name === "steel" ? "steel" :
                   data.types && data.types[1]?.type.name === "fairy" ? "fairy" :
                   data.types && data.types[1]?.type.name === "dark" ? "dark" :
                   data.types && data.types[1]?.type.name === "psychic" ? "psychic" :
                   data.types && data.types[1]?.type.name === "normal" ? "normal" :
                   data.types && data.types[1]?.type.name === "flying" ? "flying" :
                   data.types && data.types[1]?.type.name === "bug" ? "bug" :
                   data.types && data.types[1]?.type.name === "rock" ? "rock" :
                   ""}`}>{data.types[1]?.type.name}</div>
      )}
      </Card.Body>
    </Card>
    </div>
    </>
  );
}


export default App;
