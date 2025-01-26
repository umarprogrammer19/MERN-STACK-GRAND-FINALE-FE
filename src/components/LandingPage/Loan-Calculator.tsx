import { Calculator } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import UserDetailsPopup from './userDetailsPopUp';

const LoanCalculator: React.FC = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [category, setCategory] = useState<string>('');
    const [subcategory, setSubCategory] = useState<string>('');
    const [loanAmount, setLoanAmount] = useState<string>('');
    const [loanPeriod, setLoanPeriod] = useState<string>('');

    const subCategories: Record<string, string[]> = {
        wedding: ['Valima', 'Furniture', 'Valima Food', 'Jahez'],
        home: ['Structure', 'Finishing', 'Loan'],
        business: ['Buy Stall', 'Advance Rent for Shop', 'Shop Assets', 'Shop Machinery'],
        education: ['University Fees', 'Child Fees Loan'],
    };

    const maxLoanAmounts: Record<string, number> = {
        wedding: 500000,
        home: 1000000,
        business: 1000000,
        education: Number.MAX_VALUE, // No maximum defined
    };

    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!category || !subcategory || !loanAmount || !loanPeriod) {
            alert('Please fill all fields.');
            return;
        }

        const loanAmountValue = parseFloat(loanAmount);
        const loanPeriodValue = parseInt(loanPeriod, 10);

        if (loanAmountValue > maxLoanAmounts[category]) {
            alert(`Maximum loan amount for ${category} is PKR ${maxLoanAmounts[category]}.`);
            return;
        }

        const loanDetails = {
            category,
            subcategory,
            amount: loanAmountValue,
            loanPeriod: loanPeriodValue,
        };

        localStorage.setItem('loanDetail', JSON.stringify(loanDetails));
        setIsPopupOpen(true);
    };

    return (
        <section className="py-16 px-6 bg-gray-50 rounded-t-3xl">
            <h2 className="text-4xl font-bold text-center mb-10 flex items-center justify-center gap-3 text-gray-900">
                <Calculator className="w-10 h-10 text-blue-600" />
                Loan Calculator
            </h2>
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-xl">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleCalculate}>
                    <div>
                        <label className="block mb-3 text-sm font-semibold text-gray-700">Select Loan Category</label>
                        <Select onValueChange={(value) => setCategory(value)}>
                            <SelectTrigger className="bg-white border-gray-300 text-gray-800">
                                <SelectValue placeholder="Choose a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="wedding">Wedding Loans</SelectItem>
                                <SelectItem value="home">Home Construction</SelectItem>
                                <SelectItem value="business">Business Startup</SelectItem>
                                <SelectItem value="education">Education Loans</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {category && (
                        <div>
                            <label className="block mb-3 text-sm font-semibold text-gray-700">Select Subcategory</label>
                            <Select onValueChange={(value) => setSubCategory(value)}>
                                <SelectTrigger className="bg-white border-gray-300 text-gray-800">
                                    <SelectValue placeholder="Choose a subcategory" />
                                </SelectTrigger>
                                <SelectContent>
                                    {subCategories[category].map((subCat, index) => (
                                        <SelectItem key={index} value={subCat}>
                                            {subCat}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                    <div>
                        <label className="block mb-3 text-sm font-semibold text-gray-700">Loan Amount (PKR)</label>
                        <Input
                            type="number"
                            placeholder="Enter loan amount"
                            className="bg-white border-gray-300 text-gray-800 placeholder-gray-400"
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block mb-3 text-sm font-semibold text-gray-700">Loan Period (Years)</label>
                        <Input
                            type="number"
                            placeholder="Enter loan period"
                            className="bg-white border-gray-300 text-gray-800 placeholder-gray-400"
                            value={loanPeriod}
                            onChange={(e) => setLoanPeriod(e.target.value)}
                        />
                    </div>
                    <Button
                        type="submit"
                        className="col-span-2 bg-blue-600 px-8 py-4 font-semibold text-lg rounded-full hover:bg-blue-700 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center gap-2 text-white"
                    >
                        Save Loan Details
                    </Button>
                </form>
            </div>
            {isPopupOpen && <UserDetailsPopup onClose={() => setIsPopupOpen(false)} />}
        </section>
    );
};

export default LoanCalculator;
