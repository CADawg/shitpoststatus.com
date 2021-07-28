import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Reward from "rewards-lite";
import {faSortDown, faSortUp} from "@fortawesome/free-solid-svg-icons";
import YouTube from "react-youtube";

class Post extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        console.log(this.props);
        return <div id={this.props.id} className={"post"}>
            <div className={"post-action-panel"}>
                <Reward ref={(ref) => {
                    this.reward = ref
                }} type='confetti' config={{lifetime: 100, spread: 30, elementCount: 20}} children={""}/>
                <FontAwesomeIcon icon={faSortUp}/>
                <p onClick={() => this.reward.rewardMe()}>{parseInt(this.props.upvotes) - parseInt(this.props.downvotes) + parseInt(this.props.myvoteweight)}</p>
                <FontAwesomeIcon icon={faSortDown}/>
            </div>

            <div className={"post-details"}>
                <p>{this.props.title}</p>
                <YouTube videoId={this.props.id} opts={{host: "https://www.youtube-nocookie.com"}} />
                <div style={{backgroundImage: `url("https://img.youtube.com/vi/${this.props.id}/hqdefault.jpg")`}} />
            </div>
        </div>;
    }
}

export default Post;