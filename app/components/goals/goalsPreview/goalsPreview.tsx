import SecondaryBtn from "../../buttons/secondaryBtn";

import { FaTrophy } from "react-icons/fa";
import { CgInternal } from "react-icons/cg";
import { GoTriangleRight } from "react-icons/go";
import { IoIosStats } from "react-icons/io";

import { ResponsiveRadialBar } from '@nivo/radial-bar';
import { ResponsiveBar } from '@nivo/bar';

// Nivo graph data templates - to use dynamic values
const userDataSampleUnit = [
    {
        "macro": "Calor.",
        "Unit": 500,
    },
    {
        "macro": "Prot.",
        "Unit": 10,
    },
    {
        "macro": "Carbs",
        "Unit": 80,
    }
];
const userDataSamplePercentage = [
    {
        "id": "Carbs",
        "data": [
            {
                "x": "%", "y": 27
            }
        ]
    },
    {
        "id": "Protein",
        "data": [
            {
                "x": "%", "y": 20
            }
        ]
    },
    {
        "id": "Calories",
        "data": [
            {
                "x": "%", "y": 20
            }
        ]
    },
    {
        "id": "Total",
        "data": [
            {
                "x": "%", "y": 24
            }
        ]
    }
];

const graphTheme = {
    axis: {
      fontSize: '10px',
    },
  };

// All available colors - To represent from bad to excelent progress
const availableGraphColors = ['#EF5350', '#ffA500', '#FFFF00', '#006400', '#00FF00']

// Define color thresholds
const colorThresholds = [
    { max: 20, color: availableGraphColors[0] }, 
    { max: 40, color: availableGraphColors[1] }, 
    { max: 60, color: availableGraphColors[2] }, 
    { max: 80, color: availableGraphColors[3] }, 
    { max: 102, color: availableGraphColors[4] }, 
    { max: 107, color: availableGraphColors[3] },
    { max: 115, color: availableGraphColors[2] },
    { max: 10000, color: availableGraphColors[0] } 
];

// Function to get the color based on percentage
const getColorForValue = (value: number) => {
    for (const threshold of colorThresholds) {
        if (value <= threshold.max) {
            return threshold.color;
        }
    }
    return availableGraphColors[4];
};

// Generate an array of colors based on userDataSamplePercentage
const invertedCalculatedColors = userDataSamplePercentage.map((item) => {
    const color = getColorForValue(item.data[0].y);
    return {
        id: `${item.id}.%`,
        color: color
    };
});


// ---------------------------- Graph Bar Calculated Colors ----------------------------
// Remove the last item since the bar graph does not include the total macros
const invertedCalculatedColorsForBarGraph = invertedCalculatedColors.slice(0, -1);
// Mirror the array
const calculatedColorsForBarGraph = invertedCalculatedColorsForBarGraph.reverse();

// ---------------------------- Radial Bar Calculated Colors ----------------------------
// Mirror the array
const calculatedColorsForRadialBarGraph = invertedCalculatedColors.reverse();

/**
 * 
 * @returns goals preview component
 */
const GoalsPreview = () => {

    const handleGoToGoalsPageBtn = () => {

    }

    return (
        <>
            <div className="flex flex-col h-full w-full text-sm">
                <div className="rounded w-full h-[12%] min-h-[35px] max-h-[35px]">
                    <div className="flex flex-row w-full h-full">
                        <div className="flex w-full h-full justify-center items-center">
                            <span className="flex items-center text-c-dark-green whitespace-nowrap overflow-hidden ">
                                <FaTrophy className="text-c-dark-green inline-block mr-[0.375rem] h-[14px] w-[14px]" />
                                <strong>Goals Preview</strong>
                            </span>
                        </div>
                    </div>
                    <div className="pl-0 ml-[4%] w-[92%] sm:ml-[3%] sm:w-[94%] h-px bg-c-dark-green"></div>
                </div>
                <div className="flex w-full h-full">
                    <div className="flex flex-col sm:flex-row w-full h-full max-h-[95%] p-1 pt-2 pl-[3%] pr-[3%] gap-0 sm:gap-[2%]">
                        <div className="flex flex-col bg-c-paper-white w-full sm:w-1/3 h-full p-1 pr-3 pl-3 rounded text-center">
                            <span className="bg-c-custom-shadow-black text-c-dark-green rounded p-1 font-bold">Check your daily progress!</span>
                            <div className="flex flex-col flex-grow text-white h-full justify-center max-h-[80%] pb-3 pt-3">
                                <span className="text-black ">Understand your behavior, and adjust your meals for <strong className="text-c-dark-green">better results</strong>.</span>
                                <span className="text-black">To set the daily target, and have a wider perspective, with <strong className="text-c-dark-green">weekly and monthly Statistics</strong>, go to...</span>
                            </div>
                            <div className="w-auto text-white">
                                <SecondaryBtn label="Goals Page" isDisabled={false} title="Go to Goals page!" disabledTitle="" icon={<CgInternal className='ml-[0.25rem] w-6 h-6 mb-px' />} onClick={() => { }} />
                            </div>
                        </div>
                        <div className="flex flex-col bg-c-paper-white rounded w-full sm:w-2/3 h-full items-center mt-[1%] sm:mt-0">
                            <div className="w-full h-full p-1 pr-3 pl-3 h-min">
                                <div className="flex w-full justify-center items-center">
                                    <span className="flex items-center text-c-dark-green whitespace-nowrap overflow-hidden p-1 pb-0">
                                        <IoIosStats className="text-c-dark-green inline-block mr-[0.375rem] h-[16px] w-[16px]" />
                                        <strong>Macros Statistics</strong>                                 
                                    </span>
                                </div>
                                <div className="flex w-full justify-center items-center text-xs">
                                    <span className="flex items-center text-c-dark-green whitespace-nowrap overflow-hidden">
                                        Click/hover the bars for more specific info!                                                           
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row w-full h-full gap-[2%] sm:gap-[8%] mt-[1%] sm:mt-0">
                                <div className="flex flex-col h-full w-full sm:w-[46%] rounded">
                                    <div className="flex w-full h-[10%] w-full justify-center items-center">
                                        <span className="flex items-center text-c-dark-green whitespace-nowrap overflow-hidden p-1">
                                            <GoTriangleRight className="text-c-dark-green inline-block mr-[0.25rem] h-5 w-5" />
                                            By Unit
                                        </span>
                                    </div>
                                    <div className="h-[90%] w-full">
                                        <ResponsiveBar
                                            data={userDataSampleUnit}
                                            keys={[
                                                'Unit',
                                            ]}
                                            indexBy="macro"
                                            margin={{ top: 10, right: 15, bottom: 35, left: 35 }}
                                            padding={0.3}
                                            valueScale={{ type: 'linear' }}
                                            indexScale={{ type: 'band', round: true }}
                                            colors={(bar) => invertedCalculatedColorsForBarGraph[bar.index].color}
                                            axisTop={null}
                                            axisRight={null}
                                            axisBottom={{
                                                tickSize: 5,
                                                tickPadding: 5,
                                                tickRotation: 0,
                                                legend: '',
                                                legendPosition: 'middle',
                                                legendOffset: 32,
                                                truncateTickAt: 0,                                                                                                                                                            
                                            }} 
                                            axisLeft={{
                                                tickSize: 5,
                                                tickPadding: 5,
                                                tickRotation: 0,
                                                legend: 'Unit',
                                                legendPosition: 'middle',
                                                legendOffset: -40,
                                                truncateTickAt: 0
                                            }}
                                            labelSkipWidth={12}
                                            labelSkipHeight={12}
                                            labelTextColor={{
                                                from: 'color',
                                                modifiers: [
                                                    [
                                                        'darker',
                                                        1.6
                                                    ]
                                                ],                                          
                                            }}
                                            maxValue={1000}
                                            enableLabel={false}
                                            theme={{
                                                axis: {
                                                    legend: {
                                                        text: {
                                                            fontSize: 10
                                                        }
                                                    },
                                                    ticks: {
                                                        text: {
                                                            fontSize: 10
                                                        }
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col h-full w-full sm:w-[46%] rounded">
                                    <div className="flex w-full h-[10%] w-full justify-center items-center">
                                        <span className="flex items-center text-c-dark-green whitespace-nowrap overflow-hidden p-1">
                                            <GoTriangleRight className="text-c-dark-green inline-block mr-[0.25rem] h-5 w-5" />
                                            By Percentage
                                        </span>
                                    </div>
                                    <div className="h-[88%] w-full">
                                        <ResponsiveRadialBar
                                            data={userDataSamplePercentage}
                                            valueFormat=">-.2f"
                                            padding={0.5}
                                            cornerRadius={2}
                                            margin={{ top: 25, right: 25, bottom: 25, left: 25 }}
                                            radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
                                            circularAxisOuter={{ tickSize: 5, tickPadding: 10, tickRotation: 0 }}
                                            legends={[]}
                                            maxValue={100}
                                            colors={({ id }) => {
                                                var color = 'white';

                                                calculatedColorsForRadialBarGraph.forEach(element => {
                                                    if (id == element.id) {
                                                        color = element.color;
                                                    } 
                                                });   
                                                
                                                return color;
                                            }}
                                            theme={{
                                                axis: {
                                                    legend: {
                                                        text: {
                                                            fontSize: 10
                                                        }
                                                    },
                                                    ticks: {
                                                        text: {
                                                            fontSize: 10
                                                        }
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GoalsPreview;