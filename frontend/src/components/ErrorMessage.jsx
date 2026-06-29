const ErrorMessage = ({ message, onDismiss, onRetry }) => {
  if (!message) return null;

  return (
    <div className="error-banner" role="alert">
      <p>{message}</p>
      <div className="error-actions">
        {onRetry && (
          <button type="button" className="btn btn-secondary" onClick={onRetry}>
            Retry
          </button>
        )}
        {onDismiss && (
          <button type="button" className="btn btn-secondary" onClick={onDismiss}>
            Dismiss
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
