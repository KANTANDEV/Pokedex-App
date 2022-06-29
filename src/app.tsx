// On importe le module React et nos hooks
import React, { FunctionComponent, useState, useEffect } from "react";
// On importe nos fichiers 
import Pokemon from "./models/pokemon";
import POKEMONS from "./models/mock-pokemon";
// On type notre composant React 
const App: FunctionComponent = () => {
// On declare une variable pokemons, on lui dit que ce doit etre un tableau de pokemon comme notre module, puis on lui donne la liste de nos pokemons (de mock-pokemon) 
// et on inisialise un tableau vide par defaut pour notre hook useEffect
    const [pokemons, setPokemons] = useState<Pokemon[]>( [] );
// on met en place notre hook d'effect, avec deux arguments en premier notre fonction fleche qui appel la methode du hook d'etat "setPokemons" et on lui passe notre liste de POKEMONS
// en deuxieme argument on passe un tableau vide qui permet d'evite le declanchement du hook d'effect a chaque modification de notre composant
    useEffect(() =>{
        setPokemons(POKEMONS);
    }, []);
    
    return (
        <div>
            <h1>Pokedex</h1>
            <p>Il y a {pokemons.length} pokemon dans le Pokedex.</p>
        </div>
    )
}
// On exporte notre app 
export default App;