"use client"

import './page.css'

import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { FaDrumstickBite, FaUser, FaReceipt } from "react-icons/fa";
import { IoScanSharp  } from "react-icons/io5";
import { RiRobot2Fill } from "react-icons/ri";
import { Inter } from 'next/font/google';

const inter = Inter({weight: '400', style: "normal", subsets: ["latin"]});
const animatedComponents = makeAnimated();

interface Option {
  label: string;
  value: string;
}

const userAllergiesAndIntolerancesOptions: Option[] = [
  { value: 'Citrus Fruit', label: 'Citrus Fruit' },
  { value: 'Egg', label: 'Egg' },
  { value: 'Fish', label: 'Fish' },
  { value: 'Gluten/Celiac', label: 'Gluten/Celiac' },
  { value: 'Lactose', label: 'Lactose' },
  { value: 'Milk', label: 'Milk' },
  { value: 'Peanut', label: 'Peanut' },
  { value: 'Sesame', label: 'Sesame' },
  { value: 'Shellfish', label: 'Shellfish' },
  { value: 'Soy', label: 'Soy' },
  { value: 'Tree nut', label: 'Tree nut' },
  { value: 'Wheat', label: 'Wheat' }
]

const mealObjectiveOptions: Option[] = [
  { value: 'Fat Loss', label: 'Fat Loss' },
  { value: 'Hypertrophy', label: 'Hypertrophy' },
  { value: 'Mood Enhancement', label: 'Mood Enhancement' },
  { value: 'Performance', label: 'Performance' },
  { value: 'Recovery', label: 'Recovery' },
  { value: 'Strength', label: 'Strength' }
]

const mealDietaryOptions: Option[] = [
  { value: 'Mediterranean', label: 'Mediterranean' },
  { value: 'Keto', label: 'Keto' },
  { value: 'Low-Carb', label: 'Low-Carb' },
  { value: 'Paleo', label: 'Paleo' },
  { value: 'Vegan', label: 'Vegan' },
  { value: 'Vegeterian', label: 'Vegeterian' },
  { value: 'Zone', label: 'Zone' }
]

const mealCaloricIntakeOptions: Option[] = [
  { value: 'Very Low', label: '<500 kcal' },
  { value: 'Low', label: '500-700 kcal' },
  { value: 'Moderate', label: '700-900 kcal' },
  { value: 'High', label: '900-1200 kcal' },
  { value: 'Very High', label: '>1200 kcal' }
]

const Page = () => {
  const [isWeightLossSelected, setisWeightLossSelected] = useState<boolean>(false);
  const [isWeightGainSelected, setisWeightGainSelected] = useState<boolean>(false);
  const [selectedMealObjectiveOptions, setSelectedMealObjectiveOptions] = useState<Option[]>([]);
  const [selectedDietaryOption, setSelectedDietaryOption] = useState<Option[]>([]);
  const [selectedCalorieIntakeOption, setSelectedCalorieIntakeOption] = useState<Option[]>([]);
  const [selectedAllergiesAndIntoleranceOptions, setSelectedAllergiesAndIntoleranceOptions] = useState<Option[]>([]);
  const [ingredientsTextAreaValue, setIngredientsTextAreaValue] = useState<string>("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleWeightLossRadioClick = () => {
    if (isWeightGainSelected) {
      setisWeightGainSelected(!isWeightGainSelected);
    }
    setisWeightLossSelected(!isWeightLossSelected);
  };

  const handleWeightGainRadioClick = () => {
    if (isWeightLossSelected) {
      setisWeightLossSelected(!isWeightLossSelected);
    }
    setisWeightGainSelected(!isWeightGainSelected);
  };

  const handleSelectMealObjectives = (selectedValues: any) => {
    setSelectedMealObjectiveOptions(selectedValues);
  };

  const handleSelectDietaryOption = (selectedValue: any) => {
    setSelectedDietaryOption(selectedValue);
  };

  const handleselectCalorieIntakeOption = (selectedValue: any) => {
    setSelectedCalorieIntakeOption(selectedValue);
  };

  const handleSelectAllergiesAndIntoleranceOptions = (selectedValue: any) => {
    setSelectedAllergiesAndIntoleranceOptions(selectedValue);
  };

  const setIngredientsTextArea = () => {
    setIngredientsTextAreaValue("Text area test for one row sesseses es! Text area test for one row sesseses es!");
  };

  const handleTextAreaValueChange = (event: any) => {
    setIngredientsTextAreaValue(event.target.value);
  };

  const setTextAreaHeight = () => {
    const textarea = textareaRef.current;

    if (textarea) {
      // Reset height
      textarea.style.height = '32px';
      // Set needed height
      textarea.style.height = textarea.scrollHeight + 'px'; 
      textarea.style.maxHeight = textarea.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    setTextAreaHeight(); 
  }, [ingredientsTextAreaValue]);
  
  return (
    <div className="nutrition-page">
      <div className="page-manual-calculator"></div>
      <div className="page-ai-calculator">
        <span className={`${inter.className} ai-calculator-header`} onClick={() => console.log("WL:" + isWeightLossSelected + " ;WG: " + isWeightGainSelected)}>
          Get <strong>better results</strong> through your meals and preparation using <strong>AI</strong>!
        </span>
        <div className={`${inter.className} ai-calculator-info`}>
          <div>
            <label className="block mb-1.5 text-sm text-white-900 pt-px">Please configure this section accordingly.</label>
            <span className="icon-and-title mt-1 ml-1"><FaUser/><strong>Personal information</strong></span>
            <div className='weight-objective ml-1'>
              <div className="flex items-center">
                <input id="weight-loss-radio" title='weight-loss-radio' type="radio" value="" name="weight-radio" className="w-4 h-4 focus:ring-2 pb-2" checked={isWeightLossSelected} onChange={handleWeightLossRadioClick} onClick={handleWeightLossRadioClick}></input>
                <label htmlFor="weight-loss-radio" className="ms-1 text-sm font-medium pb-1">Weight Loss</label>
              </div>
              <div className="flex items-center">
                <input id="weight-gain-radio" title='weight-gain-radio' type="radio" value="" name="weight-radio" className="w-4 h-4 focus:ring-2" checked={isWeightGainSelected} onChange={handleWeightGainRadioClick} onClick={handleWeightGainRadioClick}></input>
                <label htmlFor="weight-gain-radio" className="ms-1 text-sm font-medium pb-1">Weight Gain</label>
              </div>
            </div>
          </div>
          <div className='multi-select-div h-auto'>
            <Select className='select first-section'
              closeMenuOnSelect={false}
              blurInputOnSelect={false}
              components={animatedComponents}
              isMulti
              options={userAllergiesAndIntolerancesOptions}
              placeholder="Select allergie(s) and intolerance(s)..."
              value={selectedAllergiesAndIntoleranceOptions}
              onChange={handleSelectAllergiesAndIntoleranceOptions}
            />
            <label className="block mt-2 mb-1.5 text-sm text-white-900 text-sm pt-px"></label>
            <span className="icon-and-title mt-1 ml-1"><FaDrumstickBite/><strong>Meal information</strong></span>
            <Select className='select'
              closeMenuOnSelect={false}
              blurInputOnSelect={false}
              components={animatedComponents}
              isMulti
              options={mealObjectiveOptions}
              placeholder="Select meal objective(s)..."
              value={selectedMealObjectiveOptions}
              onChange={handleSelectMealObjectives}
            />
          </div>
          <div className='single-select-div h-auto'>
            <Select className='select'
              closeMenuOnSelect={true}
              components={animatedComponents}
              options={mealDietaryOptions}
              placeholder="Select dietary..."
              value={selectedDietaryOption}
              onChange={handleSelectDietaryOption}
            />
            <Select className='select'
              closeMenuOnSelect={true}
              components={animatedComponents}
              options={mealCaloricIntakeOptions}
              placeholder="Select caloric intake..."
              value={selectedCalorieIntakeOption}
              onChange={handleselectCalorieIntakeOption}
            />
          </div>
          <div className="ml-1">
            <label className="block mt-1.5 mb-1.5 text-sm text-white-900 pt-px"></label>
            <div className='flex items-center justify-between w-full'>
              <span className="icon-and-title mt-1 ml-0"><FaReceipt className=''/><strong className='truncate'>Enter ingredients or...</strong></span>
              <button type='button' className='photo-scan-btn rounded p-1 pl-1.5 ml-1.5' title='Photograph Ingredients' onClick={setIngredientsTextArea}>
                <span className="icon-and-title right mt-1"><strong>Scan</strong><IoScanSharp /></span>
              </button>
            </div>
            <textarea ref={textareaRef} placeholder='ex. 1 Banana, 1 egg ...' className='ingredients-input rounded mt-1 p-1 pl-1.5 pr-1.5 w-full h-8 min-h-8' value={ingredientsTextAreaValue} onChange={handleTextAreaValueChange}></textarea>
          </div>
          <div className="ml-1 h-min flex-1 mb-4 min-h-24">
            <label className="block mt-1.5 mb-1.5 text-sm text-white-900 pt-px bg-white/50"></label>
            <div className='h-full w-full rounded-sm bg-white/50 flex flex-col justify-end'>
              <div className='flex flex-row'>
                <RiRobot2Fill className='text-black text-xl/5 justify-start mt-2 ml-1.5'/><span className='text-black mt-1 p-1 pl-1.5 pr-1.5'>Test span for answer</span>
              </div>           
            </div>
          </div>
        </div>
      </div>
      <div className="page-written-calculator"></div>
    </div>
  );
};
  
export default Page;