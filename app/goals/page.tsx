"use client";

import { MdAccessTimeFilled } from "react-icons/md";

import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ weight: "400", style: "normal", subsets: ["latin"] });

const Page = () => {
  const [isDailySelected, setIsDailySelected] =
    useState<boolean>(false);
  const [isWeeklySelected, setIsWeeklySelected] =
  useState<boolean>(false);
  const [isMonthlySelected, setIsMonthlySelected] =
  useState<boolean>(false);

  const handleDailyRadioClick = () => {
    if (isDailySelected) {
      setIsDailySelected(!isDailySelected);
    }
    setIsDailySelected(!isDailySelected);
  };

  const handleWeeklyRadioClick = () => {
    if (isWeeklySelected) {
      setIsWeeklySelected(!isWeeklySelected);
    }
    setIsWeeklySelected(!isWeeklySelected);
  };

  const handleMonthlyRadioClick = () => {
    if (isMonthlySelected) {
      setIsMonthlySelected(!isMonthlySelected);
    }
    setIsMonthlySelected(!isMonthlySelected);
  };
  
  return (
    <div className={`${inter.className} goals-page min-h-[635px] h-screen max-h-screen w-[99%] min-w-min-width absolute left-[0.5%] top-0 pt-[2.85rem] pb-[0.25rem] z-[-1]`}>
      <div className="flex flex-col w-full h-full gap-[0.375rem]">
        <div className="flex flex-row h-1/5 w-full p-1 border border border-grey-100 shadow rounded">
          <div className="w-[10%] min-w-fit h-full bg-c-sidebar-dark-green rounded shadow flex flex-col">
            <div className="rounded w-full h-[12%] min-h-[35px] max-h-[35px]">
              <div className="flex flex-row w-full h-full">
                <div className="flex w-full h-full justify-center items-center text-sm">
                  <span className="flex items-center text-white whitespace-nowrap overflow-hidden ">
                    <MdAccessTimeFilled className="text-white inline-block mr-[0.375rem] h-4 w-4" />
                    <strong>Cadence</strong>
                  </span>
                </div>
              </div>
              <div className="pl-0 ml-[4%] w-[92%] sm:ml-[3%] sm:w-[94%] h-px bg-white"></div>
            </div>
            <div className="radio-div flex items-center text-white justify-center flex-grow">
              <div className="flex flex-col gap-[10px] ml-1">
                <div className="flex items-center">
                  <input
                    id="daily-radio"
                    title="daily-radio"
                    type="radio"
                    value=""
                    name="cadence-radio"
                    className="w-4 h-4 focus:ring-2 pb-2"
                    checked={isDailySelected}
                    onChange={handleDailyRadioClick}
                    onClick={handleDailyRadioClick}
                  ></input>
                  <label htmlFor="daily-radio" className="ms-1 text-sm font-medium">
                    Daily
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="weekly-radio"
                    title="weekly-radio"
                    type="radio"
                    value=""
                    name="cadence-radio"
                    className="w-4 h-4 focus:ring-2 pb-2"
                    checked={isWeeklySelected}
                    onChange={handleWeeklyRadioClick}
                    onClick={handleWeeklyRadioClick}
                  ></input>
                  <label htmlFor="weekly-radio" className="ms-1 text-sm font-medium">
                    Weekly
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="monthly-radio"
                    title="monthly-radio"
                    type="radio"
                    value=""
                    name="cadence-radio"
                    className="w-4 h-4 focus:ring-2 pb-2"
                    checked={isMonthlySelected}
                    onChange={handleMonthlyRadioClick}
                    onClick={handleMonthlyRadioClick}
                  ></input>
                  <label htmlFor="monthly-radio" className="ms-1 text-sm font-medium">
                    Monthly
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row w-[90%] h-full p-2 pt-1 pb-1">
            <div className="h-full w-1/3 bg-red"></div>
            <div className="h-full w-1/3 bg-black"></div>
            <div className="h-full w-1/3 bg-red"></div>
          </div>
        </div>
        <div className="h-4/5 w-full border border border-grey-100 shadow rounded"></div>
      </div>
    </div>
  );
};
  
export default Page;