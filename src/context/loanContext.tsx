import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define Loan Details Type
interface LoanDetails {
    category: string;
    deposit: number;
    loanPeriod: number;
    totalAmount: number;
    monthlyInstallment: number;
}

// Context State Type
interface LoanCalculatorContextType {
    loanDetails: LoanDetails | null;
    setLoanDetails: (details: LoanDetails) => void;
}

// Create Context
const LoanCalculatorContext = createContext<LoanCalculatorContextType | undefined>(undefined);

// Provider Props Type
interface LoanCalculatorProviderProps {
    children: ReactNode;
}

// LoanCalculatorProvider
export const LoanCalculatorProvider: React.FC<LoanCalculatorProviderProps> = ({ children }) => {
    const [loanDetails, setLoanDetails] = useState<LoanDetails | null>(null);

    return (
        <LoanCalculatorContext.Provider value={{ loanDetails, setLoanDetails }}>
            {children}
        </LoanCalculatorContext.Provider>
    );
};

// Custom Hook to use the Context
export const useLoanCalculator = (): LoanCalculatorContextType => {
    const context = useContext(LoanCalculatorContext);
    console.log(context);
    if (!context) {
        throw new Error('useLoanCalculator must be used within a LoanCalculatorProvider');
    }
    return context;
};
