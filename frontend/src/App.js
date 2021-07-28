import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Video from "./Video";
import Homepage from "./Homepage";
import List from "./List";

export default function App() {
    return (
        <Router>
            <Switch>
                <Route path="/list">
                    <List />
                </Route>
                <Route path="/watch">
                    <Video />
                </Route>
                <Route path="/">
                    <Homepage />
                </Route>
            </Switch>
        </Router>
    );
}