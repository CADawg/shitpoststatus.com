import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class FancyButton extends React.Component {
    render () {
        return <button onClick={this.props.onClick}
                       className={"fancy-button" + (this.props.isGreen ? " fancy-button--green" : "")}
                       disabled={!this.props.enabled || false}>
            <div className="icon">{this.props.iconElement ? this.props.iconElement : <FontAwesomeIcon icon={this.props.icon}/>}</div>
            <div className="text">{this.props.children}</div>
        </button>;
    }
}

export default FancyButton;