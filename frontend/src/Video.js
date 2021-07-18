import './App.scss';
import YouTube from "react-youtube";
import React from "react";
import axios from "axios";
import uuid from "react-uuid";
import store from "store";
import qs from 'qs';
import Blockies from '@pacta-app/react-blockies';
import sha256 from 'crypto-js/sha256';
import hex from 'crypto-js/enc-hex';
import {
    faArrowUp,
    faArrowDown,
    faStepBackward,
    faStepForward,
    faPlus,
    faTimes,
    faCheck,
    faEye
} from "@fortawesome/pro-regular-svg-icons";
import FancyButton from "./FancyButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class Video extends React.Component {
    constructor(props) {
        super(props);

        this.state = {video: "unloaded", vidIndex: -1, autoplay: true, history: [], uuid: "", submitLink: "", userDialog: false, showPassword: false, submitDialog: false, nameIdenticon: ""};
        this.videos = [];

        let qsp = qs.parse(window.location.search, {ignoreQueryPrefix: true});
        let get_uuid = qsp.uuid;
        if ((typeof get_uuid == "string" || get_uuid instanceof String) && get_uuid.length <= 36) {
            this.state.uuid = get_uuid;
            store.set("uuid", get_uuid);
            window.location.search = "";
        } else if (store.get("uuid")) {
            this.state.uuid = store.get("uuid");
        } else {
            let my_uuid = uuid();
            this.state.uuid = my_uuid;
            store.set("uuid", my_uuid);
        }

        this.vidid = qsp.v || false;

        this.state.nameIdenticon = hex.stringify(sha256(this.state.uuid));

        if (store.get("history")) {
            this.state.history = store.get("history");
            this.state.vidIndex = this.state.history.length - 1;
        }
    }

    async componentDidMount() {
        this.videos = (await axios.get("/videos/get", {params: {id: this.state.uuid}})).data || [];

        if (this.vidid) {
            let fvb = this.findVideoById(this.vidid);
            if (fvb) {
                if (this.state.history.includes(this.vidid)) {
                    this.setState({vidIndex: this.state.history.indexOf(this.vidid), video: fvb});
                } else {
                    this.state.history.push(fvb.id);
                    this.setState({history: this.state.history, vidIndex: this.state.vidIndex + 1, video: fvb});
                }
            } else {
                this.setState({video: this.nextVideo()});
            }
        } else {
            this.setState({video: this.nextVideo()});
        }
    }

    previousVideo = function() {
        if (this.canBack()) {
            let prev = this.state.history[this.state.vidIndex - 1];
            window.history.pushState({video: prev}, "", "?v=" + prev);
            this.setState({vidIndex: this.state.vidIndex - 1, video: this.findVideoById(prev)});
        }
    }.bind(this);

    findVideoById(videoId) {
        for (let i = 0; i < this.videos.length; i++) {
            if (this.videos[i].id === videoId) {
                return this.videos[i];
            }
        }

        return false;
    }

    nextVideo = function(useAll = false) {
        // TODO: Add a way for videos to be excluded from next video but still loaded for history's sake (history only keeps id's so needs full records)
        // Actually it doesn't - we could just load the video using it's id but have 0 votes and make it unvoteable.
        let next;
        if (this.state.vidIndex >= this.state.history.length - 1 || useAll === true) {
            next = useAll === true ? this.randomAll() : this.randomUnwatched();
            if (next) {
                let history = useAll === true ? [] : this.state.history;
                history.push(next.id);
                store.set("history", history);
                window.history.pushState({video: next.id}, "", "?v=" + next.id);
                this.setState({history: history, vidIndex: this.state.vidIndex + 1, video: next});
            } else {
                window.history.pushState({video: null}, "", "?");
                this.setState({video: null, vidIndex: this.state.vidIndex + 1});
            }
        } else {
            next = this.findVideoById(this.state.history[this.state.vidIndex + 1]);
            window.history.pushState({video: next.id}, "", "?v=" + next.id);
            this.setState({video: {...next}, vidIndex: this.state.vidIndex + 1});
        }

        return next;
    }.bind(this);

    randomUnwatched() {
        let unwatched = this.getUnwatched();
        return unwatched[Math.floor(Math.random() * unwatched.length)];
    }

    randomAll() {
        return this.videos[Math.floor(Math.random() * this.videos.length)];
    }

    getUnwatched() {
        let unwatched = [];
        for (let i = 0; i < this.videos.length; i++) {
            if (!this.state.history.includes(this.videos[i].id)) {
                unwatched.push(this.videos[i]);
            }
        }
        return unwatched;
    }

    onVidEnd = function () {
        if (this.state.video.id !== null) {
            if (this.state.autoplay) {
                this.nextVideo();
            }
        }
    }.bind(this);

    canNext = function () {
        return this.getUnwatched().length > 0 || this.state.vidIndex < this.state.history.length;
    }.bind(this);

    resetWatched = function() {
        this.setState({video: this.nextVideo(true), vidIndex: 0});
        store.remove("history");
    }.bind(this);

    showYoutube() {
        if (this.state.video === "unloaded") {
            return <div className="youtube-box"><div><div className="yt-loading-bb" /></div></div>;
        } else if (this.state.video) {
            return (<div className="youtube-box">
                <h1>Shitpost Status</h1>
                <p>This is the text behind the video player, which plays shit post status (shitpost status) videos automatically.</p>
                <p>If you're seeing this, I've probably coded something wrong... sorry!</p>
                <p>Want to watch Shitpost Status videos, but without having to click through or wait a few seconds each time? If so, shitpost status is for you. I made this project with a friend as I was fed up of having the experience interrupted by the flow of youtube and I wanted it to feel more like a true compilation.</p>
                <p>An online Massively Multiplayer Youtube Compilation. Contribute and people will see your user icon when they play a shitpost status video you submitted!</p>
                <YouTube containerClassName="vid_box_box" onPlay={this.setYtPlayer} id="shit_post_status_vid" videoId={this.state.video.id} opts={{playerVars: {autoplay: 1}, host: "https://www.youtube-nocookie.com"}} onError={this.onVidEnd} onEnd={this.onVidEnd}/>
            </div>);
        } else {
            return (<div className="no-more-youtube-box">
                <h1>We've run out of videos to show you!</h1>
                <div><button onClick={this.resetWatched}>Click Here</button> to Reset your watch list and start again!</div>
            </div>);
        }
    }

    setYtPlayer = function(v) {
        this.setState({ytPlayer: v.target});
    }.bind(this);

    fancyButtonEnabled(hasVid, val) {
        return hasVid && this.state.video.myvoteweight !== val;
    }

    fancyButtonIsGreen(val) {
        return this.state.video && this.state.video !== "unloaded" && this.state.video.myvoteweight === val;
    }

    castVote = async function (weight) {
        const vid_id = this.state.video.id;
        this.setState({votes: false});

        const fd = new FormData();
        fd.set("weight", weight);
        fd.set("id", this.state.uuid);
        fd.set("video", this.state.video.id);
        const request = await axios.post("/videos/vote", fd);
        if (request.data !== false) {
            if (["-1", "0", "1"].includes(request.data.toString())) {
                if (this.state.video.id === vid_id) {
                    this.state.video.myvoteweight = request.data.toString();
                    this.videos[this.state.vidIndex].myvoteweight = request.data.toString();
                    this.setState({video: this.state.video});
                }
            }
        }
        this.setState({votes: true});
    }.bind(this);

    showYoutubeBasedFeatures() {
        let hasVid = this.state.video && this.state.video !== "unloaded";
        let voted = hasVid && (parseFloat(this.state.video.upvotes) + parseFloat(this.state.video.downvotes) > 0);
        return (<React.Fragment>
            <FancyButton icon={faArrowUp} enabled={this.fancyButtonEnabled(hasVid, "1")} isGreen={this.fancyButtonIsGreen("1")} onClick={() => this.castVote("1")}>Upvote</FancyButton>
            <FancyButton icon={faArrowDown} enabled={this.fancyButtonEnabled(hasVid, "-1")} isGreen={this.fancyButtonIsGreen("-1")} onClick={() => this.castVote("-1")}>Downvote</FancyButton>
            <FancyButton icon={faTimes} enabled={this.fancyButtonEnabled(hasVid, "0")} isGreen={this.fancyButtonIsGreen("0")} onClick={() => this.castVote("0")}>No Vote</FancyButton>
            {voted ? <div className="votes-info">
                <p>Upvotes: {this.state.video.upvotes}</p>
                <p>Downvotes: {this.state.video.downvotes}</p>
                <p>Liked: {(parseFloat(this.state.video.upvotes) / (parseFloat(this.state.video.upvotes) + parseInt(this.state.video.downvotes)) * 100).toFixed(0)} %</p>
            </div> : <div className="votes-info"><p>Upvotes: 0</p><p>Downvotes: 0</p><p>Liked: 0%</p></div>}

            <FancyButton iconElement={hasVid ? <span><Blockies seed={this.state.video.submitter} size={8} /></span> : <span className="blockies" /> } enabled={hasVid} onClick={this.backOnClick}>Contributor</FancyButton>
        </React.Fragment>);
    }

    canBack = function () {
        return this.state.vidIndex > 0;
    }.bind(this);

    toggleAutoplay = function () {
        this.setState({autoplay: !this.state.autoplay});
    }.bind(this);

    toggleSubmitDialog = function() {
        // Pause vid if opening
        if (this.state.ytPlayer && this.state.submitDialog === false) {
            this.state.ytPlayer.pauseVideo();
        }

        // Toggle
        this.setState({submitDialog: !this.state.submitDialog, submitResponse: "", submitLink: ""});
    }.bind(this);

    toggleUserDialog = function () {
        // Pause vid if opening
        if (this.state.ytPlayer && this.state.userDialog === false) {
            this.state.ytPlayer.pauseVideo();
        }
        this.setState({userDialog: !this.state.userDialog, showPassword: false});
    }.bind(this);

    handleInput = event => {
        this.setState({submitLink: event.target.value});
    }

    submitDialogSubmit = async event => {
        event.preventDefault();
        event.stopPropagation();
        const fd = new FormData();
        fd.set("id", this.state.uuid);
        fd.set("video", this.state.submitLink);
        const response = await axios.post("/videos/submit", fd);
        console.log(response.data);
        if (response.data === true) {
            this.setState({submitLink: "", submitResponse: "Successfully Added! Thanks!"});
        } else if (response.data === false) {
            this.setState({submitResponse: "Couldn't add - Please check the link!"});
        } else {
            this.setState({submitLink: "", submitResponse: "We already have this link, so you can't submit it!"});
        }
    }

    submitDialog() {
        return (<div className={"dialog-background" + (this.state.submitDialog ? "" : " hidden")}>
            <div className="dialog">
                <button className="close-btn" onClick={this.toggleSubmitDialog}>&times;</button>
                <h1>Submit a Video</h1>
                <p className="paragraph-fold">Add a "Shitpost Status" video to the website. 11-character video codes, youtu.be and youtube.com links accepted!</p>
                <form className="wide">
                    <div><label htmlFor="vid_url_sps">Youtube Link</label></div>
                    <div><input type="text" id="vid_url_sps" value={this.state.submitLink} onChange={this.handleInput} /></div>
                    <button onClick={this.submitDialogSubmit}>Submit</button>
                    <p>{this.state.submitResponse}</p>
                </form>
            </div>
        </div>);
    }

    userDialog() {
        return (<div className={"dialog-background" + (this.state.userDialog ? "" : " hidden")}>
            <div className="dialog">
                <button className="close-btn" onClick={this.toggleUserDialog}>&times;</button>
                <h1>Your account</h1>
                <p className="paragraph-fold">Copy your account details down here so you can log in elsewhere!</p>
                <form className="account">
                    <div><label htmlFor="name_identicon_box">Public Name</label></div>
                    <div className="image_and_text">
                        <Blockies seed={this.state.nameIdenticon} size={8} />
                        <input type="text" readOnly={true} id="name_identicon_box" value={this.state.nameIdenticon} />
                    </div>
                    <div className="gib_space"><label htmlFor="password_ll">Password (Login Link)</label></div>
                    <div className="show_hide_password_line">
                        <input value={window.location.origin + "?uuid=" + this.state.uuid} type={this.state.showPassword ? "text" : "password"} id="password_ll" readOnly={true} onChange={this.handleInput} />
                        <button onClick={this.onTogglePassword}><FontAwesomeIcon icon={faEye} /></button>
                    </div>
                    <label>or </label>{this.state.showPassword ? <span>Drag this link into your bookmarks -> <a href={"?uuid=" + this.state.uuid}>Shitpost Status</a></span> : "****"}
                </form>
            </div>
        </div>);
    }

    onTogglePassword = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.setState({showPassword: !this.state.showPassword});
    }.bind(this);

    render () {
        return (
            <div className="App">
                {this.showYoutube()}
                {this.submitDialog()}
                {this.userDialog()}
                <nav role="navigation" className="navbar">
                    <FancyButton icon={faStepBackward} enabled={this.canBack()} onClick={this.previousVideo}>Back</FancyButton>
                    <FancyButton icon={faStepForward} enabled={this.canNext()} onClick={this.nextVideo}>Forward</FancyButton>
                    {this.showYoutubeBasedFeatures()}
                    <FancyButton icon={this.state.autoplay ? faCheck : faTimes} enabled onClick={this.toggleAutoplay}>Autoplay</FancyButton>
                    <FancyButton icon={faPlus} enabled onClick={this.toggleSubmitDialog}>Submit Video</FancyButton>
                    <FancyButton onClick={this.toggleUserDialog} iconElement={<Blockies seed={this.state.nameIdenticon} size={8} />} enabled><span>Account</span></FancyButton>
                    {this.videos ? <div className="votes-info"><p>Videos Loaded: {this.videos.length}</p></div> : ""}
                    <div className="votes-info">
                        <p><a href="https://github.com/Snaddyvitch-Dispenser" rel="noopener noreferrer" target="_blank">Developer</a></p>
                        <p><a href="https://discord.gg/AKh4mwGsRz" rel="noopener noreferrer" target="_blank">Discord</a></p>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Video;
