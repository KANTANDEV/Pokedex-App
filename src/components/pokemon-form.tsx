import React, { FunctionComponent, useState } from 'react';
import Pokemon from '../models/pokemon';
import formatType from '../helpers/format-type';
import { type } from 'os';
import { nodeModuleNameResolver } from 'typescript';

type Props = {
  pokemon: Pokemon
};

type Field = {
  value?: any,
  error?: string,
  isValid?: boolean
}

type Form = {
  name: Field,
  hp: Field,
  cp: Field,
  types: Field
}

const PokemonForm: FunctionComponent<Props> = ({ pokemon }) => {
// On utilise un etat pour faires apparaitres les informations de base de notre pokemon a editer 
  const [form, setForm] = useState<Form>({
    name: { value: pokemon.name, isValid: true},
    hp: { value: pokemon.hp, isValid: true},
    cp: { value: pokemon.cp, isValid: true},
    types: { value: pokemon.types, isValid: true}
  });

  const types: string[] = [
    'Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik',
    'Poison', 'Fée', 'Vol', 'Combat', 'Psy'
  ];
// on utilise la methode outils "hasType" qui nous renvois un Boolean qui nopus permet de savoir si le type passe en parametres appartien a notre pokemon 
  const hasType = (type: string): boolean => {
    return form.types.value.includes(type);
  }
// Reagis a un event utilisateur a chaque fois que celui si modifie : nodeModuleNameResolver, hp, cp
  const handelInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // on repere le nom du champ modifie  
    const fieldName: string = e.target.name;
    // on repere la nouvelle valeur saisis par l'utilisateur
    const fieldValue: string = e.target.value;
    // on regroupe les modification dans un nouvelle objet nomme "newField"
    const newField: Field = {[fieldName]: { value: fieldValue}};
    // On modifie l'etat de notre formulaire grace a la methode "setForm" fournis par le hook d'etat, on lui passe un nouveau state avec le spreadoperator qui fusionne deux objet 
    // Si les deux objets on tout deux un "name" alors c'est l'object de droite qui ecrase la propriete "name" du premier objet
    // On obtiens donc un nouveau state qui est une copie de l'ancien mais avec la modification de l'utilisateur dur le champs concerne
    // On passe ensuite le nouveau state a la methode "setForm"
    setForm({...form, ...newField});

  }

  return (
    <form>
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card hoverable">
            <div className="card-image">
              <img src={pokemon.picture} alt={pokemon.name} style={{ width: '250px', margin: '0 auto' }} />
            </div>
            <div className="card-stacked">
              <div className="card-content">
                {/* On declare le champ de formulaire permettant d'editer le nom d'un pokemon */}
                <div className="form-group">
                  <label htmlFor="name">Nom</label>
                  <input id="name" type="text" className="form-control" value={form.name.value}></input>
                </div>
                {/* On declare le champ de formulaire permettant d'editer les hp d'un pokemon*/}
                <div className="form-group">
                  <label htmlFor="hp">Point de vie</label>
                  <input id="hp" type="number" className="form-control" value={form.hp.value}></input>
                </div>
                {/* On declare le champ de formulaire permettant d'editer les cp d'un pokemon */}
                <div className="form-group">
                  <label htmlFor="cp">Dégâts</label>
                  <input id="cp" type="number" className="form-control" value={form.cp.value}></input>
                </div>
                {/* On declare le champ de formulaire permettant d'editer le type d'un pokemon */}
                <div className="form-group">
                  <label>Types</label>
                  {types.map(type => (
                    <div key={type} style={{ marginBottom: '10px' }}>
                      <label>
                        {/* on applique la methode pour cocher les case des types d'un pokemon  */}
                        <input id={type} type="checkbox" className="filled-in" value={type} checked={hasType(type)}></input>
                        <span>
                          <p className={formatType(type)}>{type}</p>
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card-action center">
                {/* Submit button */}
                <button type="submit" className="btn">Valider</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PokemonForm;