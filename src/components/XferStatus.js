import Alert from 'react-bootstrap/Alert';

const XferStatus = (props) => {
    console.log(props);
    if (props.status == "Success!") {
        return (
            <Alert className="p-1" key="success" variant="success">
                {props.status}
            </Alert>
        );
    } else if (props.status) {
        return (
            <Alert lassName="p-1" key="warning" variant="warning">
                {props.status}
            </Alert>
        );
    }
}

export default XferStatus;