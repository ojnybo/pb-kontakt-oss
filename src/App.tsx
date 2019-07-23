import React, { FC } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Frontpage from "./pages/frontpage/Frontpage";
import Header from "./components/header/Header";

export const baseUrl = "/person/tilbakemeldinger";
const App: FC = () => {
  return (
    <Router>
      <Header />
      <div className="pagecontent">
        <Route exact path={`(|${baseUrl})`} component={Frontpage} />
      </div>
    </Router>
  );
};

export default App;
