import React, { FC } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Frontpage from "./pages/frontpage/Frontpage";
import Header from "./components/header/Header";
import Opplysninger from "./pages/ros-til-nav/1-Opplysninger";
import PageNotFound from "./pages/404/404";
import Melding from "./pages/ros-til-nav/2-Melding";

export const baseUrl = "/person/tilbakemeldinger";
const App: FC = () => {
  return (
    <Router>
      <Header />
      <div className="pagecontent">
        <Switch>
          <Route exact path={`(|${baseUrl})`} component={Frontpage} />
          <Route
            exact
            path={`${baseUrl}/ros-til-nav`}
            component={Opplysninger}
          />
          <Route
            exact
            path={`${baseUrl}/ros-til-nav/melding`}
            component={Melding}
          />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
