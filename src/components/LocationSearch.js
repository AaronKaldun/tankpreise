import axios from "axios";
import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import { Slider } from "react-semantic-ui-range";
//import "semantic-ui-css/semantic.min.css";

const LocationSearch = ({ onPreiseChange }) => {
    const API_KEY = "d8149be7-4874-1428-b259-da5421cf17aa";
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
                        apikey: API_KEY,
                    },
                })
                .then(({ data }) => {
                    onPreiseChange(data.stations);
                });
    }, [fuel, lat, lng, onPreiseChange, value]);

    return (
        <div>
            <div className="ui form">
                <Dropdown
                    options={options}
                    label="Treibstoff wählen:"
                    selected={fuel}
                    onSelectedChange={setFuel}
                />
                <Slider value={value} color="blue" settings={settings} />
                <h3 className="header">Umkreis: {value} km</h3>
                {err ? err : ""}
            </div>
        </div>
    );
};

export default LocationSearch;
