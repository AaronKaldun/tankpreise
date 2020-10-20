import React, { useState } from "react";
import LocationSearch from "./components/LocationSearch";

const App = () => {
    const [preise, setPreise] = useState([]);

    const renderedResults = preise.map((preis) => {
        if (preis.price && preis.isOpen)
            return (
                <div className="item" key={preis.id}>
                    <div className="right floated content">
                        {preis.price ? preis.price.toFixed(2) : ""} <b>€</b>
                    </div>
                    <a
                        href={`https://maps.google.com/?q=${preis.place},+${preis.street}+${preis.houseNumber}+${preis.brand}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="content">
                            <div className="header">{preis.brand}</div>
                            {`${preis.street}, ${preis.houseNumber} - ${preis.place} | Entfernung: ${preis.dist} km`}
                        </div>
                    </a>
                </div>
            );
        return null;
    });

    return (
        <div className="ui container">
            <LocationSearch onPreiseChange={setPreise} />
            {preise.length > 0 ? (
                <div className="ui inverted segment">
                    <div className="ui inverted relaxed divided list">
                        {renderedResults}
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default App;
