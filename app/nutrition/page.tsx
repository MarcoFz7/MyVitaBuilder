import './page.css'

import { Inter } from 'next/font/google';

const inter = Inter({weight: '400', style: "normal", subsets: ["latin"]})

const Page = () => {
  
  return (
    <div className="nutrition-page">
      <div className="page-manual-calculator"></div>
      <div className="page-ai-calculator">
        <span className={`${inter.className} ai-calculator-header`}>
          Get <strong>better results</strong> through your meals and preparation using <strong>AI</strong>!
        </span>
        <div className={`${inter.className} ai-calculator-info`}>
        <label className="block mb-2 text-sm text-white-900 text-sm">Please configure this section accordingly.</label>
          <div className='weight-objective mb-1 ml-1'>
            <div className="flex items-center">
              <input id="weight-loss-radio" title='weight-loss-radio' type="radio" value="" name="weight-radio" className="w-4 h-4 focus:ring-2 pb-2"></input>
              <label htmlFor="weight-loss-radio" className="ms-1 text-sm font-medium pb-1">Weight Loss</label>
            </div>
            <div className="flex items-center">
              <input id="weight-gain-radio" title='weight-gain-radio' type="radio" value="" name="weight-radio" className="w-4 h-4 focus:ring-2"></input>
              <label htmlFor="weight-gain-radio" className="ms-1 text-sm font-medium pb-1">Weight Gain</label>
            </div>
          </div>
          <select title='objective' id="objective" className="ml-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-black-500 focus:border-black-500 block w-auto p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500">
            <option value="" hidden>Meal objective&nbsp;&nbsp;&nbsp;</option>
            <option value="WG">Weight Gain</option>
            <option value="WL">Weight Loss</option>
          </select>
        </div>
      </div>
      <div className="page-written-calculator"></div>
    </div>
  );
};
  
export default Page;