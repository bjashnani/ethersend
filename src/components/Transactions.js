import Transaction from './Transaction';

const Transactions = (props) => {
    const activities = props.activity;
    if (props.activityCount > 0) {
        return (
            <div>
                <p>Last 4 Transactions</p>
                {activities.map((activity, index) => {
                    if (index > props.activityCount - 5)
                        return <Transaction trans={activity} key={index} />
                })}
            </div>
        );
    } else {
    }
}

export default Transactions;