import React, { useState } from "react";
import LocationSearch from "./components/LocationSearch";

const App = () => {
    const [preise, setPreise] = useState([]);

    const renderedResults = preise.map((preis) => {
        return (
            <div className="item" key={preis.id}>
                <div className="right floated content">
                    {preis.price} <b>€</b>
                </div>
                <div className="content">
                    <div className="header">{preis.brand}</div>
                    {`${preis.street}, ${preis.houseNumber} - ${preis.place} | Entfernung: ${preis.dist} km`}
                </div>
            </div>
        );
    });

    return (
        <div className="ui container">
            <LocationSearch onPreiseChange={setPreise} />
            <div className="ui inverted segment">
                <div className="ui inverted relaxed divided list">
                    {renderedResults}
                </div>
            </div>
        </div>
    );
};

export default App;
