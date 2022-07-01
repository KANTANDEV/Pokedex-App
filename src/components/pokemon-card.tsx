// On importe le module React
import React, { FunctionComponent, useState } from "react";
// On importe notre entiee pokemon pour pouvoir la type par la suite 
import Pokemon from "../models/pokemon";
// on importe le CSS
import '../styles/pokemon-card.css'
// on importe notre format-date & format-type
import formatDate from '../helpers/format-date'
import formatType from '../helpers/format-type'
// On importe le hook "useHistory" depuis le packet react
import { useHistory } from 'react-router-dom'
// On declare un nouveau type pour TS 
type Props = {
    pokemon: Pokemon
    borderColor?: string
};
// On lie notre type a notre propriete d'entree ({pokemon})
const PokemonCard: FunctionComponent<Props> = ({ pokemon, borderColor = '#99e2d0' }) => {
    // on ajoute un etat, pour stocker la couleur actuelle de la bordure
const [color, setColor] = useState<string>();
// On recupere un objet represantant l'historique du navigateur de puis le hook "useHistory"
const history = useHistory();
// on cree nos evenements
const showBorder = () =>{
    setColor(borderColor);
}

const hideBorder = () => {
    setColor('#f5f5f5'); //On remet la bordure en gris
}
// On definie une methode de gestionnaire d'evenement qui prend en parametre l'id du pokemon vers lequel on shouaite effectuer une redirection 
// Pour cela on utilise le methode "push" et on lui donne en parametre le chemin vers lequel se rendre 
const goToPokemon = (id: number) =>{
    history.push(`/pokemons/${id}`);
}

    return (
        // on applique notre effect au hover et le click 
        <div className="col s6 m4" onClick={() => goToPokemon(pokemon.id)} onMouseEnter={showBorder} onMouseLeave={hideBorder}>
            <div className="card horizontal" style={{ borderColor: color }}>
                <div className="card-image">
                    <img src={pokemon.picture} alt={pokemon.name} />
                </div>
                <div className="card-stacked">
                    <div className="card-content">
                        <p>{pokemon.name}</p>
                        <p><small>{formatDate(pokemon.created)}</small></p>
                        {pokemon.types.map(type =>
                        <span key={type} className={formatType(type)}>{type}</span>
                            )}
                    </div>
                </div>
            </div>
        </div>
    );

}

export default PokemonCard;