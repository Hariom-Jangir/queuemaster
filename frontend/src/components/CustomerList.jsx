import StatusColumn from './StatusColumn.jsx';

const groupByStatus = (customers) => ({
  waiting: customers.filter((c) => c.status === 'waiting'),
  serving: customers.filter((c) => c.status === 'serving'),
  completed: customers.filter((c) => c.status === 'completed'),
});

const CustomerList = ({
  customers,
  onServe,
  onComplete,
  onRemove,
  disabled,
}) => {
  const groups = groupByStatus(customers);

  return (
    <div className="customer-list">
      <StatusColumn
        title="Waiting"
        customers={groups.waiting}
        showPosition
        onServe={onServe}
        onComplete={onComplete}
        onRemove={onRemove}
        disabled={disabled}
      />
      <StatusColumn
        title="Being Served"
        customers={groups.serving}
        onServe={onServe}
        onComplete={onComplete}
        onRemove={onRemove}
        disabled={disabled}
      />
      <StatusColumn
        title="Completed"
        customers={groups.completed}
        onServe={onServe}
        onComplete={onComplete}
        onRemove={onRemove}
        disabled={disabled}
      />
    </div>
  );
};

export default CustomerList;
