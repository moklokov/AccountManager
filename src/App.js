import "typeface-roboto";
import React from "react";
import { Route, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import Header from "./components/common/header";
import Home from "./components/pages/home";
import Edit from "./components/pages/edit";
import Create from "./components/pages/create";
import Show from "./components/pages/show";

function App() {
  return (
    <div>
      <CssBaseline />
      <Header />
      <div className="content">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/users/:id/edit" component={Edit} />
          <Route path="/users/new" component={Create} />
          <Route path="/users/:id" component={Show} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
