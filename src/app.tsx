// On importe le module React et nos hooks
import React, { FunctionComponent, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PokemonsDetail from "./pages/pokemon-detail";
// On importe nos fichiers 
import PokemonList from './pages/pokemon-list'
//  On type notre composant React a l'aide de FunctionComponent qui remplace React.FC
const App: FunctionComponent = () => {


    return (
        <Router>
            <div>
                {/* Barre de navigation commune a toutes les pages  */}
                <nav>
                    <div className="nav-wrapper teal">
                        <Link to="/" className="brand-logo center">Pokedex</Link>
                    </div>
                </nav>
                {/* Systeme de gestion des routes de notre app */}
                <Switch>
                    <Route exact path="/" component={PokemonList} />
                    <Route exact path="/pokemons" component={PokemonList} />
                    <Route path="/pokemons/:id" component={PokemonsDetail} />
                </Switch>
            </div>
        </Router>
    )
}
// On exporte notre app 
export default App;