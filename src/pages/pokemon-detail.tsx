import React, { FunctionComponent, useState, useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import Pokemon from '../models/pokemon';
import POKEMONS from '../models/mock-pokemon';
import formatDate from '../helpers/format-date';
import formatType from '../helpers/format-type';
// On definie un type pour l'id que nous allons recuperer depuis l'URL
type Params = { id: string };
//   On type le parametre recvu par le routeur de react avec "RouteComponentProps" le routeur associe le parametre recu a un objet "match "
const PokemonsDetail: FunctionComponent<RouteComponentProps<Params>> = ({ match }) => {
  // On definie un etat pour sauvegarder le pokemon a affiche 
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  //   On recherche le pokemon avec l'id envoyer par notre router, un fois trouver on associe le pokement a notre etat via la methode "setPokemon(pokemon)"
  // Si aucun pokemon n'est trouver pokemon a donc la valeur null
  useEffect(() => {
    POKEMONS.forEach(pokemon => {
      if (match.params.id === pokemon.id.toString()) {
        setPokemon(pokemon);
      }
    })
  }, [match.params.id]);

  return (
    <div>
      {/* On verfie si on a bien trouver un pokemon avec l'id de l'url, si nous avons trouver un pokemon nous l'affichons */}
      {pokemon ? (
        <div className="row">
          <div className="col s12 m8 offset-m2">
            <h2 className="header center">{pokemon.name}</h2>
            <div className="card hoverable">
              <div className="card-image">
                <img src={pokemon.picture} alt={pokemon.name} style={{ width: '250px', margin: '0 auto' }} />
                <Link to={`/pokemons/edit/${pokemon.id}`} className="btn btn-floating halfway-fab waves-effect waves-light">
                  <i className="material-icons">edit</i>
                </Link>
              </div>
              <div className="card-stacked">
                <div className="card-content">
                  <table className="bordered striped">
                    <tbody>
                      <tr>
                        <td>Nom</td>
                        <td><strong>{pokemon.name}</strong></td>
                      </tr>
                      <tr>
                        <td>Points de vie</td>
                        <td><strong>{pokemon.hp}</strong></td>
                      </tr>
                      <tr>
                        <td>Dégâts</td>
                        <td><strong>{pokemon.cp}</strong></td>
                      </tr>
                      <tr>
                        <td>Types</td>
                        <td>
                          {pokemon.types.map(type => (
                            <span key={type} className={formatType(type)}>{type}</span>
                          ))}</td>
                      </tr>
                      <tr>
                        <td>Date de création</td>
                        <td>{formatDate(pokemon.created)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="card-action">
                  {/* On utilise l'element link qui nous permet de genere un lien nous lui passon le chemin via la prop "to" */}
                  <Link to="/">Retour</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Si on ne trouve pas de pokemon a afficher nous affichons le message:
        <h4 className="center">Aucun pokémon à afficher !</h4>
      )}
    </div>
  );
}

export default PokemonsDetail;