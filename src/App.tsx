import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Frontpage from "./pages/frontpage/Frontpage";

const App: React.FC = () => {
  const baseUrl = "/person/tilbakemeldinger";
  return (
    <div className="pagecontent">
      <Router>
        <Route path={`(|${baseUrl})`} component={Frontpage} />
      </Router>
    </div>
  );
};

export default App;
