import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Frontpage from "./pages/frontpage/Frontpage";

const App: React.FC = () => {
  const baseUrl = "/person/tilbakemeldinger";
  return (
    <Router>
      <div className="pagecontent">
        <Route path={`(|${baseUrl})`} component={Frontpage} />
      </div>
    </Router>
  );
};

export default App;
