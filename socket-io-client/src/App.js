import React, {Component} from "react";
import socketIOClient from "socket.io-client";
import ReactSpeedometer from "react-d3-speedometer"

class App extends Component {
    constructor() {
        super();
        this.state = {
            response: 0,
            endpoint: "http://127.0.0.1:4001"
        };
    }
    //connet to socket on component load
    componentDidMount() {
        const {endpoint} = this.state;
        //Very simple connection to the socket
        const socket = socketIOClient(endpoint);
        //Listen for data on the "outgoing data" namespace and supply a callback for what to do when we get one. In this case, we set a state variable
        socket.on("outgoing data", data => this.setState({response: data}));
    }
    render() {
        const {response} = this.state;
        return (
            <div style={{textAlign: "center"}}>
                <ReactSpeedometer
                    maxValue={140}
                    value={response}
                    needleColor="black"
                    startColor="orange"
                    segments={10}
                    endColor="red"
                    needleTransition={"easeElastic"}
                    ringWidth={30}
                    textColor={"red"} 
                />
            </div>
        )
    }
}

export default App;