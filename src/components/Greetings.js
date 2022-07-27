import Alert from 'react-bootstrap/Alert';

const Greetings = (props) => {
    console.log(props);
    if (props.connected) {
        return (
            <Alert className="p-1" key="success" variant="success">
                Connected as {props.walletAddr}
            </Alert>
        );
    } else if (props.connected != null) {
        return (
            <Alert key="danger" variant="danger">
                Connection Failed!
            </Alert>
        );
    }
}

export default Greetings;