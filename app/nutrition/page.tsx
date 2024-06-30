"use client"

import './page.css'

import CustomInput from '../components/customInput/customInput';
import CustomTextArea from '../components/customTextArea/customTextArea';
import CustomMessage from '../components/customMessage/customMessage';

import MainBtn from '../components/buttons/mainBtn';
import SecondaryBtn from '../components/buttons/secondaryBtn';
import TertiaryBtn from '../components/buttons/tertiaryBtn';

import { requestAnswerDTO } from '../components/models/requestAnswerDTO';

import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { FaDrumstickBite, FaUser, FaReceipt, FaRegCopy } from "react-icons/fa";
import { IoScanSharp, IoCheckmark } from "react-icons/io5";
import { RiRobot2Fill, RiInformation2Fill } from "react-icons/ri";
import { MdOutlineAutoFixHigh, MdDeleteSweep, MdDeleteOutline, MdAdd } from "react-icons/md";
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

  const [postHasContent, setPostHasContent] = useState<boolean>(false);

  const [selectedImage, setSelectedImage] = useState<string | null>();
  const [imageName, setImageName] = useState<string | null>('');

  const [energyInputValue, setEnergyInputValue] = useState<string>('');
  const [proteinInputValue, setProteinInputValue] = useState<string>('');
  const [totalFatInputValue, setTotalFatInputValue] = useState<string>('');
  const [saturatedFatInputValue, setSaturatedFatInputValue] = useState<string>('');
  const [transFatInputValue, setTransFatInputValue] = useState<string>('');
  const [totalCarbsInputValue, setTotalCarbsInputValue] = useState<string>('');
  const [sugarsInputValue, setSugarsInputValue] = useState<string>('');
  const [fiberInputValue, setFiberInputValue] = useState<string>('');
  const [sodiumInputValue, setSodiumInputValue] = useState<string>('');
  const [cholesterolInputValue, setCholesterolInputValue] = useState<string>('');
  const [vitaminsInputValue, setVitaminsInputValue] = useState<string>('');

  const [descriptionTextareaValue, setDescriptionTextareaValue] = useState<string>('');
  const [resetDescriptionTextareaValue, setResetDescriptionTextareaValue] = useState<boolean>(false);

  const [showPostWarningMessage, setShowPostWarningMessage] = useState<boolean>(false);
  const [changePostWarningMessageOpacity, setChangePostWarningMessageOpacity] = useState<boolean>(false);

  const postInputValuesToValidate = [
    energyInputValue, proteinInputValue, totalFatInputValue, saturatedFatInputValue, transFatInputValue, totalCarbsInputValue,
    sugarsInputValue, fiberInputValue, sodiumInputValue, cholesterolInputValue, vitaminsInputValue
  ];

  const allInputValues = [
    imageName, energyInputValue, proteinInputValue, totalFatInputValue, saturatedFatInputValue, transFatInputValue, totalCarbsInputValue,
    sugarsInputValue, fiberInputValue, sodiumInputValue, cholesterolInputValue, vitaminsInputValue, descriptionTextareaValue
  ];

  // Function to handle post validation (All Nutriotinal information section fields are mandatory)
  const handlePostValidation = () => {
    for (const inputValue of postInputValuesToValidate) {
      if (inputValue == '') {
        return false;
      }
    }
  
    return true;
  }

  /**
   * Function to handle the Post confirmation
   * This function call one more helper function - handlePostValidation
   */
  const handlePostConfirmation = () => {
    var isPostValidated = handlePostValidation();
    
    if (isPostValidated) {
      setShowPostWarningMessage(false);
      setChangePostWarningMessageOpacity(false);

      console.log("Selected image value: " + selectedImage);
      console.log("Image name value: " + imageName);
      console.log("Energy value: " + energyInputValue);  
      console.log("Protein value: " + proteinInputValue); 
      console.log("Total fat value: " + totalFatInputValue);  
      console.log("Saturated fat value: " + saturatedFatInputValue); 
      console.log("Trans fat value: " + transFatInputValue);  
      console.log("Total carbs value: " + totalCarbsInputValue); 
      console.log("Sugars value: " + sugarsInputValue);  
      console.log("Fiber value: " + fiberInputValue); 
      console.log("Sodium value: " + sodiumInputValue);  
      console.log("Cholesterol value: " + cholesterolInputValue); 
      console.log("Vitamins value: " + vitaminsInputValue);   
      console.log("Description value: " + descriptionTextareaValue);   

    } else {     

      setShowPostWarningMessage(true);
      setChangePostWarningMessageOpacity(true);
    }
  };

  /**
   * UseEffect to controll if Discard Btn should be disabled or not
   */
  useEffect(() => {
    var count = 0;
    
    for (const inputValue of allInputValues) {
      if (inputValue != '') {
        count++;
      }
    }
  
    if (count > 0) {
      setPostHasContent(true);
    } else {
      setPostHasContent(false);
    }
  }, [imageName, energyInputValue, proteinInputValue, totalFatInputValue, saturatedFatInputValue, transFatInputValue, totalCarbsInputValue, sugarsInputValue, fiberInputValue, sodiumInputValue, cholesterolInputValue, vitaminsInputValue, descriptionTextareaValue]);

  /**
   * Function to discard current Post
   * Resets all the sections
   */
  const handlePostDiscard = () => {
    // Optional Image section
    setSelectedImage(null);
    setImageName('');

    // Nutritional Information section
    setEnergyInputValue('');
    setProteinInputValue('');
    setTotalFatInputValue('');
    setSaturatedFatInputValue('');
    setTransFatInputValue('');
    setTotalCarbsInputValue('');
    setSugarsInputValue('');
    setFiberInputValue('');
    setSodiumInputValue('');
    setCholesterolInputValue('');
    setVitaminsInputValue('');

    // Optional description section
    setDescriptionTextareaValue('');
    setResetDescriptionTextareaValue(true);
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
    setImageName('');

    // Reset inputFile value to allow to add the removed image again
    if (inputFile.current) {
      inputFile.current.value = '';
    }
  }

  /**
   * Function to retrieve the value of the description text are and use on Post request
   * 
   * @param responseValue 
   */
  const handleDescriptionTextAreaResponse = (responseValue: string) => {
    setDescriptionTextareaValue(responseValue); 
  };


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
  const [ingredientsTextAreaValue, setIngredientsTextAreaValue] = useState<string>('');
  
  /*
   *
   * Consts used by this section
   * Related to AI generated answers text area and other textarea content: Names are self explanatory
   * 
   */
  const [isAnswerRequestValid, setIsAnswerRequestValid] = useState<boolean>(false);

  const aiSectionFieldsToValidate = {
    arrayFields: [selectedMealObjectiveOptions, selectedDietaryOption, selectedCalorieIntakeOption, selectedAllergiesAndIntoleranceOptions],
    stringFields: [ingredientsTextAreaValue]
  };


  /**
   * UseEffect to check if the AI section already has all the necessary fields
   */ 
  useEffect(() => {
    
    for (const fieldValue of aiSectionFieldsToValidate.arrayFields) {
      if (fieldValue.length === 0) {
        setIsAnswerRequestValid(false);
        return;
      } 
    }

    for (const fieldValue of aiSectionFieldsToValidate.stringFields) {
      if (fieldValue == '') {
        setIsAnswerRequestValid(false);
        return;
      } 
    }

    setIsAnswerRequestValid(true);

  }, [selectedMealObjectiveOptions, selectedDietaryOption, selectedCalorieIntakeOption, selectedAllergiesAndIntoleranceOptions, ingredientsTextAreaValue]);


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
  const [answerConvertedToPostStatus, setAnswerConvertedToPostStatus] = useState(Array(fullAnswer.length).fill(''));

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
    if (fullAnswer.length === 0) {
      setCopiedStatus([]);
      setAnswerConvertedToPostStatus([]);
    } 
    else {
      setCopiedStatus(prev => [
        ...prev,
        ...Array(fullAnswer.length - prev.length).fill('')
      ]);
  
      setAnswerConvertedToPostStatus(prev => [
        ...prev,
        ...Array(fullAnswer.length - prev.length).fill('')
      ]);
    }
  }, [fullAnswer]);

  const cleanAllAnswers = () => {
    setFullAnswer([]);
    setAnswerReceived(false);
    setPreAnswerReceived(false);
    setNumberOfAnswers(0);
  };

  /**
   * This function sets the status of the operation result - 'true' or 'false' for the specific answer
   * The empty value '' is used as the default/reseted state
   * 
   * @param operation - indicates the operation being checked - 1 for CopyAnswer and 2 for ConvertAnswerToPost
   * @param operationResult 
   * @param index 
   */
  const setOperationStatusTrueOrFalse = (operation: number, index: number, operationResult: string) => {
    var x = setCopiedStatus;

    switch (operation) {
      case 2:
        x = setAnswerConvertedToPostStatus; 
        break;
    }

    x((prevStatus) => {
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
      setOperationStatusTrueOrFalse(1, index, 'true');

      setTimeout(() => {
        setOperationStatusTrueOrFalse(1, index, '');
      }, 2500);

    }).catch(() => {
      setOperationStatusTrueOrFalse(1, index, 'false');

      setTimeout(() => {      
        setOperationStatusTrueOrFalse(1, index, '');
      }, 2500);
    });
  };

  /**
   * 
   * This function allows the user to convert a answer to the post mandatory nutritional information section
   * 
   * @param index 
   */
  const convertAnswerToPost = (index: number) => {
    // Using sample request while microservice is not ready
    const sampleRequestAnswer: requestAnswerDTO = {
      introductionText: "This is a sample introduction.",
      energy: { value: (index+1).toString(), unit: "kcal" },
      protein: { value: (index+2).toString(), unit: "g" },
      totalFat: { value: (index+3).toString(), unit: "g" },
      satFat: { value: (index+4).toString(), unit: "g" },
      transFat: { value: (index+5).toString(), unit: "g" },
      totalCarbs: { value: (index+6).toString(), unit: "g" },
      sugars: { value: (index+7).toString(), unit: "g" },
      fiber: { value: (index+8).toString(), unit: "g" },
      sodium: { value: (index+9).toString(), unit: "mg" },
      cholesterol: { value: (index+10).toString(), unit: "mg" },
      vitamins: { value: "Vitamin A, C, D" },
      conclusionText: "This is a sample conclusion."
    };

    try { 
      setEnergyInputValue(sampleRequestAnswer.energy.value);
      setProteinInputValue(sampleRequestAnswer.protein.value);
      setTotalFatInputValue(sampleRequestAnswer.totalFat.value);
      setSaturatedFatInputValue(sampleRequestAnswer.satFat.value);
      setTransFatInputValue(sampleRequestAnswer.transFat.value);
      setTotalCarbsInputValue(sampleRequestAnswer.totalCarbs.value);
      setSugarsInputValue(sampleRequestAnswer.sugars.value);
      setFiberInputValue(sampleRequestAnswer.fiber.value);
      setSodiumInputValue(sampleRequestAnswer.sodium.value);
      setCholesterolInputValue(sampleRequestAnswer.cholesterol.value);
      setVitaminsInputValue(sampleRequestAnswer.vitamins.value);

      setOperationStatusTrueOrFalse(2, index, 'true');
    } catch (error) {
      setOperationStatusTrueOrFalse(2, index, 'false');
    } finally {
      setTimeout(() => {      
        setOperationStatusTrueOrFalse(2, index, '');
      }, 2500);
    }
  };
  
  return (
    <div className={`${inter.className} nutrition-page`}>
      <div className="page-post-section bg-c-light-smoke min-h-[635px] sm:min-h-[430px]">
        <div className='flex flex-col w-full h-full text-sm'>
          <div className='flex flex-col sm:flex-row gap-1.5 p-1 w-full h-[90%] min-h-[500px] sm:min-h-[350px]'>

            <div className='flex flex-col gap-[1%] bg-c-light-smoke rounded h-full p-1 w-full sm:w-1/3 min-w-[205px] shadow-md'>
              <div className='flex flex-row gap-1.5 w-full h-[12%] pb-0.5 sm:pb-0'>
                <div className='bg-c-dark-green sm:bg-c-light-smoke flex w-1/2 h-full rounded justify-center items-center p-0 sm:p-1 shadow-md'>
                  <MainBtn label='Post' isDisabled={false} title='Add Post!' disabledTitle='' icon={<MdAdd className='mr-[0.20rem] w-5 h-5'/>} shadow={true} onClick={handlePostConfirmation}/> 
                </div>
                <div className={`bg-c-dark-green sm:bg-c-light-smoke flex w-1/2 h-full rounded justify-center items-center p-0 sm:p-1 shadow-md ${!postHasContent ? 'bg-c-light-smoke' : ''}`}>
                  <MainBtn label='Discard' isDisabled={!postHasContent} title='Discard Post!' disabledTitle='Disabled. Post has no content.' icon={<MdDeleteOutline className='mr-[0.25rem] w-4 h-4'/>} shadow={false} onClick={handlePostDiscard}/> 
                </div> 
              </div>
              <div className='w-full h-[87%] bg-c-paper-white rounded p-2.5 pt-[2%] pb-[2%] max-h-[200px] sm:max-h-full'>
                <div className='w-full h-[80%] flex justify-center items-center rounded border border-c-light-smoke border-t-c-paper-white shadow-sm'>
                  <input title='myimageinput' type='file' id='file' accept="image/*" ref={inputFile} style={{display: 'none'}} onChange={handleImageUpload}/>
                  {selectedImage ? (
                    <div className='flex justify-center items-center w-full h-full bg-c-light-dark rounded'>
                      <img src={selectedImage} alt="Selected" className="max-w-full max-h-full object-contain opacity-100"/>
                    </div>
                  )
                  : 
                  (
                    <TertiaryBtn operationStatus='' btnIcon={<LuImagePlus className='w-6 h-6'/>} isDisabled={false} inSequence={false} title='Add image!' onClick={handleAddImageToPost}/>                                   
                  )}
                </div>
                <div className='flex flex-row mt-[1.5%] h-[19%] items-center'>
                  <div className='bg-white text-white'>
                    <SecondaryBtn label='Remove' isDisabled={selectedImage == null} title='Remove image!' disabledTitle='Disabled. No image selected.' icon={<LuImageMinus className='ml-[0.25rem] w-4 h-4'/>} onClick={handleRemoveImage}/> 
                  </div>
                  <div className='flex flex-auto justify-center items-center w-1/2 h-1/2 ml-1.5'>
                    <span className='border-b border-c-dark-green text-c-dark-green h-auto w-fit mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis mr-1.5 md:mr-2.5'>{(imageName == '' || imageName == null) ? 'No image selected' : imageName}</span>
                  </div>
                </div>
              </div> 
            </div>
            <div className='bg-c-light-smoke rounded h-full w-full sm:w-2/3 p-1 min-w-[205px] text-white shadow-md transition-all duration-2500 ease' >
              <div className='flex flex-col bg-c-paper-white w-full h-full rounded transition-all duration-2500 ease'>
                <div className='bg-c-paper-white flex-1 flex flex-row rounded w-[99%] h-[12%] min-h-[35px] max-h-[12%] pl-[2%] sm:pl-[4%] justify-center pr-[2%] sm:pr-[4%]'>
                  { showPostWarningMessage ?                
                    <CustomMessage type={2} message='This section fields are Mandatory' iconSize='text-base' isOpacityOne={changePostWarningMessageOpacity} onTransitionEnd={() => setShowPostWarningMessage(false)}/>
                  :  
                    <div className='flex w-full h-full justify-center items-center'>
                      <span className="flex items-center text-c-dark-green whitespace-nowrap overflow-hidden "><RiInformation2Fill className='text-c-dark-green inline-block mr-[0.375rem] h-[18px] w-[18px]'/><strong>Meal Nutritional Details</strong></span>                       
                    </div>
                  }         
                </div>
                <div className='pl-0 ml-[4%] w-[92%] h-px bg-c-dark-green'></div>
                <div className='flex-1 flex flex-col sm:flex-row bg-c-paper-white w-full h-full pl-[2%] pr-[2%] rounded'>
                  <div className='flex flex-col justify-evenly h-1/2 sm:h-full w-full'>
                  <div className='h-auto w-full'>
                      <div className='min-h-[35px]'>
                        <CustomInput value={energyInputValue} title='Energy' placeholder='ex. 286' isDisabled={true} topic='Energy' hasUnit={true} unit='kcal' inSequence={false}/>
                      </div>
                    </div>
                    <div className='h-auto w-full'>
                      <div className='min-h-[35px]'>
                        <CustomInput value={proteinInputValue} title='Protein' placeholder='ex. 34' isDisabled={true} topic='Protein' hasUnit={true} unit='g' inSequence={false}/>
                      </div>
                    </div>
                    <div className='h-auto w-full'>
                      <div className='min-h-[35px]'>
                        <CustomInput value={totalFatInputValue} title='Total Fat' placeholder='ex. 4.6' isDisabled={true} topic='Total Fat' hasUnit={true} unit='g' inSequence={true}/>
                        <div className='flex flex-row sm:flex-col'>
                          <CustomInput value={saturatedFatInputValue} title='Sat. Fat' placeholder='ex. 1.5' isDisabled={true} topic='Sat. Fat' hasUnit={true} unit='g' inSequence={true}/>
                          <CustomInput value={transFatInputValue} title='Trans Fat' placeholder='ex. 0' isDisabled={true} topic='Trans Fat' hasUnit={true} unit='g' inSequence={false}/>
                        </div> 
                      </div>
                    </div>                   
                  </div>
                  <div className='flex flex-col justify-evenly h-1/2 sm:h-full w-full'>
                    <div className='h-auto w-full'>
                      <div className='min-h-[35px]'>
                        <CustomInput value={totalCarbsInputValue} title='Carbs' placeholder='ex. 25' isDisabled={true} topic='Total Carbs' hasUnit={true} unit='g' inSequence={true}/>
                        <div className='flex flex-row sm:flex-col'>
                          <CustomInput value={sugarsInputValue} title='Sugars' placeholder='ex. 1.4' isDisabled={true} topic='Sugars' hasUnit={true} unit='g' inSequence={true}/>
                          <CustomInput value={fiberInputValue} title='Fiber' placeholder='ex. 2' isDisabled={true} topic='Fiber' hasUnit={true} unit='g' inSequence={false}/>
                        </div>           
                      </div>
                    </div>
                    <div className='h-auto w-full'>
                      <div className='min-h-[35px]'>
                        <CustomInput value={sodiumInputValue} title='Sodium' placeholder='ex. 76' isDisabled={true} topic='Sodium' hasUnit={true} unit='mg' inSequence={false}/>
                      </div>
                    </div>
                    <div className='h-auto w-full'>
                      <div className='min-h-[35px] flex flex-row sm:flex-col'>
                        <CustomInput value={cholesterolInputValue} title='Cholesterol' placeholder='ex. 85' isDisabled={true} topic='Chol.' hasUnit={true} unit='mg' inSequence={true}/>
                        <CustomInput value={vitaminsInputValue} title='Vitamins' placeholder='ex. A and B' isDisabled={true} topic='Vitamins' hasUnit={false} unit='null' inSequence={false}/>
                      </div>
                    </div>
                  </div>
                </div>  
              </div>
            </div>         
          </div>
          <div className='w-full h-[10%] p-1'>
              <div className='flex bg-c-light-smoke w-full h-full p-1 rounded items-center shadow-md'>
                <div className='flex w-full h-8 min-h-8 bg-c-paper-white rounded'>            
                  <CustomTextArea placeholder='Type a small description ...' isSizeRestricted={true} maxCharacters={255} isDisabled={false} isResizable={false} onTextareaValueRequest={handleDescriptionTextAreaResponse} resetRequest={resetDescriptionTextareaValue} onResetCompleted={() => setResetDescriptionTextareaValue(false)}/>
                </div>
              </div>
          </div>
        </div>    
      </div>
      <div className="page-ai-calculator-section" onMouseEnter={handleRobotIconAnimationOnMouseEnter} onMouseLeave={handleRobotIconAnimationOnMouseLeave}>
        <span className='ai-calculator-header'>
          Get <b>better results</b> through your meals and preparation using <strong>AI!</strong>
        </span>
        <div className='ai-calculator-info'>
          <div>
            <label className="block mb-1.5 text-sm text-white-900 pt-px ml-1.5">Please configure this section accordingly.</label>
            <span className="flex items-center mb-[0.1rem] text-c-lemon-green whitespace-nowrap overflow-hidden text-ellipsis mt-1 ml-1"><FaUser className='text-c-lemon-green inline-block mr-[0.375rem]'/><strong>Personal information</strong></span>
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
            <span className="flex items-center mb-[0.1rem] text-c-lemon-green whitespace-nowrap overflow-hidden mt-1 ml-1"><FaDrumstickBite className='text-c-lemon-green inline-block mr-[0.375rem]'/><strong>Meal information</strong></span>
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
              <span className="flex items-center mb-[0.1rem] text-c-lemon-green whitespace-nowrap overflow-hidden mt-1 ml-0"><FaReceipt className='text-c-lemon-green mb-px inline-block mr-[0.375rem]'/><strong className='truncate'>Enter ingredients or...</strong></span>
              <SecondaryBtn label='Scan' isDisabled={false} title='Photograph Ingredients!' disabledTitle='' icon={<IoScanSharp className='ml-[0.25rem] mt-px'/>} onClick={setIngredientsTextArea}/> 
            </div>
            <textarea ref={textareaRef} placeholder='ex. 1 Banana, 1 egg ...' className='bg-c-paper-white text-black pt-[0.38rem] placeholder:text-black placeholder:opacity-50 rounded mt-1 p-1 pl-1.5 pr-1.5 w-full h-8 min-h-8 !max-h-[52px] sm:!max-h-[115px]' value={ingredientsTextAreaValue} onChange={handleTextAreaValueChange}></textarea>
          </div>
          <div>
            <div className='ml-1 rounded shadow-md'>            
              <MainBtn label='Confirm' isDisabled={!isAnswerRequestValid} title='Confirm Request!' disabledTitle='Disabled. Section not configured.' icon={<IoCheckmark className='mr-[0.25rem] w-5 h-5 mt-px'/>} shadow={true} onClick={handleRequestConfirmation}/> 
            </div>
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
                    <div className={`flex justify-end sticky top-0 w-full h-min ${fullAnswer.length > 3 ? 'opacity-1 z-10' : 'opacity-0 -z-10'}`}>                   
                      <SecondaryBtn label='Clean' isDisabled={false} title='Clean all answers!' disabledTitle='' icon={<MdDeleteSweep className='w-4 h-4 ml-[0.25rem] mt-0.5'/>} onClick={cleanAllAnswers}/>   
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
                            <TertiaryBtn operationStatus={copiedStatus[index]} btnIcon={<FaRegCopy className='w-4 h-4'/>} isDisabled={false} inSequence={true} title='Copy Answer!' onClick={() => { numberOfAnswers != (index + 1) ? copyAnswer(answer, index) : copyAnswer(displayedAnswer, index)}}/>                        
                            <TertiaryBtn operationStatus={answerConvertedToPostStatus[index]} btnIcon={<MdOutlineAutoFixHigh className='w-4 h-4'/>} isDisabled={false} inSequence={false} title='Convert to Post!' onClick={() => convertAnswerToPost(index)}/>
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
      <div className="page-written-calculator bg-c-dark-smoke-50"></div>
    </div>
  );
};
  
export default Page;