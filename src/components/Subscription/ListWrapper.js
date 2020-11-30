import React from 'react';
import { Link } from 'react-router-dom';
import { Alert, Spinner, Table } from 'reactstrap';
import statusParser from '../../helpers/statusParser'
import moment from 'moment';

function SubscriptionListWrapper(props) {
  const { subscriptions, loading } = props;

  if (loading) {
    return (
      <Spinner color="secondary" />
    );
  }

  if (!subscriptions.length) {
    return (
      <Alert color="warning">
        There is no subscriptions, yet!
      </Alert>
    );
  }

  return (
    <Table>
      <thead>
        <tr>
          <th>Project</th>
          <th>Date of subscription</th>
          <th>Status</th>
          <th className="text-right">Actions</th>
        </tr>
      </thead>

      <tbody>
        {
          subscriptions.map(subscription => {
            return (
              <tr key={subscription.id}>
                <td>{subscription.ico_subscribed[0].ico.name}</td>
                <td>{moment(subscription.date_of_subscription).format('L')}</td>
                <td>{statusParser(subscription.status)}</td>
                <td className="text-right">
                  {
                    subscription.status !== 'subscription_pending'
                    &&
                    <Link to={`/subscription/payment-status/${subscription.id}`} className="btn btn-outline-primary mr-1">Payment status</Link>
                  }
                  <Link to={`/subscription/${subscription.id}`} className="btn btn-primary">Edit</Link>
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </Table>
  );
}

export default SubscriptionListWrapper;
