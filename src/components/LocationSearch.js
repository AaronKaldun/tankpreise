import axios from "axios";
import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import { Slider } from "react-semantic-ui-range";
//import "semantic-ui-css/semantic.min.css";
//key: 0622411304f2f233f6c15f2c0214c3528658f8f

const LocationSearch = ({ onPreiseChange }) => {
    const tanken_API_KEY = "d8149be7-4874-1428-b259-da5421cf17aa";
    const geo_API_KEY = "QAAAyRQGyNbTkY1VGCmBnnkHbFXq80D2";
    const options = [
        {
            label: "Diesel",
            value: "diesel",
        },
        {
            label: "Super",
            value: "e5",
        },
        {
            label: "Super E10",
            value: "e10",
        },
    ];

    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [err, setErr] = useState("");
    const [fuel, setFuel] = useState(options[0]);
    const [city, setCity] = useState("");

    const [value, setValue] = useState(5);

    const settings = {
        start: 5,
        min: 0,
        max: 25,
        step: 5,
        onChange: (value) => {
            setValue(value);
        },
    };

    useEffect(() => {
        //$(".ui.slider").slider();
        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                setLat(position.coords.latitude);
                setLng(position.coords.longitude);
            },
            (err) => setErr(err.message)
        );
    }, []);

    useEffect(() => {
        if (lat && lng && fuel)
            axios
                .get("https://creativecommons.tankerkoenig.de/json/list.php", {
                    params: {
                        lat: lat,
                        lng: lng,
                        rad: value,
                        type: fuel.value,
                        sort: "price",
                        apikey: tanken_API_KEY,
                    },
                })
                .then(({ data }) => {
                    onPreiseChange(data.stations);
                });
    }, [fuel, lat, lng, onPreiseChange, value]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (city)
                axios
                    .get("https://www.mapquestapi.com/geocoding/v1/address", {
                        params: {
                            location: city + " Deutschland",
                            key: geo_API_KEY,
                        },
                    })
                    .then(({ data }) => {
                        setLat(data.results[0].locations[0].latLng.lat);
                        setLng(data.results[0].locations[0].latLng.lng);
                    });
        }, 1500);
        return () => {
            clearTimeout(timeoutId);
        };
    }, [city]);

    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label className="label">Stadt, Adresse oder PLZ:</label>
                    <input
                        type="text"
                        className="ui input"
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                    />
                </div>

                <Dropdown
                    options={options}
                    label="Treibstoff wählen:"
                    selected={fuel}
                    onSelectedChange={setFuel}
                />
                <h3 className="header">Umkreis: {value} km</h3>
                <Slider value={value} color="blue" settings={settings} />

                {err ? "" : ""}
            </div>
        </div>
    );
};

export default LocationSearch;
