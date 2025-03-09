import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types"; // Import PropTypes

// Create Context
const TransactionContext = createContext();

// Context Provider Component
export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  return (
    <TransactionContext.Provider value={{ transactions, setTransactions }}>
      {children}
    </TransactionContext.Provider>
  );
};

// PropTypes Validation
TransactionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom Hook for Easy Access
export const useTransactions = () => {
  return useContext(TransactionContext);
};
