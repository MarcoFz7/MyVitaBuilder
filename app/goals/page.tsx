"use client";

import { MdAccessTimeFilled } from "react-icons/md";

import { Inter } from "next/font/google";
import { useState } from "react";

import UserGoals from "../components/goals/goals/userGoals";

const inter = Inter({ weight: "400", style: "normal", subsets: ["latin"] });

const Page = () => {
  const [isDailySelected, setIsDailySelected] =
    useState<boolean>(true);
  const [isWeeklySelected, setIsWeeklySelected] =
  useState<boolean>(false);
  const [isMonthlySelected, setIsMonthlySelected] =
  useState<boolean>(false);
  const [selectedCadence, setSelectedCadence] =
  useState<string>("Daily");

  const handleDailyRadioClick = () => {
    if (!isDailySelected) {
      setIsDailySelected(true);
      setSelectedCadence("Daily");
    }
    setIsWeeklySelected(false);
    setIsMonthlySelected(false);
  };

  const handleWeeklyRadioClick = () => {
    if (!isWeeklySelected) {
      setIsWeeklySelected(true);
      setSelectedCadence("Weekly");
    }
    setIsDailySelected(false);
    setIsMonthlySelected(false);
  };

  const handleMonthlyRadioClick = () => {
    if (!isMonthlySelected) {
      setIsMonthlySelected(true);
      setSelectedCadence("Monthly");
    }
    setIsDailySelected(false);
    setIsWeeklySelected(false);
  };
  
  return (
    <div className={`${inter.className} bg-c-global-bg-color min-h-[635px] h-screen max-h-screen w-[99%] min-w-min-width absolute left-[0.5%] top-0 pt-[2.85rem] pb-[0.35rem] z-[-1]`}>
      <div className="flex flex-col w-full h-full gap-[0.5rem]">
        <div className="flex flex-col sm:flex-row h-full sm:h-auto w-full gap-[0.35rem] min-h-[205px] md:min-h-[180px]">
          <div className="w-full sm:w-[22.5%] min-w-fit sm:h-full p-1 bg-white border border-grey-100 shadow-sm rounded">
            <div className="flex flex-col w-full h-full bg-c-sidebar-dark-green rounded shadow-sm">
              <div className="rounded w-full h-[12%] min-h-[35px] max-h-[35px]">
                <div className="flex flex-row w-full h-full">
                  <div className="flex w-full h-full justify-center items-center text-sm">
                    <span className="flex items-center text-white whitespace-nowrap overflow-hidden ">
                      <MdAccessTimeFilled className="text-white inline-block mr-[0.375rem] h-[14px] w-[14px]" />
                      <strong>Cadence</strong>
                    </span>
                  </div>
                </div>
                <div className="pl-0 ml-[8%] w-[84%] sm:ml-[7%] sm:w-[86%] h-px bg-white"></div>
              </div>
              <div className="flex items-center h-[88%] text-white justify-center p-2 sm:p-0">
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
          </div>
          <div className="flex flex-row w-full sm:w-[77.5%] h-auto sm:h-full p-2 pt-1 pb-3 bg-white border border-grey-100 shadow-sm rounded">
            <UserGoals cadence={selectedCadence}/>
          </div>
        </div>
        <div className="sm:h-full bg-white w-full border border border-grey-100 shadow-sm rounded">
        </div>
      </div>
    </div>
  );
};
  
export default Page;