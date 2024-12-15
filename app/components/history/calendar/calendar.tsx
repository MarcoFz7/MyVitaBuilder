// Credit to Farzan Yaz - Component developed using React Continuous Calendar as a base!
'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import SecondaryBtn from '../../buttons/secondaryBtn';
import { CgCalendarToday } from "react-icons/cg";

import makeAnimated from 'react-select/animated';
import Select, { ActionMeta, MultiValue, SingleValue } from "react-select";
import CalendarPopup from './calendarPopup';
const animatedComponents = makeAnimated();

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const dayColorsMap = {
    actualMonth: {
        1: '#EF5350',
        3: '#FFA500',
        4: '', 
        5: '#006400',
        6: '#FFFF00',
        12: '#BFF47B'
    },
    previousMonth: {
        30: '#BFF47B'
    },
    nextMonth: {
        1: '#FFA500'
    },
};

interface ContinuousCalendarProps {
    fullHeight?: boolean,
    onClick?: (_day: number, _month: number, _year: number) => void;
}

export const ContinuousCalendar: React.FC<ContinuousCalendarProps> = ({ fullHeight = false, onClick }) => {
    const today = new Date();
    const dayRefs = useRef<(HTMLDivElement | null)[]>([]);

    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());

    const [isCalendarPopupOpen, setIsCalendarPopupOpen] = useState<boolean>(false);
    const [calendarPopupDay, setCalendarPopupDay] = useState<string>("");

    const monthOptions = monthNames.map((month, index) => ({ label: month, value: `${index}` }));

    const handlePrevYear = () => setYear((prevYear) => prevYear - 1);
    const handleNextYear = () => setYear((prevYear) => prevYear + 1);

    const handleMonthChange = (
        selectedValue: MultiValue<Option> | SingleValue<Option>
      ) => {
        if (selectedValue) {
          const value = selectedValue as Option;
          const intValue = value.value;
    
          setSelectedMonth(parseInt(intValue));
        }
      };

    const handleTodayClick = () => {
        setYear(today.getFullYear());
        setSelectedMonth(new Date().getMonth());
    };

    const handleDayClick = (day: number, month: number, year: number) => {
        setCalendarPopupDay(`${day}/${(month + 1).toString().padStart(2, '0')}/${year}`);
        setTimeout(() => {
            setIsCalendarPopupOpen(true);
        }, 50);
    }

    const generateCalendar = useMemo(() => {

        // This function returns the days of the selected month, and completes the calendar with the previous month last days and next month first days.
        const daysOfSelectedMonth = (): { month: number; day: number }[] => {
            const daysOfMonth = [];
            const firstDayOfMonth = new Date(year, selectedMonth, 1).getDay(); // Get the weekday for the 1st day of the selected month
            const daysInMonth = new Date(year, selectedMonth + 1, 0).getDate(); // Total days in the selected month
    
            // Get the number of days in the previous month
            const daysInPreviousMonth = new Date(year, selectedMonth, 0).getDate(); 
    
            // Add days from the previous month to fill empty slots (leading days before the 1st of this month)
            for (let i = 0; i < firstDayOfMonth; i++) {
                daysOfMonth.push({ month: selectedMonth - 1, day: daysInPreviousMonth - firstDayOfMonth + i + 1 });
            }
    
            // Add the actual days of the selected month
            for (let day = 1; day <= daysInMonth; day++) {
                daysOfMonth.push({ month: selectedMonth, day });
            }

            // Calculate how many days are left to complete the final row (should have 42 slots if needed, else only 35)
            const totalSlots = daysOfMonth.length >= 35 ? 42 : 35; // for 42 slots: 6 rows * 7; for 35: 5 rows * 7
            const remainingSlots = totalSlots - daysOfMonth.length;

            // Add days from the next month to fill the remaining slots
            for (let i = 1; i <= remainingSlots; i++) {
                daysOfMonth.push({ month: selectedMonth + 1, day: i }); // First days of next month
            }
    
            return daysOfMonth;
        };
    
        const calendarDays = daysOfSelectedMonth();
    
        const calendar = calendarDays.map(({ month, day }, index) => {
            const isToday = today.getMonth() === (month % 12) && today.getDate() === day && today.getFullYear() === year;
    
            // If the day belongs to the previous month, mark it visually different
            const isActualMonth = month == selectedMonth;

            const hexToRGBA = (hex: string, alpha: number) => {
                if (!hex || hex === '') return 'transparent';
                const r = parseInt(hex.slice(1, 3), 16);
                const g = parseInt(hex.slice(3, 5), 16);
                const b = parseInt(hex.slice(5, 7), 16);
                return `rgba(${r}, ${g}, ${b}, ${alpha})`;
            };

            // Dynamically set the background color
            const backgroundColor = isActualMonth
                ? hexToRGBA(dayColorsMap.actualMonth[day as keyof typeof dayColorsMap.actualMonth], 0.175)
                : month < selectedMonth
                ? hexToRGBA(dayColorsMap.previousMonth[day as keyof typeof dayColorsMap.previousMonth], 0.075) 
                : hexToRGBA(dayColorsMap.nextMonth[day as keyof typeof dayColorsMap.nextMonth], 0.075)
                
            return (
                <div
                    key={`${month}-${day}`}
                    ref={(el) => { dayRefs.current[index] = el; }}
                    data-month={month}
                    data-day={day}
                    onClick={() => handleDayClick(day, month, year)}
                    className={`relative z-10 aspect-square xxl:!aspect-auto w-full cursor-pointer rounded-xl border font-medium transition-all hover:z-20 border-c-sidebar-dark-green/35 hover:border-c-sidebar-dark-green justify-self-center w-[10vw] sm:max-w-[10vw] xxl:h-auto ${
                        !isActualMonth && 'text-gray-300 !border-gray-200'
                    }`}
                    style={{ backgroundColor }}
                >
                    <span
                        className={`absolute left-1 top-1 flex size-5 items-center justify-center rounded-full text-xs sm:size-6 md:size-8 ${
                            isToday ? 'bg-c-sidebar-dark-green font-semibold text-white' : ''
                        }`}
                    >
                        {day}
                    </span>
                </div>
            );
        });
    
        return calendar;
    }, [year, selectedMonth]);

    useEffect(() => {
        const root = document.querySelector('.calendar-container') || document;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const month = parseInt(entry.target.getAttribute('data-month')!, 10);
                        setSelectedMonth(month);
                    }
                });
            },
            {
                root,
                rootMargin: '-75% 0px -25% 0px',
                threshold: 0,
            },
        );

        dayRefs.current.forEach((ref) => {
            if (ref && ref.getAttribute('data-day') === '15') {
                observer.observe(ref);
            }
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div className={`flex flex-col h-full rounded-2xl bg-white text-slate-800 ${fullHeight ? '' : 'calendar-container'}`}>
            <div className="sticky -top-px z-50 w-full bg-white px-5 pl-0 pr-0 ssm-calendar:!px-10 md:!px-16 pt-2">
                <div className="flex flex-wrap items-center justify-between w-full">
                    {/* First Child Div */}
                    <div className="flex gap-2 ssm-calendar:gap-1 pl-1 ssm-calendar:pl-3 text-white pr-3">
                        <MonthSelect name="SelectMonth" value={`${selectedMonth}`} options={monthOptions} onChange={handleMonthChange} />
                        <SecondaryBtn label='Today' isDisabled={false} title='Go to today!' disabledTitle='' icon={<CgCalendarToday className='ml-[0.25rem] w-5 h-5 mb-px' />} onClick={handleTodayClick}/>                   
                    </div>

                    {/* Second Child Div */}
                    <div className="flex items-center gap-2 flex-shrink-0 mt-2 mb-2 max-h-[35px] pl-1 ssm-calendar:pr-3">
                        <button
                            type="button"
                            title="Previous Year"
                            onClick={handlePrevYear}
                            className="rounded-full border border-slate-300 p-1 transition-colors hover:bg-slate-100 sm:p-2"
                        >
                            <svg className="size-4 text-c-dark-green" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7" />
                            </svg>
                        </button>
                        <h1 className="text-center text-sm font-semibold text-c-dark-green pr-1 pl-1">{year}</h1>
                        <button
                            type="button"
                            title="Next Year"
                            onClick={handleNextYear}
                            className="rounded-full border border-slate-300 p-1 transition-colors hover:bg-slate-100 sm:p-2"
                        >
                            <svg className="size-4 text-c-dark-green" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Calendar days */}
            <div className='flex flex-col h-full ssm-calendar:px-10'>
                <div className="grid w-full grid-cols-7 justify-between text-slate-500 gap-px sm:gap-[10px]">
                    {daysOfWeek.map((day, index) => (
                        <div key={index} className="w-full py-1 text-center font-semibold text-c-dark-green text-xs">
                            {day}
                        </div>
                    ))}
                </div>
                <div className="grid h-full w-full grid-cols-7 gap-px sm:gap-[10px]">
                    {generateCalendar}
                </div>
            </div>

            {isCalendarPopupOpen && <CalendarPopup date={calendarPopupDay} managePopupState={() => setIsCalendarPopupOpen(false)}/>}
        </div>
    );
};

export interface Option {
    label: string;
    value: string;
}

export interface MonthSelectProps {
    name: string;
    value: string;
    label?: string;
    options: Option[];
    onChange: (newValue: SingleValue<Option> | MultiValue<Option>, actionMeta: ActionMeta<Option>) => void;
    className?: string;
}

export const MonthSelect = ({ name, value, label, options = [], onChange, className }: MonthSelectProps) => (
    <div className={`relative ${className}`}>
        {label && (
            <label htmlFor={name} className="mb-2 block font-medium text-slate-800">
                {label}
            </label>
        )}
        <div className="single-select-div calendar-single-select h-auto">
            <Select
                className="select"
                closeMenuOnSelect={true}
                components={animatedComponents}
                options={options}
                value={options.find(option => option.value === value) || null}
                onChange={onChange}
            />
        </div>
    </div>
);