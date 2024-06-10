"use client"

import './page.css'

import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { FaDrumstickBite, FaUser, FaReceipt, FaRegCopy } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { IoScanSharp, IoCheckmark, IoAddOutline } from "react-icons/io5";
import { RiRobot2Fill } from "react-icons/ri";
import { MdOutlineAutoFixHigh, MdDeleteSweep, MdDeleteOutline  } from "react-icons/md";
import { LuImageMinus, LuImagePlus } from "react-icons/lu";

import { Inter } from 'next/font/google';

const inter = Inter({weight: '400', style: "normal", subsets: ["latin"]});
const animatedComponents = makeAnimated();

 /*
  *
  * Interface used for "form" section, in order to present and identify possible options to user
  *
  */ 
interface Option {
  label: string;
  value: string;
}

// Options for the field focused in user allergies and intolerances
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

// Options for the field focused in user meal objectives
const mealObjectiveOptions: Option[] = [
  { value: 'Fat Loss', label: 'Fat Loss' },
  { value: 'Hypertrophy', label: 'Hypertrophy' },
  { value: 'Mood Enhancement', label: 'Mood Enhancement' },
  { value: 'Performance', label: 'Performance' },
  { value: 'Recovery', label: 'Recovery' },
  { value: 'Strength', label: 'Strength' }
]

// Options for the field focused in user meal dietary plan
const mealDietaryOptions: Option[] = [
  { value: 'Mediterranean', label: 'Mediterranean' },
  { value: 'Keto', label: 'Keto' },
  { value: 'Low-Carb', label: 'Low-Carb' },
  { value: 'Paleo', label: 'Paleo' },
  { value: 'Vegan', label: 'Vegan' },
  { value: 'Vegeterian', label: 'Vegeterian' },
  { value: 'Zone', label: 'Zone' }
]

// Options for the field focused in meal pretended caloric intake (per meal)
const mealCaloricIntakeOptions: Option[] = [
  { value: 'Very Low', label: '<500 kcal' },
  { value: 'Low', label: '500-700 kcal' },
  { value: 'Moderate', label: '700-900 kcal' },
  { value: 'High', label: '900-1200 kcal' },
  { value: 'Very High', label: '>1200 kcal' }
]

const Page = () => {
  // ---------------------------- Start of const/hooks/functions and more, related to POST SECTION ----------------------------
  const inputFile = useRef<HTMLInputElement | null>(null);

  const [selectedImage, setSelectedImage] = useState<string | null>();
  const [imageName, setImageName] = useState<string | null>('');

  const handlePostConfirmation = () => {
   
  };

  const handlePostDiscard = () => {
   
  };

  const handleAddImageToPost = () => {
    // current points to the mounted file input element
    inputFile.current?.click();
  };

  /**
   * 
   * Function to handle the image upload. 
   * "Returns" the image itself and also the associated file name.
   * 
   * @param e 
   */
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    var file: File | null = null;

    // Gets the target file (last updated image)
    if(e.target.files){
      file = e.target.files[0];
    }

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result instanceof ArrayBuffer || typeof reader.result === 'string') {
          setSelectedImage(reader.result as string | null);
          setImageName(file?.name as string | null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImageName(null);
  }



  // ---------------------------- Start of const/hooks/functions and more, related to AI CALCULATOR SECTION ----------------------------
  /*
   *
   * Consts used by this section
   * General use: Names are self explanatory
   *
   */
  const [isWeightLossSelected, setisWeightLossSelected] = useState<boolean>(false);
  const [isWeightGainSelected, setisWeightGainSelected] = useState<boolean>(false);
  const [selectedMealObjectiveOptions, setSelectedMealObjectiveOptions] = useState<Option[]>([]);
  const [selectedDietaryOption, setSelectedDietaryOption] = useState<Option[]>([]);
  const [selectedCalorieIntakeOption, setSelectedCalorieIntakeOption] = useState<Option[]>([]);
  const [selectedAllergiesAndIntoleranceOptions, setSelectedAllergiesAndIntoleranceOptions] = useState<Option[]>([]);
  const [ingredientsTextAreaValue, setIngredientsTextAreaValue] = useState<string>("");
  
  /*
   *
   * Consts used by this section
   * Related to AI generated answers text area and other textarea content: Names are self explanatory
   * 
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
  const [copiedStatus, setCopiedStatus] = useState(Array(fullAnswer.length).fill(''));

  // Ref to the ingredients textarea (not the one mentioned above)
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

  /*
   * Function created to automatically detect and update ingredients textarea 
   * Whenever a row is deleted/added the height will reflect that change
   */
  const setIngredientsTextAreaHeight = () => {
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
    setIngredientsTextAreaHeight(); 
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

  /**
   * 
   * Handles the text typing animation for the ai answers text area.
   * This animation is only applied to the last answer.
   * 
   */
  const handleTextTypingAnimation = () => {
    if (!lastAnswer) 
      return;

    // Resets display message. It should be blank before starting the process each time.
    setDisplayedAnswer('');

    let currentIndex = -1;

    setTimeout(() => {
      const intervalId = setInterval(() => {
        setDisplayedAnswer((prev) => {
          if (currentIndex < lastAnswer.length) {
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

   /**
   * 
   * Handles the request confirmation that will generate the answer.
   * 
   */
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

    // Focus on the last answer every time a new answer is generated. Important, mainly on small screens!
    setTimeout(() => {
      const lastAnswer = document.getElementById('lastAnswer');

      if (lastAnswer) {
        lastAnswer.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  }

  useEffect(() => {
    setCopiedStatus(Array(fullAnswer.length).fill(''));
  }, [fullAnswer]);

  const cleanAllAnswers = () => {
    setFullAnswer([]);
    setAnswerReceived(false);
    setPreAnswerReceived(false);
    setNumberOfAnswers(0);
  };

  /**
   * This function sets the copiedStatus to the copy operation result - 'true' or 'false'
   * The empty value '' is used as the default/reseted state
   * 
   * @param operationResult 
   * @param index 
   */
  const setCopiedStatusTrueOrFalse = (index: number, operationResult: string) => {
    setCopiedStatus((prevStatus) => {
      const newStatus = [...prevStatus];
      newStatus[index] = operationResult;

      return newStatus;
    });
  }

  /**
   * 
   * This function uses both the answer and the index from the selected copy icon answer as whole.
   * This allows to keep track of the answer selected and apply the animation to show the user the copy operation was sucessful or not.
   * Use clipboard.
   * 
   * @param answer 
   * @param index 
   */
  const copyAnswer = (answer: string, index: number) => {
    navigator.clipboard.writeText(answer).then(() => {
      setCopiedStatusTrueOrFalse(index, 'true');

      setTimeout(() => {
        setCopiedStatusTrueOrFalse(index, '');
      }, 2500);

    }).catch(() => {
      setCopiedStatusTrueOrFalse(index, 'false');

      setTimeout(() => {      
        setCopiedStatusTrueOrFalse(index, '');
      }, 2500);
    });
  };

  const convertAnswerToPost = () => {
    
  };
  
  return (
    <div className="nutrition-page">
      <div className="page-post-section min-h-[500px]">
        <div className='flex flex-col w-full h-full text-sm'>
          <div className='div-reference flex flex-row p-1 w-full h-4/5 gap-1.5'>
            <div className='div-reference-two new flex flex-col gap-1.5 bg-c-dark-smoke rounded h-full p-1 w-1/3 min-w-[205px]'>
              <div className='flex flex-row gap-1.5 w-full h-1/5  min-h-[30px] max-h-[45px]'>
                <div className='flex w-1/2 h-full bg-c-sidebar-dark-green rounded justify-center items-center p-1'>
                  <button type='button' className='flex justify-center items-center bg-c-dark-green text-c-lemon-green hover:bg-c-lemon-green hover:text-black rounded p-1 pl-1.5 pr-1.5 w-fit transition-all duration-250 ease h-full w-full' title='Add Post!' onClick={handlePostConfirmation}>
                    <span className="flex items-center m-0 mr-[0.25rem] whitespace-nowrap overflow-hidden"><IoAddOutline className='mr-[0.25rem] w-5 h-5'/><strong>Post</strong></span>
                  </button>
                </div>
                <div className='flex w-1/2 h-full bg-c-sidebar-dark-green rounded justify-center items-center p-1'>
                  <button type='button' className='flex justify-center items-center bg-c-dark-green text-c-lemon-green hover:bg-c-lemon-green hover:text-black rounded p-1 pl-1.5 pr-1.5 w-fit transition-all duration-250 ease h-full w-full' title='Discard Post!' onClick={handlePostDiscard}>
                    <span className="flex items-center m-0 mr-[0.25rem] whitespace-nowrap overflow-hidden"><MdDeleteOutline className='mr-[0.25rem]'/><strong>Discard</strong></span>
                  </button>
                </div>
              </div>
              <div className='w-full h-full bg-c-sidebar-dark-green rounded p-2.5 pt-[2%] pb-[2%]'>
                <div className='border border-c-dark-smoke w-full h-[80%] flex justify-center items-center rounded shadow-md'>
                  <input title='myimageinput' type='file' id='file' accept="image/*" ref={inputFile} style={{display: 'none'}} onChange={handleImageUpload}/>
                  {selectedImage ? (
                    <div className='flex justify-center items-center w-full h-full bg-c-light-dark rounded'>
                      <img src={selectedImage} alt="Selected" className="w-full h-auto opacity-100"/>
                    </div>
                  )
                  : (
                    <button type='button' className='text-c-dark-green hover:text-c-lemon-green hover:bg-c-dark-green focus:text-c-lemon-green focus:bg-c-dark-green rounded p-1 w-min transition-all duration-250 ease' title='Add image!' onClick={handleAddImageToPost}>
                      <LuImagePlus className='w-6 h-6' />
                    </button>
                  )}
                </div>
                <div className='flex flex-row mt-[1.5%] h-[19%] items-center'>
                  <button type='button' className='bg-c-dark-green mt-[0.075rem] hover:text-c-lemon-green rounded text-white p-1 pl-1.5 pr-1.5 ml-0.5 h-1/2 min-h-[30px]' title='Remove image!' onClick={handleRemoveImage}>
                    <span className="flex items-center m-0 whitespace-nowrap overflow-hidden"><strong>Remove</strong><LuImageMinus className='ml-[0.25rem]'/></span>
                  </button>
                  <div className='flex justify-center items-center w-full h-1/2 ml-1.5'>
                    <span className='border-b border-white text-white h-auto w-fit mt-0.5'>{(imageName == '' || imageName == null) ? 'No image selected.' : imageName}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='div-reference-two bg-c-dark-smoke rounded h-full w-2/3'>
              <div></div>
              <div></div>  
            </div>         
          </div>
          <div className='w-full h-1/5'></div>
        </div>    
      </div>
      <div className="page-ai-calculator-section" onMouseEnter={handleRobotIconAnimationOnMouseEnter} onMouseLeave={handleRobotIconAnimationOnMouseLeave}>
        <span className={`${inter.className} ai-calculator-header`}>
          Get <b>better results</b> through your meals and preparation using <strong>AI</strong>
        </span>
        <div className={`${inter.className} ai-calculator-info`}>
          <div>
            <label className="block mb-1.5 text-sm text-white-900 pt-px ml-1.5">Please configure this section accordingly.</label>
            <span className="flex items-center mb-[0.1rem] whitespace-nowrap overflow-hidden text-ellipsis mt-1 ml-1"><FaUser className='text-c-lemon-green inline-block mr-[0.375rem]'/><strong>Personal information</strong></span>
            <div className='flex flex-row gap-[25px] ml-1'>
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
            <span className="flex items-center mb-[0.1rem] whitespace-nowrap overflow-hidden mt-1 ml-1"><FaDrumstickBite className='text-c-lemon-green inline-block mr-[0.375rem]'/><strong>Meal information</strong></span>
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
              <span className="flex items-center mb-[0.1rem] whitespace-nowrap overflow-hidden mt-1 ml-0"><FaReceipt className='text-c-lemon-green mb-px inline-block mr-[0.375rem]'/><strong className='truncate'>Enter ingredients or...</strong></span>
              <button type='button' className='bg-c-dark-green mt-[0.075rem] hover:text-c-lemon-green rounded p-1 pl-1.5 pr-1.5 ml-1.5' title='Photograph Ingredients' onClick={setIngredientsTextArea}>
                <span className="flex items-center m-0 whitespace-nowrap overflow-hidden"><strong>Scan</strong><IoScanSharp className='ml-[0.25rem] mt-px'/></span>
              </button>
            </div>
            <textarea ref={textareaRef} placeholder='ex. 1 Banana, 1 egg ...' className='text-black pt-[0.38rem] placeholder:text-black placeholder:opacity-50 rounded mt-1 p-1 pl-1.5 pr-1.5 w-full h-8 min-h-8' value={ingredientsTextAreaValue} onChange={handleTextAreaValueChange}></textarea>
          </div>
          <div>
            <button type='button' className='bg-c-dark-green text-c-lemon-green hover:bg-c-lemon-green hover:text-black rounded p-1 pl-1.5 pr-1.5 ml-1 mt-0.5 w-fit transition-all duration-250 ease' title='Submit!' onClick={handleRequestConfirmation}>
              <span className="flex items-center m-0 whitespace-nowrap overflow-hidden"><strong>Confirm</strong><IoCheckmark className='ml-[0.25rem] mt-px'/></span>
            </button>
          </div>
          <div className="ml-1 flex-1 mb-4 h-full min-h-32">
            <label className="block mt-1.5 mb-1.5 text-sm text-white-900 pt-px bg-white/50"></label>
            <div className='h-full w-full rounded-sm bg-white/50 flex flex-col justify-end'>       
              <div className={`flex flex-col p-1 ${answerReceived ? 'overflow-y-auto' : 'overflow-y-hidden'}`}>
                {!answerReceived ? (
                  <div className={`flex flex-col items-center transition-all duration-250 ease ${preAnswerReceived ? 'opacity-0' : 'opacity-1'}`}>
                    <div className={`border-c-sidebar-dark-green relative left-12 ${isRobotTextBoxAnimated ? 'top-5 opacity-1' : 'top-7 opacity-0'} p-1 w-auto h-auto bg-white text-black border border-black rounded z-20 transition-top duration-500 ease`}>
                        <span>{robotTextBoxText}</span>
                    </div>
                    <div className={`border-r-[10px] border-r-transparent border-t-[10px] border-c-sidebar-dark-green relative w-0 h-0 ${isRobotTextBoxAnimated ? 'top-[16px] opacity-1' : 'top-[24px] opacity-0'} left-[20px] z-4 transition-top duration-500 ease`}></div>
                    <RiRobot2Fill className={`${isRobotRotated ? 'animate-rotate-360' : 'animate-rotate-360-minus'} w-16 h-16 text-black justify-start mt-1.5 ml-1.5 mr-1`} onClick={handleRobotIconAnimation}/>
                </div> 
                ) : (
                  <>
                    <div className={`flex justify-end sticky top-0 w-full h-min transition-all duration-250 ease ${fullAnswer.length > 3 ? 'opacity-1 z-10' : 'opacity-0 -z-10'}`}>
                      <button type='button' className='bg-c-dark-green hover:text-c-lemon-green rounded p-1 pl-1.5 pr-1.5 w-min transition-all duration-250 ease' title='Clean all answers' onClick={cleanAllAnswers}>
                        <span className="flex items-center m-0 whitespace-nowrap overflow-hidden"><strong>Clean</strong><MdDeleteSweep className='w-4 h-4 ml-[0.25rem] mt-0.5'/></span>
                      </button>  
                    </div>                    
                    {fullAnswer.map((answer, index) => (
                      <div key={`${answer}-${index}`} className='flex flex-col pt-0.5 transition-all duration-250 ease'>
                        {index != 0 ? (
                          <label className="ml-[12.5%] block mt-1 mb-1 text-sm text-white-900 pt-px bg-white/50 w-9/12"></label>
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
                          <div key={index} className='flex flex-row justify-center z-20'>
                            <button type='button' className='text-c-dark-green hover:text-c-lemon-green hover:bg-c-dark-green focus:text-c-lemon-green focus:bg-c-dark-green rounded p-1 w-min mr-1' title='Copy Response' onClick={() => { numberOfAnswers != (index + 1) ? copyAnswer(answer, index) : copyAnswer(displayedAnswer, index)}}>                                               
                              {copiedStatus[index] == '' ? (
                                <FaRegCopy className='w-4 h-4'/>
                              ) : (copiedStatus[index] == 'true' ? (
                                  <IoCheckmark className={`w-4 h-4 ${copiedStatus[index] == "true" ? 'opacity-1' : 'opacity-0'}`}/>
                                ) : (
                                  <FaXmark className={`w-4 h-4 text-red-400 ${copiedStatus[index] == "false" ? 'opacity-1' : 'opacity-0'}`}/>
                                )
                              )}
                            </button>
                            <button type='button' className='text-c-dark-green hover:text-c-lemon-green hover:bg-c-dark-green focus:text-c-lemon-green focus:bg-c-dark-green rounded p-1 w-min transition-all duration-250 ease' title='Convert to Post' onClick={() => convertAnswerToPost()}>
                              <MdOutlineAutoFixHigh className='w-4 h-4' />
                            </button>
                          </div>
                        ) : null}
                      </div>   
                    ))}                    
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