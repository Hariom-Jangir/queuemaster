import { useState } from 'react';

const CustomerForm = ({ onAdd, disabled }) => {
  const [name, setName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    try {
      await onAdd(trimmed);
      setName('');
    } catch {
      // Error is handled by useCustomers
    }
  };

  return (
    <form className="customer-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Customer name"
        maxLength={50}
        disabled={disabled}
        aria-label="Customer name"
      />
      <button type="submit" className="btn btn-primary" disabled={disabled || !name.trim()}>
        Add Customer
      </button>
    </form>
  );
};

export default CustomerForm;
