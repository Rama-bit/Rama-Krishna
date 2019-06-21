import React from 'react';
import PropTypes from 'prop-types';

export default function Wizard(props) {
    return (
        <div className="container">
            <h2>{props.header}</h2>
            {
                props.steps[props.curStep]({
                    onAction: props.onAction,
                    state: props.state,
                })
            }
        </div>
    );
}

Wizard.propTypes = {
    header: PropTypes.func.isRequired,
    steps: PropTypes.array.isRequired,
    state: PropTypes.object.isRequired,
    //onComplete: PropTypes.func.isRequired
};