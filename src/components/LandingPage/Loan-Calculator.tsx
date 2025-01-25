import { Calculator } from 'lucide-react'
import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

function LoanCalculator() {
    return (
        <section className="py-16 px-6 bg-gray-50 rounded-t-3xl">
            <h2 className="text-4xl font-bold text-center mb-10 flex items-center justify-center gap-3 text-gray-900">
                <Calculator className="w-10 h-10 text-blue-600" />
                Loan Calculator
            </h2>
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-xl">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label className="block mb-3 text-sm font-semibold text-gray-700">Select Loan Category</label>
                        <Select>
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
                    <div>
                        <label className="block mb-3 text-sm font-semibold text-gray-700">Initial Deposit (PKR)</label>
                        <Input
                            type="number"
                            placeholder="Enter amount"
                            className="bg-white border-gray-300 text-gray-800 placeholder-gray-400"
                        />
                    </div>
                    <div>
                        <label className="block mb-3 text-sm font-semibold text-gray-700">Loan Period (Years)</label>
                        <Input
                            type="number"
                            placeholder="Enter loan period"
                            className="bg-white border-gray-300 text-gray-800 placeholder-gray-400"
                        />
                    </div>
                    <Button className="col-span-2 bg-blue-600 px-8 py-4 font-semibold text-lg rounded-full hover:bg-blue-700 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center gap-2 text-white">
                        Calculate <Calculator className="w-5 h-5" />
                    </Button>
                </form>
            </div>
        </section>
    )
}

export default LoanCalculator