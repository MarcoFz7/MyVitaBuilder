import React, { useState, useEffect } from 'react';

/**
 * Interface for the custom component with needed props from the parent
 */
interface CustomTextAreaProps {
    placeholder: string;
    isSizeRestricted: boolean;
    maxCharacters: number;
    isDisabled: boolean;
    isResizable: boolean;

    // Callback function to handle comunication between parent and child. 
    // In this case this component triggers it and sends the value to the parent, the parent does nothing besides receiving the value
    onTextareaValueRequest: (textareaValue: string) => void;

    resetRequest: boolean;
    // Callback function to inform parent value was reseted
    onResetCompleted: () => void;
}

/**
 * 
 * @param placeholder - placeholder of the input
 * @param isSizeRestricted - option to allow to restrict the maximum size of the textarea input
 * @param maxCharacters - option to allow to specify the max allowed characters for the textarea 
 * @param isDisabled - option to allow the input to be editable, or not
 * @param onTextareaValueRequest - callback function to pass the value to the parent 
 * @param resetRequest - option that indicates a request from the parent to reset the textarea value
 * @param osResetCompleted - callback function to reset the variable "resetRequest" allowing to multiple resets
 * 
 * @returns custom textarea
 */
const CustomTextArea = ({ placeholder, isSizeRestricted, maxCharacters, isDisabled, isResizable, onTextareaValueRequest, resetRequest, onResetCompleted }: CustomTextAreaProps) => {

  const [descriptionTextareaInputValue, setDescriptionTextareaInputValue] = useState('');
  const [descriptionTextareaCharCount, setDescriptionTextareaCharCount] = useState(0);
  const [descriptionTextareaBlocked, setDescriptionTextareaBlocked] = useState<boolean>(false);

  const maxDescriptionTextAreaCharacters = maxCharacters;

  /**
   * Function to handle text area input change and count respective input characters
   * 
   * @param e 
   */
  const handleTextAreaInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;

    // If size isnt restricted set description input value and exit function
    if (!isSizeRestricted) {
        setDescriptionTextareaInputValue(newValue);
        return;
    }

    if (newValue.length <= maxDescriptionTextAreaCharacters) {
        setDescriptionTextareaInputValue(newValue.trimStart());
        setDescriptionTextareaCharCount(newValue.trimStart().length);

        updateValue(newValue.trimStart());
    } else {
        setDescriptionTextareaBlocked(true);

        setTimeout(() => {
          setDescriptionTextareaBlocked(false);
        }, 1000);
    }
  };

  const updateValue = (newValue: string) => {
    onTextareaValueRequest(newValue);
  }

  /**
   * UseEffect to reset textarea value
   */
  useEffect(() => {
    if (resetRequest) {
      setDescriptionTextareaInputValue('');
      setDescriptionTextareaCharCount(0);
      onResetCompleted();
    }
  }, [resetRequest]);


  return (
    <>
        <textarea placeholder={placeholder} disabled={isDisabled} className={`text-black pt-[0.38rem] placeholder:text-black placeholder:opacity-50 rounded p-1 pl-1.5 pr-1.5 w-full h-full ${!isResizable ? 'resize-none' : ''}`} value={descriptionTextareaInputValue} onChange={handleTextAreaInputChange}>
        </textarea>
        {isSizeRestricted && descriptionTextareaCharCount != 0 && (
            <div className='flex items-center bg-white rounded pl-1 w-min h-full ml-0.5'>
                <span className={`flex items-center text-[10px] font-bold rounded p-1 mr-1 ${descriptionTextareaBlocked ? 'bg-c-dark-smoke' : 'bg-c-dark-smoke-50'} transition-all duration-250 ease`}>{descriptionTextareaCharCount}/{maxDescriptionTextAreaCharacters}</span>
            </div>
        )}
    </>
  );
};
  
export default CustomTextArea;