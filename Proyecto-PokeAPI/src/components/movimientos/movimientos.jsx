import React, { useEffect, useState } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "./movimientos.css"
import axios from "axios";
import { Table } from "react-bootstrap";

function movimientos() {
    
    const [data, setData] = useState({});
    const [movimiento, setMovimiento] =useState("thunderbolt")
  
    useEffect(() => {
      axios.get(`https://pokeapi.co/api/v2/move/${movimiento}`)
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }, [movimiento]);
  
    console.log(data)
    {data.contest_type && (
        console.log(data.contest_type)
    )}

  

    const handleKeyPressmovs = (event) => {
        if (event.key === 'Enter') {
            {/^[a-zA-Z-]+$/.test(event.target.value) &&(
                setMovimiento(event.target.value.toLowerCase()),
                event.target.value=""
              )}
        }
      };

        return (
            <>
                 <div className="d-flex justify-content-center mt-2 mb-2">
                 <input type="text"
      
                 onKeyPress={handleKeyPressmovs} />
                </div>
                <div className="contenedorDeTabla">
                <div className="divTabla "> 
                <Table striped bordered hover>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Tipo</th>
          <th>Clase</th>
          <th>Concurso</th>
          <th>Generación</th>
          <th>Presición</th>
          <th>Potencia</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
          <div className="d-flex justify-content-center mt-1">
            {data.name}
            </div>
          </td>
          <td>{data.type && data.type.name.length > 0 && (

<div className={`btn me-2 ${data.type.name === "dragon" ? "dragon" :
data.type.name === "poison" ? "poison" :
data.type.name === "fire" ? "fire" :
data.type.name === "grass" ? "grass" :
data.type.name === "ice" ? "ice" :
data.type.name === "ghost" ? "ghost" :
data.type.name === "electric" ? "electric" :
data.type.name === "water" ? "water" :
data.type.name === "fighting" ? "fighting" :
data.type.name === "ground" ? "ground" :
data.type.name === "steel" ? "steel" :
data.type.name === "fairy" ? "fairy" :
data.type.name === "dark" ? "dark" :
data.type.name === "psychic" ? "psychic" :
data.type.name === "normal" ? "normal" :
data.type.name === "flying" ? "flying" :
data.type.name === "bug" ? "bug" :
data.type.name === "rock" ? "rock" :
""}`}>{data.type.name}</div>
)}</td> 
          <td>{data.damage_class && data.damage_class.name.length > 0 && (
          <div className="mt-1">
            <img src={`${data.damage_class.name === "physical" ? "https://images.wikidexcdn.net/mwuploads/wikidex/3/31/latest/20140504181227/Clase_f%C3%ADsico.gif" :
            data.damage_class.name === "special" ? "https://images.wikidexcdn.net/mwuploads/wikidex/6/61/latest/20140504180925/Clase_especial.gif" :
            data.damage_class.name === "status" ? "https://images.wikidexcdn.net/mwuploads/wikidex/0/06/latest/20141020094029/Clase_estado.gif" :
            ""}`}/></div>
          )}
          </td>
          <td>{data.contest_type && data.contest_type.name.length > 0 && (
            
            <div className="d-flex justify-content-center mt-2">
                <img src={`${data.contest_type.name === "cute" ? "https://images.wikidexcdn.net/mwuploads/wikidex/6/6e/latest/20170114102120/Tipo_dulzura.gif" :
                data.contest_type.name === "smart" ? "https://images.wikidexcdn.net/mwuploads/wikidex/1/1a/latest/20170114102120/Tipo_ingenio.gif" :
                data.contest_type.name === "tough" ? "https://images.wikidexcdn.net/mwuploads/wikidex/b/be/latest/20170114102119/Tipo_dureza.gif" :
                data.contest_type.name === "beauty" ? "https://images.wikidexcdn.net/mwuploads/wikidex/d/dc/latest/20170114102121/Tipo_belleza.gif" :
                data.contest_type.name === "cool" ? "https://images.wikidexcdn.net/mwuploads/wikidex/b/b9/latest/20170114102118/Tipo_carisma.gif" :
                ""}`}/>
                </div>)}
                {!data.contest_type && (
                <div className="d-flex justify-content-center mt-2">-</div>
                )}
          </td>
          <td>
            {data.generation && data.generation.name && (
            <div className="d-flex justify-content-center mt-2">
            <img className="imgGeneracion" src={`${ data.generation.name === "generation-i" ? "https://images.wikidexcdn.net/mwuploads/wikidex/2/2a/latest/20220602220839/Primera_generaci%C3%B3n.png" :
                data.generation.name === "generation-ii" ? "https://images.wikidexcdn.net/mwuploads/wikidex/5/54/latest/20220602220849/Tercera_generaci%C3%B3n.png" :
                data.generation.name === "generation-iii" ? "https://images.wikidexcdn.net/mwuploads/wikidex/5/54/latest/20220602220849/Tercera_generaci%C3%B3n.png" :
                data.generation.name === "generation-iv" ? "https://images.wikidexcdn.net/mwuploads/wikidex/0/0a/latest/20220602220854/Cuarta_generaci%C3%B3n.png" :
                data.generation.name === "generation-v" ? "https://images.wikidexcdn.net/mwuploads/wikidex/6/61/latest/20220602220857/Quinta_generaci%C3%B3n.png" :
                data.generation.name === "generation-vi" ? "https://images.wikidexcdn.net/mwuploads/wikidex/1/1a/latest/20220602220016/Sexta_generaci%C3%B3n.png" :
                data.generation.name === "generation-vii" ? "https://images.wikidexcdn.net/mwuploads/wikidex/0/0a/latest/20220602215812/S%C3%A9ptima_generaci%C3%B3n.png" :
                data.generation.name === "generation-viii" ? "https://images.wikidexcdn.net/mwuploads/wikidex/b/b4/latest/20220602215725/Octava_generaci%C3%B3n.png" :
                data.generation.name === "generation-ix" ? "https://images.wikidexcdn.net/mwuploads/wikidex/b/bc/latest/20220602215652/Novena_generaci%C3%B3n.png" :

            ""}`} />
            </div>
            )}
          </td>
          <td>
            {data.accuracy && (
            <div className="d-flex justify-content-center mt-1">
            {data.accuracy}
            </div>
            )}
            {!data.accuracy && (
                <div className="d-flex justify-content-center mt-2">-</div>
                )}
          </td>
          <td>
          {data.power !== null && data.power !== undefined && (
          data.power !== 0 ? (
          <div className="d-flex justify-content-center mt-1">
          {data.power}
          </div>
          ) : (
         <div className="d-flex justify-content-center mt-2">-</div>
          )
          )}
        {!data.power && (
                <div className="d-flex justify-content-center mt-2">-</div>
                )}
          </td>
        </tr>
      </tbody>
    </Table>
                </div>
                </div>
            </>
        );
    
}

export default movimientos;