import Transaction from './Transaction';
import {CardGroup} from "react-bootstrap";

const Transactions = (props) => {
    const activities = props.activity;
    if (props.activityCount > 0) {
        return (
            <div>
                <p>Last 4 Transactions</p>
                <CardGroup>
                { activities.slice(0).reverse().map((activity, index) => {
                    if (index < 4) {
                            return <Transaction trans={activity} key={index} />;
                    } else return null;
                })}
                </CardGroup>
            </div>
        );
    }
}

export default Transactions;