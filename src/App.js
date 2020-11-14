import './App.css';
import Header from './Header';
import InfoBox from './InfoBox';
import Map from "./Map";
import {Card, CardContent} from "@material-ui/core"

function App() {
  return (
    <div className="app">
      <div className="app__left">
        {/**Header */}
        <Header />
        {/**InfoBoxs */}
        <div className="app__stats">
          <InfoBox title="Corona Virus Cases" cases="+2,300" total="1.2M" />
          <InfoBox title="Corona Virus Cases" cases="+2,300" total="1.2M" />
          <InfoBox title="Corona Virus Cases" cases="+2,300" total="1.2M" />
        </div>
        

        {/**Table */}
        {/**Graphs */}
        {/**Map */}
        <Map />
      </div>
      <Card className="app__right">
          <CardContent>
            {/**Table */}
            <h1>I am the table</h1>
            {/**Graph */}
            <h1>I am the graph</h1>
          </CardContent>
      </Card>
    </div>
  );
}

export default App;
