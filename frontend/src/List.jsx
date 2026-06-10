import './Listings.scss';
import React from "react";
import store from "store";
import qs from 'qs';
import sha256 from 'crypto-js/sha256';
import hex from 'crypto-js/enc-hex';
import {getConfigValue} from "./utils";
import Post from "./components/Post";

const endpoint = getConfigValue("endpoint");

class Video extends React.Component {
    constructor(props) {
        super(props);

        this.state = {sort: "top", videos: []};

        let qsp = qs.parse(window.location.search, {ignoreQueryPrefix: true});
        let get_uuid = qsp.uuid;
        if ((typeof get_uuid == "string" || get_uuid instanceof String) && get_uuid.length <= 36) {
            this.state.uuid = get_uuid;
            store.set("uuid", get_uuid);
            window.location.search = "";
        } else if (store.get("uuid")) {
            this.state.uuid = store.get("uuid");
        } else {
            let my_uuid = crypto.randomUUID();
            this.state.uuid = my_uuid;
            store.set("uuid", my_uuid);
        }

        this.state.nameIdenticon = hex.stringify(sha256(this.state.uuid));
    }

    async componentDidMount() {
        const response = await fetch(`${endpoint}/videos/get/${this.state.sort}?id=${this.state.uuid}`);
        const videos = await response.json();
        this.setState({videos: videos || []});
        console.log(videos);
    }

    render () {
        console.log(this.state.videos);
        return (
            <div className="App">
                {this.state.videos.map(v => <Post {...v} key={v.id} />)}
            </div>
        );
    }
}

export default Video;
