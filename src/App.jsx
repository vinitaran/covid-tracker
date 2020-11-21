import React, {useState, useEffect} from 'react';
import "./Header.css";
import InfoBox from "./InfoBox";
import Table from "./Table";
import {FormControl, MenuItem, Select} from "@material-ui/core"
import {Card, CardContent} from "@material-ui/core";
import Map from "./Map";
import "./Table.css";
import {sortData} from "./util";
import LineGraph from "./LineGraph";
import 'leaflet/dist/leaflet.css';

const App = () => {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('worldwide');
    const [countryInfo, setCountryInfo] = useState({});
    const [tableData, setTableData] = useState([]);
    const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
    const [mapZoom, setMapZoom] = useState(3);
    const [mapCountries, setMapCountries] = useState([]);
    const [casesType, setCasesType] = useState("cases");

    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/all").then((response) => {
            return response.json();
        }).then((data) => {
            setCountryInfo(data);
        })
    }, [])

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
                const sortedData = sortData(data);
                setTableData(sortedData);
                setMapCountries(data);
            })
        } 
        getCountriesData();
    }, []);

    const onCountryChange = async (e) => {
        const countryCode = e.target.value;
        setCountry(countryCode);
        const url =
          countryCode === "worldwide"
            ? "https://disease.sh/v3/covid-19/all"
            : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
        await fetch(url)
          .then((response) => response.json())
          .then((data) => {
            setCountryInfo(data);
            if(countryCode!=='worldwide'){
                setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
                setMapZoom(4);
            }
          });
      };

    return (
    <div className="app">
      <div className="app__left">
        {/**Header */}
        <div className="header">
                <h1>COVID-19 TRACKER</h1>
                <FormControl className="header__dropdown">
                    <Select variant="outlined" value={country} onChange={onCountryChange}>
                        <MenuItem value="worldwide">Worldwide</MenuItem>
                        {
                            countries.map((country) => (
                                <MenuItem value={country.value}>{country.name}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </div>
            <div className="app__stats">
            <InfoBox isRed active={casesType === "cases"} onClick = {(e) => setCasesType('cases')} title="Corona Virus Cases" cases={`${countryInfo.todayCases}`} total={countryInfo.cases} />
            <InfoBox active={casesType === "recovered"} onClick = {(e) => setCasesType('recovered')} title="Recovered Cases" cases={`${countryInfo.todayRecovered}`} total={countryInfo.recovered} />
            <InfoBox isRed active={casesType === "deaths"} onClick = {(e) => setCasesType('deaths')} title="Deaths" cases= {`${countryInfo.todayDeaths}`} total={countryInfo.deaths} />
            </div>
        
        {/**Map */}
        <Map casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom}/>
        {/* <CovidMap /> */}
      </div>
      <Card className="app__right">
            <CardContent>
                {/**Table */}
                <h2>Live Cases in every country</h2>
                <Table countries={tableData}/>
                {/**Graph */}
                <h2 className="linegraph__title">Live Graph of {casesType}</h2>
                <LineGraph casesType={casesType}/>
            </CardContent>
        </Card>
    </div>
            
            
    )
}

export default App;
