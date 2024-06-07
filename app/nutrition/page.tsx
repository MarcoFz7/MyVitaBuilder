"use client"

import './page.css'

import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { FaDrumstickBite, FaUser, FaReceipt, FaRegCopy } from "react-icons/fa";
import { IoScanSharp, IoCheckmark  } from "react-icons/io5";
import { RiRobot2Fill, RiDeleteBack2Line  } from "react-icons/ri";
import { MdOutlineAutoFixHigh  } from "react-icons/md";

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
  
  /*
    Consts related to the answer text area
  */
  const [isRobotRotated, setIsRobotRotated] = useState<boolean>(false);
  const [isRobotTextBoxAnimated, setIsRobotTextBoxAnimated] = useState<boolean>(false);
  const [robotTextBoxText, setRobotTextBoxText] = useState<string>('');
  const [answerReceived, setAnswerReceived] = useState<boolean>(false);
  const [preAnswerReceived, setPreAnswerReceived] = useState<boolean>(false);
  const [displayedAnswer, setDisplayedAnswer] = useState<string>('');
  const [lastAnswer, setLastAnswer] = useState<string>('This is a answer sample test!');
  const [fullAnswer, setFullAnswer] = useState<string[]>([]); 
  const [numberOfAnswers, setNumberOfAnswers] = useState<number>(0); 
  const [answerCopiedSucessfuly, setAnswerCopiedSucessfuly] = useState<boolean>(false);
  const [answerCopiedSucessfulyIndex, setAnswerCopiedSucessfulyIndex] = useState<number>(-1);  

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
    setIngredientsTextAreaValue("Text area test for one row and more tests! Text area test for one row and more tests!");
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

  const handleRobotIconAnimation = () => {
    setIsRobotRotated(!isRobotRotated);
  };

  const handleRobotIconAnimationOnMouseEnter = () => {
    setIsRobotRotated(!isRobotRotated);
    setRobotTextBoxText('Test me!');

    setIsRobotTextBoxAnimated(true);
    setTimeout(() => {
      setIsRobotTextBoxAnimated(false);
    }, 1000);
  };

  const handleRobotIconAnimationOnMouseLeave = () => {
    setIsRobotRotated(!isRobotRotated);
    setRobotTextBoxText("Bye Bye!")

    setIsRobotTextBoxAnimated(true);
    setTimeout(() => {
      setIsRobotTextBoxAnimated(false);
    }, 1000);
  };

  const handleTextTypingAnimation = () => {
    if (!lastAnswer) 
      return;

    setDisplayedAnswer('');

    let currentIndex = -1;

    setTimeout(() => {
      const intervalId = setInterval(() => {
        setDisplayedAnswer((prev) => {
          if (currentIndex < lastAnswer.length) {
            //console.log(currentIndex);

            if (currentIndex != -1) {
              return prev + lastAnswer[currentIndex];   
            } else {
              return prev + lastAnswer[currentIndex + 1];   
            }
          } else {
            clearInterval(intervalId);
            return prev;
          }
        });
        currentIndex++;
      }, 10);
    

      return () => { clearInterval(intervalId); }; 
    }, 500);
  };

  const handleRequestConfirmation = () => {
    console.log("CONFIRM BTN");

    console.log("WL: " + isWeightLossSelected + "; WG: " + isWeightGainSelected);
    console.log("Allergies and intolerances: " + JSON.stringify(selectedAllergiesAndIntoleranceOptions));
    console.log("Meal objectives: " + JSON.stringify(selectedMealObjectiveOptions));
    console.log("Dietary: " + JSON.stringify(selectedDietaryOption));
    console.log("Caloric intake: " + JSON.stringify(selectedCalorieIntakeOption));
    console.log("Ingredients: " + JSON.stringify(ingredientsTextAreaValue));

    // Reset selected options
    setisWeightGainSelected(false);
    setisWeightLossSelected(false);
    setSelectedAllergiesAndIntoleranceOptions([]);
    setSelectedMealObjectiveOptions([]);
    setSelectedDietaryOption([]);
    setSelectedCalorieIntakeOption([]);
    setIngredientsTextAreaValue('');

    // All this stuff is to be done when an answer is actually received from the back end, not when the request is sent! 
    setPreAnswerReceived(true);
    setTimeout(() => {
      setAnswerReceived(true);
    }, 500);
    handleTextTypingAnimation();
    setFullAnswer(prevState => [...prevState, "This is a answer sample! This is a answer sample! "]);
    setNumberOfAnswers(numberOfAnswers + 1);

    setTimeout(() => {
      const lastAnswer = document.getElementById('lastAnswer');
      console.log("entrou " + lastAnswer);

      if (lastAnswer) {
        lastAnswer.scrollIntoView({ behavior: 'smooth' });
        console.log("entrou");
      }
    }, 50);
  }

  const cleanAllAnswers = () => {
    setFullAnswer([]);
    setAnswerReceived(false);
    setPreAnswerReceived(false);
    setNumberOfAnswers(0);
  };

  const copyAnswer = (answer: string, index: number) => {
    setAnswerCopiedSucessfulyIndex(index);

    navigator.clipboard.writeText(answer).then(() => {
      console.log('Answer copied!');

      setAnswerCopiedSucessfuly(true);

      setTimeout(() => {
        setAnswerCopiedSucessfuly(false);
      }, 2500);

  }).catch(err => {
      console.error('Failed to copy to clipboard: ', err);
  });
  };

  const convertAnswerToPost = () => {
  
  };
  
  return (
    <div className="nutrition-page">
      <div className="page-manual-calculator">
      </div>
      <div className="page-ai-calculator" onMouseEnter={handleRobotIconAnimationOnMouseEnter} onMouseLeave={handleRobotIconAnimationOnMouseLeave}>
        <span className={`${inter.className} ai-calculator-header`}>
          Get <b>better results</b> through your meals and preparation using <strong>AI</strong>!
        </span>
        <div className={`${inter.className} ai-calculator-info`}>
          <div>
            <label className="block mb-1.5 text-sm text-white-900 pt-px ml-1.5">Please configure this section accordingly.</label>
            <span className="icon-and-title mt-1 ml-1"><FaUser className='icon-color'/><strong>Personal information</strong></span>
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
            <span className="icon-and-title mt-1 ml-1"><FaDrumstickBite className='icon-color'/><strong>Meal information</strong></span>
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
              <span className="icon-and-title mt-1 ml-0"><FaReceipt className='icon-color mb-px'/><strong className='truncate'>Enter ingredients or...</strong></span>
              <button type='button' className='photo-scan-btn rounded p-1 pl-1.5 pr-1.5 ml-1.5' title='Photograph Ingredients' onClick={setIngredientsTextArea}>
                <span className="icon-and-title right mt-1"><strong>Scan</strong><IoScanSharp /></span>
              </button>
            </div>
            <textarea ref={textareaRef} placeholder='ex. 1 Banana, 1 egg ...' className='ingredients-input rounded mt-1 p-1 pl-1.5 pr-1.5 w-full h-8 min-h-8' value={ingredientsTextAreaValue} onChange={handleTextAreaValueChange}></textarea>
          </div>
          <div>
            <button type='button' className='confirm-btn rounded p-1 pl-1.5 pr-1.5 ml-1 mt-0.5 w-fit' title='Submit!' onClick={handleRequestConfirmation}>
              <span className="icon-and-title right mt-1"><strong>Confirm</strong><IoCheckmark/></span>
            </button>
          </div>
          <div className="ml-1 flex-1 mb-4 h-full min-h-32">
            <label className="block mt-1.5 mb-1.5 text-sm text-white-900 pt-px bg-white/50"></label>
            <div className='h-full w-full rounded-sm bg-white/50 flex flex-col justify-end'>       
              <div className={`flex flex-col p-1 ${answerReceived ? 'overflow-y-auto' : 'overflow-y-hidden'}`}>
                {!answerReceived ? (
                  <div className={`flex flex-col items-center transition-all duration-250 ease ${preAnswerReceived ? 'opacity-0' : 'opacity-1'}`}>
                    <div className={`div-color relative left-12 ${isRobotTextBoxAnimated ? 'top-5 opacity-1' : 'top-7 opacity-0'} p-1 w-auto h-auto bg-white text-black border border-black rounded z-20 transition-top duration-500 ease`}>
                        <span>{robotTextBoxText}</span>
                    </div>
                    <div className={`div-color-multiple relative w-0 h-0 border-r-[10px] border-r-transparent border-t-[10px] border-t-black ${isRobotTextBoxAnimated ? 'top-[16px] opacity-1' : 'top-[24px] opacity-0'} left-[20px] z-4 transition-top duration-500 ease`}></div>
                    <RiRobot2Fill className={`${isRobotRotated ? 'animate-rotate-360' : 'animate-rotate-360-minus'} w-16 h-16 text-black justify-start mt-1.5 ml-1.5 mr-1`} onClick={handleRobotIconAnimation}/>
                </div> 
                ) : (
                  <>
                    <div className={`flex justify-end sticky top-0 w-full h-min z-10 transition-all duration-250 ease ${fullAnswer.length > 3 ? 'opacity-1' : 'opacity-0'}`}>
                      <button type='button' className='clean-btn rounded p-px pl-1 pr-1 w-min transition-all duration-250 ease' title='Clean all answers' onClick={cleanAllAnswers}>
                        <span className="icon-and-title right mt-0.5"><strong>Clean</strong><RiDeleteBack2Line className='w-4 h-4'/></span>
                      </button>  
                    </div> 
                    {
                      fullAnswer.map((answer, index) => (
                        <div key={`${answer}-${index}`} className='flex flex-col pt-0.5 transition-all duration-250 ease'>
                          {index != 0 ? (
                            <label className="separator block mt-1 mb-1 text-sm text-white-900 pt-px bg-white/50 w-9/12"></label>
                          ) : null}
                          <div className='flex flex-row'>
                            <RiRobot2Fill className='w-6 h-6 min-w-6 min-h-6 text-black justify-start mt-0.5 ml-1.5 mr-1 transition-all duration-250 ease'/>
                            {numberOfAnswers != (index + 1) ? (
                              <span className='text-black mt-0 p-1 pl-1.5 pr-1.5 transition-all duration-250 ease'>{answer}</span>
                            ) : (
                              <span id='lastAnswer' className='text-black mt-0 p-1 pl-1.5 pr-1.5 transition-all duration-250 ease'>{displayedAnswer}</span>
                            )}
                          </div>
                          {fullAnswer.length - index < 4 ? (
                            <div className='response-utils flex flex-row justify-center z-20'>
                              <button type='button' className='response-utils-btn rounded p-1 w-min mr-1' title='Copy Response' onClick={() => { numberOfAnswers != (index + 1) ? copyAnswer(answer, index) : copyAnswer(displayedAnswer, index)}}>
                                {answerCopiedSucessfuly && answerCopiedSucessfulyIndex == index ? (
                                  <IoCheckmark className={`w-4 h-4 ${answerCopiedSucessfuly ? 'opacity-1' : 'opacity-0'}`}/>
                                ) : (
                                  <FaRegCopy className='w-4 h-4'/>
                                )}
                              </button>
                              <button type='button' className='response-utils-btn rounded p-1 w-min transition-all duration-250 ease' title='Convert to Post' onClick={convertAnswerToPost}>
                                <MdOutlineAutoFixHigh className='w-4 h-4'/>
                              </button>
                            </div>
                          ) : null}
                        </div>   
                      ))
                    }                    
                  </> 
                )}                       
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