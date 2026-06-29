import CustomerCard from './CustomerCard.jsx';

const StatusColumn = ({
  title,
  customers,
  showPosition = false,
  onServe,
  onComplete,
  onRemove,
  disabled,
}) => (
  <section className="status-column">
    <header className="column-header">
      <h2>{title}</h2>
      <span className="count">{customers.length}</span>
    </header>
    <div className="column-body">
      {customers.length === 0 ? (
        <p className="empty-message">No customers</p>
      ) : (
        customers.map((customer, index) => (
          <CustomerCard
            key={customer.id}
            customer={customer}
            position={showPosition ? index + 1 : undefined}
            onServe={onServe}
            onComplete={onComplete}
            onRemove={onRemove}
            disabled={disabled}
          />
        ))
      )}
    </div>
  </section>
);

export default StatusColumn;
