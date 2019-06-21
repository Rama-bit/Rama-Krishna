import React from 'react';
import PropTypes from 'prop-types';
import './app.css';
import Wizard from './core/components/wizard/wizard';
import 'bootstrap/dist/css/bootstrap.css';


const ShippingOption = {
    ground: 1,
    priority: 2
};
const shippingRate = 0.40;

function shippingCost(weight, shippingRate, shippingOption) {
    return weight * shippingRate *
        (shippingOption === ShippingOption.ground ? 1 : 1.5);
}

const WizardAction = {
    prev: 1,
    next: 2,
    end: 3,
    setToName: 4,
    setToStreet: 5,
    setToCity: 6,
    setToState: 7,
    setToZip: 8,
    setFromName: 10,
    setFromStreet: 11,
    setFromCity: 12,
    setFromState: 13,
    setFromZip: 14,
    setWeight: 20,
    setGround:21,
    setPriority:22,
};
export default class ShippingLabelMaker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isComplete: false,
            curStep: 0,
            from: {
                name: "John Smith",
                street: "131 Dartmouth St",
                city: "Boston",
                state: "MA",
                zip: "02116"
            }, to: {
                name: "Linda Jackson",
                street: "40 Fulton St",
                city: "New York",
                state: "NY",
                zip: "10038"
            },
            weight: 2,
            shippingOption: {
                ground: 1,
                priority: 2
            }
        }
        this.handleAction = this.handleAction.bind(this);
        this.getHeader = this.getHeader.bind(this);
    }

    getHeader() {
        return [
            "Enter Sender's Address",
            "Enter Reciever's Address",
            "Enter Weight",
            "Get Shipping Option ",
        ][this.state.curStep];
    }

    onComplete() {
        this.setState({
            isComplete: true
        })
    }

    handleAction({type, value}) {
        switch (type) {
            case WizardAction.prev:
                this.setState({
                    curStep: Math.max(0, this.state.curStep - 1)
                })
                break;
            case WizardAction.next:
                this.setState({
                    curStep: Math.min(4, this.state.curStep + 1)
                })
                break;
            case WizardAction.setFromName:
                this.setState({
                    from: {
                        name: value
                    }
                })
                break;
            case WizardAction.setFromStreet:
                this.setState({
                    from: {
                        street: value
                    }
                })
                break;
            case WizardAction.setFromCity:
                this.setState({
                    from: {
                        city: value
                    }
                })
                break;
            case WizardAction.setFromState:
                this.setState({
                    from: {
                        state: value
                    }
                })
                break;
            case WizardAction.setFromZip:
                this.setState({
                    from: {
                        zip: value
                    }
                })
                break;
            case WizardAction.setToName:
                this.setState({
                    to: {
                        name: value
                    }
                })
                break;
            case WizardAction.setToStreet:
                this.setState({
                    to: {
                        street: value
                    }
                })
                break;
            case WizardAction.setToCity:
                this.setState({
                    to: {
                        city: value
                    }
                })
                break;
            case WizardAction.setToState:
                this.setState({
                    from: {
                        state: value
                    }
                })
                break;
            case WizardAction.setToZip:
                this.setState({
                    from: {
                        zip: value
                    }
                })
                break;
            case WizardAction.setWeight:
                this.setState({
                    weight: value
                })
                break;
            case WizardAction.setGround:
                this.setState({
                    shippingOption: {
                        ground: value
                    }
                })
                break;
            case WizardAction.setPriority:
                this.setState({
                    shippingOption: {
                        priority: value
                    }
                })
                break;
            case WizardAction.end:
                this.onComplete();
                break;
            default:
                break;
        }
    }

    render() {
        const appStyle = {
            width: '50%',
            border: 'solid 1px #ccc',
            padding: '1em',
            margin: '1em auto',
            boxShadow: '4px 5px 4px rgb(0,0,0,0.3)',
        };
        const progressPct = 100 * (this.state.curStep + 1) / 5;
        let content;
        if (this.state.isComplete) {
            content = (
                <ShippingLabel state={this.state}>
                </ShippingLabel>
            );
        } else {
            content = (
                <div>
                    <h1>Shipping Label Maker</h1>
                    <div className="progress">
                        <div className="progress-bar"
                             style={{width: `${progressPct}%`}}
                             role="progressbar"
                             aria-valuenow={progressPct}
                             aria-valuemin="0"
                             aria-valuemax="100">
                        </div>
                    </div>
                    <Wizard
                        header={this.getHeader}
                        steps={[Step1, Step2, Step3, Step4, Step5]}
                        curStep={this.state.curStep}
                        onAction={this.handleAction}
                        state={this.state}
                    >
                    </Wizard>
                </div>
            );
        }
        return <div className="App" style={appStyle}>
            {content}
        </div>

    }
}



function ShippingLabel(props){
    let cost = props.state.weight * shippingRate *
    (props.state.shippingOption.ground === props.state.shippingOption.priority ? 1 : 1.5);
    cost = cost.toFixed(2);

    return (
        <div className="container">
            <div className="col-12"><button onClick={() => window.print()}>Print this page</button></div>
            <h2>shipping label</h2>
            <div className="col-8 mb-3">
                <span class="badge badge-pill badge-light">Weight:</span>{props.state.weight} Lbs
            </div>
            <div className="col-8 mb-3">
            <span class="badge badge-pill badge-light">Ground:</span>{props.state.shippingOption.ground}
            </div>
            <div className="col-8 mb-3">
            <span class="badge badge-pill badge-light">Priority:</span>{props.state.shippingOption.priority}
            </div>
            <div className="col-8 mb-3">
            <span class="badge badge-pill badge-light">Shipping Cost:</span>${cost}
            </div>
            <div className="row">
                <div className="col-md-6">
                </div>
                <div className="col-md-6">
                   <div className="row"> <h4>To</h4></div>
                   <div className="row">
                    <address>
                        <strong>{props.state.to.name}</strong><br/>
                        {props.state.to.street},<br/>
                        {props.state.to.city},<br/>
                        {props.state.to.state} - 
                        {props.state.to.zip}
                    </address>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                <div className="row"> 
                <h4>From</h4>
                </div>
                <div className="row"> 
                    <address>
                        <strong>{props.state.from.name}</strong><br/>
                        {props.state.from.street},<br/>
                        {props.state.from.city},<br/>
                        {props.state.from.state} - 
                        {props.state.from.zip}
                    </address>
                    </div>
                </div>
                <div className="col-md-6">
                </div>
            </div>
        </div>
    );
    
}

function Step1(props) {
    const state = props.state;
    return (
        <div className={"container"}>     
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Name:</span>
                </div>
                <input
                    className="form-control"
                    value={state.from.name}
                    onChange={(ev) => {
                        ev.preventDefault()
                        props.onAction({
                            type: WizardAction.setFromName,
                            value: ev.target.value
                        })
                    }}
                />
            </div>
          
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Street:</span>
                </div>
                <input
                    className="form-control"
                    value={state.from.street}
                    onChange={(ev) => props.onAction({
                        type: WizardAction.setFromStreet,
                        value: ev.target.value
                    })}
                />
            </div>
            <div className="row mb-3">
            <div className="input-group col-md-4">
                <div className="input-group-prepend">
                    <span className="input-group-text">City:</span>
                </div>
                <input
                    className="form-control"
                    value={state.from.city}
                    onChange={(ev) => props.onAction({
                        type: WizardAction.setFromCity,
                        value: ev.target.value
                    })}
                />
            </div>
            <div className="input-group col-md-4">
                <div className="input-group-prepend">
                    <span className="input-group-text">State:</span>
                </div>
                <input
                    className="form-control"
                    value={state.from.state}
                    onChange={(ev) => props.onAction({
                        type: WizardAction.setFromState,
                        value: ev.target.value
                    })}
                />
            </div>
            <div className="input-group col-md-4">
                <div className="input-group-prepend">
                    <span className="input-group-text">Zip:</span>
                </div>
                <input
                    className="form-control"
                    value={state.from.zip}
                    onChange={(ev) => props.onAction({
                        type: WizardAction.setFromZip,
                        value: ev.target.value
                    })}
                />
            </div>
            </div>
            <div>
                <button class="btn btn-secondary"
                    onClick={() => props.onAction({
                        type: WizardAction.next
                    })}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

Step1.propTypes = {
    state: PropTypes.object.isRequired,
    onAction: PropTypes.func.isRequired
};

function Step2(props) {
    return (
        <div className="container">

           <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Name:</span>
                </div>
                <input
                className="form-control"
                value={props.state.to.name}
                onChange={(ev) => props.onAction({
                    type: WizardAction.setToName,
                    value: ev.target.value
                })}
            />
            </div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Street:</span>
                </div>
                <input
                    className="form-control"
                    value={props.state.to.street}
                    onChange={(ev) => props.onAction({
                        type: WizardAction.setToStreet,
                        value: ev.target.value
                    })}
                />
            </div>
            <div className="row mb-3">
            <div className="input-group col-md-4">
                <div className="input-group-prepend">
                    <span className="input-group-text">City:</span>
                </div>
                <input
                    className="form-control"
                    value={props.state.to.city}
                    onChange={(ev) => props.onAction({
                        type: WizardAction.setToCity,
                        value: ev.target.value
                    })}
                />
            </div>
            <div className="input-group col-md-4">
                <div className="input-group-prepend">
                    <span className="input-group-text">State:</span>
                </div>
                <input
                    className="form-control"
                    value={props.state.to.state}
                    onChange={(ev) => props.onAction({
                        type: WizardAction.setToState,
                        value: ev.target.value
                    })}
                />
            </div>
            <div className="input-group col-md-4">
                <div className="input-group-prepend">
                    <span className="input-group-text">Zip:</span>
                </div>
                <input
                    className="form-control"
                    value={props.state.to.zip}
                    onChange={(ev) => props.onAction({
                        type: WizardAction.setToZip,
                        value: ev.target.value
                    })}
                />
            </div>
            </div>
            <div className="row">
            `<div className="col-md-3"></div>
                <div className="col-md-3">
                <button class="btn btn-secondary"
                    onClick={() => props.onAction({
                        type: WizardAction.prev
                    })}
                >
                    Previous
                </button>
                </div>
                <div className="col-md-3">
                <button class="btn btn-secondary"
                    onClick={() => props.onAction({
                        type: WizardAction.next
                    })}
                >
                    Next
                </button>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    );
}

Step2.propTypes = {
    state: PropTypes.object.isRequired,
    onAction: PropTypes.func.isRequired
};

function Step3(props) {
    return (
        <div className="container">
        <div className="row">
           <div className="col-4">&nbsp;</div>
           <div className="input-group mb-3 col-4">
                <div className="input-group-prepend">
                    <span className="input-group-text">Weight:</span>
                </div>
                <input
                type="number"
                className="form-control"
                value={props.state.weight}
                onChange={(ev) => props.onAction({
                    type: WizardAction.setWeight,
                    value: ev.target.value
                })}/>
            </div>
            </div>
            <div className="row">
            `<div className="col-md-3"></div>
                <div className="col-md-3">
                <button class="btn btn-secondary"
                    onClick={() => props.onAction({
                        type: WizardAction.prev
                    })}
                >
                    Previous
                </button>
                </div>
                <div className="col-md-3">
                <button class="btn btn-secondary"
                    onClick={() => props.onAction({
                        type: WizardAction.next
                    })}
                >
                    Next
                </button>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    );
}

function Step4(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-3">&nbsp;</div>
                <div className="input-group mb-3 col-6">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Shipping:</span>
                    </div>
                    <select data-id="shippingOption" data-step="shipping"
                        className="form-control"
                        onChange={(ev) => props.onAction({
                            type: WizardAction.setGround,
                            value: ev.target.value
                        })}
                    >
                        <option value={props.state.shippingOption.ground}>Ground</option>
                    </select>
                </div>
            </div>
            <div className="row">
                <div className="col-3">&nbsp;</div>
                <div className="input-group mb-3 col-6">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Priority:</span>
                    </div>
                    <select data-id="shippingOption" data-step="priority"
                        className="form-control"
                        onChange={(ev) => props.onAction({
                            type: WizardAction.setPriority,
                            value: ev.target.value
                        })}
                    >
                        <option value={props.state.shippingOption.priority}>Express</option>
                    </select>
                </div>
            </div>
            <div className="row">
            `<div className="col-md-3"></div>
                <div className="col-md-3">
                <button class="btn btn-secondary"
                    onClick={() => props.onAction({
                        type: WizardAction.prev
                    })}
                >
                    Previous
                </button>
                </div>
                <div className="col-md-3">
                <button class="btn btn-secondary"
                    onClick={() => props.onAction({
                        type: WizardAction.next
                    })}
                >
                    Next
                </button>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    );
}

function Step5(props) {
    let cost = props.state.weight * shippingRate *
    (props.state.shippingOption.ground === props.state.shippingOption.priority ? 1 : 1.5);
    cost = cost.toFixed(2);
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <h4>Sender's Address</h4>
                    <address>
                        <strong>{props.state.from.name}</strong><br/>
                        {props.state.from.street},<br/>
                        {props.state.from.city},<br/>
                        {props.state.from.state} - 
                        {props.state.from.zip}
                    </address>
                </div>
                <div className="col-md-6">
                    <h4>Reciever's Address</h4>
                    <address>
                        <strong>{props.state.to.name}</strong><br/>
                        {props.state.to.street},<br/>
                        {props.state.to.city},<br/>
                        {props.state.to.state} - 
                        {props.state.to.zip}
                    </address>
                </div>
            </div>
            <div className="col-8 mb-3">
            <span class="badge badge-pill badge-light">Weight:</span>{props.state.weight} Lbs
            </div>
            <div className="col-8 mb-3">
            <span class="badge badge-pill badge-light">Ground:</span>{props.state.shippingOption.ground}
            </div>
            <div className="col-8 mb-3">
            <span class="badge badge-pill badge-light">Priority:</span>{props.state.shippingOption.priority}
            </div>
            <div className="col-8 mb-3">
            <span class="badge badge-pill badge-light">Shipping Cost:</span>${cost}
            </div>

            <div className="row">
            `<div className="col-md-3"></div>
                <div className="col-md-3">
                <button class="btn btn-secondary"
                    onClick={() => props.onAction({
                        type: WizardAction.prev
                    })}
                >
                    Previous
                </button>
                </div>
                <div className="col-md-3">
                <button class="btn btn-secondary"
                    onClick={() => props.onAction({
                        type: WizardAction.end
                    })}
                >
                    Complete
                </button>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    );
}