import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FancyButton(props) {
    return <button onClick={props.onClick} className={"fancy-button" + (props.isGreen ? " fancy-button--green" : "")} disabled={!props.enabled || false}>
        <div className="icon">{props.iconElement ? props.iconElement : <FontAwesomeIcon icon={props.icon} />}</div>
        <div className="text">{props.children}</div>
    </button>;
}

export default FancyButton;