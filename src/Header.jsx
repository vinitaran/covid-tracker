import React, {useState, useEffect} from 'react';
import "./Header.css";
import {FormControl, MenuItem, Select} from "@material-ui/core"

const Header = () => {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('worldwide');
    const [countryInfo, setCountryInfo] = useState({});
    useEffect(() => {
        const getCountriesData = async () => {
            await fetch("https://disease.sh/v3/covid-19/countries").then((response) => {
                return response.json();
            }).then((data) => {
                const countries = data.map((country) => ({
                    name: country.country,
                    value: country.countryInfo.iso2,
                }))
                setCountries(countries);
            })
        } 
        getCountriesData();
    }, []);

    const handleChange = async (event) => {
        const countryCode = event.target.value;
        setCountry(countryCode);
        const url = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`
        await fetch(url).then((response) => {
            return response.json();
        }).then((data) => {
            setCountryInfo(data);
        })
    }

    console.log(countryInfo);

    return (
        <div className="header">
            <h1>COVID-19 TRACKER</h1>
            <FormControl className="header__dropdown">
                <Select variant="outlined" value={country} onChange={handleChange}>
                    <MenuItem value="worldwide">Worldwide</MenuItem>
                    {
                        countries.map((country) => (
                            <MenuItem value={country.value}>{country.name}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </div>
    )
}

export default Header
