import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Video from "./Video";
import Homepage from "./Homepage";

export default function App() {
    return (
        <Router>
            <Switch>
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