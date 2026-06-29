const CustomerCard = ({
  customer,
  position,
  onServe,
  onComplete,
  onRemove,
  disabled,
}) => {
  const { id, name, status } = customer;

  return (
    <article className="customer-card">
      <div className="customer-card-header">
        {position != null && <span className="queue-position">#{position}</span>}
        <h3 className="customer-name">{name}</h3>
      </div>
      <div className="card-actions">
        {status === 'waiting' && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onServe(id)}
            disabled={disabled}
          >
            Being Served
          </button>
        )}
        {status === 'serving' && (
          <button
            type="button"
            className="btn btn-success"
            onClick={() => onComplete(id)}
            disabled={disabled}
          >
            Complete
          </button>
        )}
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => onRemove(id)}
          disabled={disabled}
        >
          Remove
        </button>
      </div>
    </article>
  );
};

export default CustomerCard;
