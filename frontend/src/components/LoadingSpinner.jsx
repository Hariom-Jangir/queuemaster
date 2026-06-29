const LoadingSpinner = ({ message = 'Loading...' }) => (
  <div className="loading" role="status" aria-live="polite">
    <div className="spinner" aria-hidden="true" />
    <p>{message}</p>
  </div>
);

export default LoadingSpinner;
