import CustomerForm from './components/CustomerForm.jsx';
import CustomerList from './components/CustomerList.jsx';
import ErrorMessage from './components/ErrorMessage.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';
import { useCustomers } from './hooks/useCustomers.js';

const App = () => {
  const {
    customers,
    isLoading,
    isBusy,
    error,
    setError,
    loadCustomers,
    addCustomer,
    changeStatus,
    removeCustomer,
  } = useCustomers();

  const handleServe = (id) => changeStatus(id, 'serving');
  const handleComplete = (id) => changeStatus(id, 'completed');

  return (
    <div className="app">
      <header className="app-header">
        <h1>QueueMaster</h1>
        <p className="subtitle">Manage your customer waiting queue</p>
      </header>

      <main className="app-main">
        <ErrorMessage
          message={error}
          onDismiss={() => setError(null)}
          onRetry={loadCustomers}
        />

        <CustomerForm onAdd={addCustomer} disabled={isBusy} />

        {isLoading ? (
          <LoadingSpinner message="Loading customers..." />
        ) : (
          <CustomerList
            customers={customers}
            onServe={handleServe}
            onComplete={handleComplete}
            onRemove={removeCustomer}
            disabled={isBusy}
          />
        )}
      </main>
    </div>
  );
};

export default App;
