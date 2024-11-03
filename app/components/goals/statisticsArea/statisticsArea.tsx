import { GoTriangleRight } from "react-icons/go";
import { IoIosStats } from "react-icons/io";

import { ResponsiveRadialBar } from '@nivo/radial-bar';
import { ResponsiveBar } from '@nivo/bar';
import { UserDataPercentage, UserDataUnit } from "@/app/types";

/**
 * Interface for the statistics area component with needed props from the parent
 */
interface StatisticsAreaProps {
    userDataToUseUnit: UserDataUnit[];
    userDataToUsePercentage: UserDataPercentage[];
    initializeWithPhoneLayout: boolean;
}

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

/**
 * 
 * @param userDataToUseUnit - data used on the graph that analyses the macro by their unit (gram or other)
 * @param userDataToUsePercentage - data used on the graph that analyses the macro considering the user goals
 *
 * @returns statistics area component
 */
const StatisticsArea = ({ userDataToUseUnit, userDataToUsePercentage, initializeWithPhoneLayout }: StatisticsAreaProps) => {

    // Generate an array of colors based on userDataSamplePercentage
    const invertedCalculatedColors = userDataToUsePercentage.map((item) => {
        const color = getColorForValue(item.data[0].y);
        return {
            id: `${item.id}.%`,
            color: color
        };
    });


    // ---------------------------- Graph Bar Calculated Colors ----------------------------
    // Remove the last item since the bar graph does not include the total macros
    const invertedCalculatedColorsForBarGraph = invertedCalculatedColors.slice(0, -1);
    // Add more items for macros without target - info only
    const macrosWithoutTarget = { 
        id: "macro", 
        color: "#D9D9D9"
    };
    
    // Get ammount of macros without target 
    const ammountOfMacrosWithoutTarget = userDataToUseUnit.length - userDataToUsePercentage.length + 1;

    for (let i=0; i < ammountOfMacrosWithoutTarget; i++) {
        invertedCalculatedColorsForBarGraph.push(macrosWithoutTarget);
    }

    // ---------------------------- Radial Bar Calculated Colors ----------------------------
    // Mirror the array
    const calculatedColorsForRadialBarGraph = invertedCalculatedColors.reverse();

    return (
        <>
            <div className="flex flex-col rounded w-full h-full items-center mt-[1%] sm:mt-0">
                <div className="w-full h-full p-1 pr-3 pl-3 h-min">
                    <div className="flex w-full justify-center items-center">
                        <span className="flex items-center text-c-dark-green whitespace-nowrap overflow-hidden p-1 pb-0">
                            <IoIosStats className="text-c-dark-green inline-block mr-[0.375rem] h-[16px] w-[16px]" />
                            <strong>Macros Statistics</strong>                                 
                        </span>
                    </div>
                    <div className="flex w-full justify-center items-center text-xs">
                        <span className="flex items-center text-c-dark-green whitespace-nowrap text-ellipsis">
                            Click/hover the bars for more specific info!                                                           
                        </span>
                    </div>
                </div>
                <div className={`flex ${initializeWithPhoneLayout ? 'flex-col sm:!gap-[2%]' : 'flex-col sm:flex-row'} w-full h-full gap-[2%] sm:gap-[8%] mt-[1%] sm:mt-0`}>
                    <div className={`flex flex-col h-full w-full ${initializeWithPhoneLayout ? 'w-full' : 'sm:w-[46%]'} rounded`}>
                        <div className="flex w-full h-[10%] w-full justify-center items-center">
                            <span className="flex items-center text-c-dark-green whitespace-nowrap overflow-hidden p-1">
                                <GoTriangleRight className="text-c-dark-green inline-block mr-[0.25rem] h-5 w-5" />
                                By Unit
                            </span>
                        </div>
                        <div className="h-[90%] w-full">
                            <ResponsiveBar
                                data={userDataToUseUnit}
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
                    <div className={`flex flex-col h-full w-full ${initializeWithPhoneLayout ? 'w-full' : 'sm:w-[46%]'} sm:pb-[10px] rounded`}>
                        <div className="flex w-full h-[10%] w-full justify-center items-center">
                            <span className="flex items-center text-c-dark-green whitespace-nowrap overflow-hidden p-1">
                                <GoTriangleRight className="text-c-dark-green inline-block mr-[0.25rem] h-5 w-5" />
                                By Percentage
                            </span>
                        </div>
                        <div className="h-[88%] w-full">
                            <ResponsiveRadialBar
                                data={userDataToUsePercentage}
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
        </>
    );
};

export default StatisticsArea;