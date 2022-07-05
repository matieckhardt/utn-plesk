import { useEffect, useState } from 'react';
import { getPokemons } from '../services/api';

function ComponentePokemons() {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {

        getPokemons().then(result => {

            setPokemons(result);

            console.log(result)
        })

    }, []);

    return (

        <div style={{ marginTop: '100px' }}>
            Pokemones:
            <ul>
                {pokemons.map((element) =>
                    <li>
                        <span>{element.name}</span>
                        <img src={element.image} alt={element.name}></img>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default ComponentePokemons;