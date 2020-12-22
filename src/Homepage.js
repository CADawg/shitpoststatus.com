import React from 'react';
import store from "store";
import qs from "qs";
import './App.scss';

export default class Homepage extends React.Component {
    constructor(props) {
        super(props);

        let qsp = qs.parse(window.location.search, {ignoreQueryPrefix: true});
        let get_uuid = qsp.uuid;
        let get_vid = qsp.v || false;
        if ((typeof get_uuid == "string" || get_uuid instanceof String) && get_uuid.length <= 36) {
            store.set("uuid", get_uuid);
            window.location.search = "";
        }

        if (get_vid !== false && get_vid !== "") {
            window.location.href = "/watch?v=" + get_vid;
        }

    }

    render() {
        return (<div className="homepage">
            <button className="fancy-button fancy-button__homepage" onClick={function () {window.location.href = "/watch";}}>Get Watching</button>
        </div>);
    }
}