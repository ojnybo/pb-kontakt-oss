import React, { FC } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Frontpage from "./pages/frontpage/Frontpage";
import Header from "./components/header/Header";
import Ros from "./pages/ros-til-nav/Ros";
import PageNotFound from "./pages/404/404";
import FeilOgMangler from "./pages/feil-og-mangler/FeilOgMangler";

export const baseUrl = "/person/tilbakemeldinger";
const App: FC = () => {
  return (
    <Router>
      <Header />
      <div className="pagecontent">
        <Switch>
          <Route exact path={`(|${baseUrl})`} component={Frontpage} />
          <Route exact path={`${baseUrl}/ros-til-nav`} component={Ros} />
          <Route
            exact
            path={`${baseUrl}/feil-og-mangler`}
            component={FeilOgMangler}
          />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
