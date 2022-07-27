import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import truncateEthAddress from 'truncate-eth-address'
import { ethers } from "ethers";


const Transaction = (props) => {
    console.log("In Transaction");
    if (props) {
        const blockTime = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(props.trans.timestamp*1000);
    return (
        <div className="card border-primary mb-3" key={props.trans.timestamp}>
            <div className="card-header text-danger">{ethers.utils.formatEther(props.trans.amt)} ETH transferred</div>
            <div className="card-body text-primary">
                {/* <h6 className="card-title">Time: {blockTime}</h6> */}
                <p className="card-text">From: {truncateEthAddress(props.trans.from)}</p>
                <p className="card-text">To: {truncateEthAddress(props.trans.to)}</p>
                <p className="card-text">Memo: {props.trans.memo}</p>
                <p className="card-subtitle">{blockTime}</p>
            </div>
        </div>
    );
    } else {
        return (<p>Nothing to print</p>);
    }
}

export default Transaction;