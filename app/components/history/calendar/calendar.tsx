'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

interface ContinuousCalendarProps {
    fullHeight?: boolean,
    onClick?: (_day: number, _month: number, _year: number) => void;
}

export const ContinuousCalendar: React.FC<ContinuousCalendarProps> = ({ fullHeight = false, onClick }) => {
    const today = new Date();
    const dayRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
    const monthOptions = monthNames.map((month, index) => ({ name: month, value: `${index}` }));

    const handlePrevYear = () => setYear((prevYear) => prevYear - 1);
    const handleNextYear = () => setYear((prevYear) => prevYear + 1);

    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const monthIndex = parseInt(event.target.value, 10);
        setSelectedMonth(monthIndex);
    };

    const handleTodayClick = () => {
        setYear(today.getFullYear());
        setSelectedMonth(new Date().getMonth());
    };

    const handleDayClick = (day: number, month: number, year: number) => {
        if (!onClick) { return; }
        if (month < 0) {
            onClick(day, 11, year - 1);
        } else {
            onClick(day, month, year);
        }
    }

    const generateCalendar = useMemo(() => {
        // This function returns the days of the selected month.
        const daysOfSelectedMonth = (): { month: number; day: number }[] => {
            const daysOfMonth = [];
            const daysInMonth = new Date(year, selectedMonth + 1, 0).getDate();

            for (let day = 1; day <= daysInMonth; day++) {
                daysOfMonth.push({ month: selectedMonth, day });
            }

            return daysOfMonth;
        };

        const calendarDays = daysOfSelectedMonth();

        const calendar = calendarDays.map(({ month, day }, index) => {
            const isToday = today.getMonth() === month && today.getDate() === day && today.getFullYear() === year;

            return (
                <div
                    key={`${month}-${day}`}
                    ref={(el) => { dayRefs.current[index] = el; }}
                    data-month={month}
                    data-day={day}
                    onClick={() => handleDayClick(day, month, year)}
                    className={`relative z-10 aspect-square w-full cursor-pointer rounded-xl border font-medium transition-all hover:z-20 hover:border-c-sidebar-dark-green justify-self-center h-[10vw] w-[10vw] sm:max-w-[10vw]`}
                >
                    <span className={`absolute left-1 top-1 flex size-5 items-center justify-center rounded-full text-xs sm:size-6 md:size-8 ${isToday ? 'bg-c-sidebar-dark-green font-semibold text-white' : 'text-slate-800'}`}>
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
        <div className={`rounded-2xl bg-white text-slate-800 ${fullHeight ? '' : 'calendar-container'}`}>
            <div className="sticky -top-px z-50 w-full bg-white px-5 pl-0 pr-0 ssm-calendar:!px-10 md:!px-16 pt-2">
                <div className="flex flex-wrap items-center justify-between w-full">
                    {/* First Child Div */}
                    <div className="flex gap-3 ssm-calendar:gap-2 ssm-calendar:pl-3">
                        <Select name="SelectMonth" value={`${selectedMonth}`} options={monthOptions} onChange={handleMonthChange} />
                        <button
                            onClick={handleTodayClick}
                            type="button"
                            className="whitespace-nowrap rounded bg-gradient-to-r from-c-dark-green to-c-sidebar-dark-green px-3 py-1 text-center text-sm font-medium text-white hover:bg-gradient-to-bl mr-3"
                        >
                            Today
                        </button>
                    </div>

                    {/* Second Child Div */}
                    <div className="flex items-center gap-2 flex-shrink-0 mt-2 mb-2 max-h-[35px] ssm-calendar:pr-3">
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
                        <h1 className="text-center text-sm font-semibold text-c-dark-green pr-2 pl-2">{year}</h1>
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

                <div className="grid w-full grid-cols-7 justify-between text-slate-500 sm:gap-[10px] md:!gap-[25px]">
                    {daysOfWeek.map((day, index) => (
                        <div key={index} className="w-full py-1 text-center font-semibold text-c-dark-green">
                            {day}
                        </div>
                    ))}
                </div>
            </div>

            {/* Calendar days */}
            <div className="grid w-full grid-cols-7 ssm-calendar:px-10 sm:gap-[10px] md:!gap-[25px]">
                {generateCalendar}
            </div>
        </div>
    );
};

export interface SelectProps {
    name: string;
    value: string;
    label?: string;
    options: { 'name': string, 'value': string }[];
    onChange: (_event: React.ChangeEvent<HTMLSelectElement>) => void;
    className?: string;
}

export const Select = ({ name, value, label, options = [], onChange, className }: SelectProps) => (
    <div className={`relative ${className}`}>
        {label && (
            <label htmlFor={name} className="mb-2 block font-medium text-slate-800">
                {label}
            </label>
        )}
        <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className="h-[35px] cursor-pointer rounded border border-gray-300 bg-white text-sm font-medium text-gray-900 p-1 pr-2 pl-2 outline-none"
            required
        >
            {options.map((option) => (
                <option key={option.value} value={option.value} className='select:bg-c-sidebar-dark-green'>
                    {option.name}
                </option>
            ))}
        </select>
    </div>
);