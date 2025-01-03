"use client"

import './navbar.css'
import Link from 'next/link';
import { FaTrophy, FaHeartbeat } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { RiUserHeartFill } from "react-icons/ri";
import { usePathname } from 'next/navigation';
import { Inter } from 'next/font/google';
import React, { useState, useEffect } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi'

const inter = Inter({weight: '400', style: "normal", subsets: ["latin"]})


const menuMainItems=[
  {
    path:"/activity",
    name:"Activity",
    icon:<RiUserHeartFill className='w-[16px] h-[16px] mr-[0.1rem] mt-[0.1rem]'/>
  },
  {
    path:"/nutrition",
    name:"Nutrition",
    icon:<FaHeartbeat className='w-[15px] h-[15px] mr-[0.1rem]'/>
  },
  {
    path:"/goals",
    name:"Goals",
    icon:<FaTrophy className='w-4 h-4 mr-[0.1rem]'/>
  }
]

const menuSecondaryItems=[
  {
    path:"/settings",
    name:"Settings",
    icon:<IoMdSettings className='w-[18px] h-[18px]'/>
  }
]

// Custom hook to get the width of the screen
function useWindowWidth() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    function updateWidth() {
      setWidth(window.innerWidth);
    }

    // Add resize event listener
    window.addEventListener("resize", updateWidth); 
    // Call initially to get the width
    updateWidth(); 

    return () => {
      // Cleanup event listener
      window.removeEventListener("resize", updateWidth); 
    };
  }, []);

  return width;
}


export default function NavBar() {
    const [isSmallScreen, setIsSmallScreen] = useState<boolean>();
    const [clickedMainIndex, setClickedMainIndex] = useState(-1);
    const [clickedSecondaryIndex, setClickedSecondaryIndex] = useState(-1);
    const [isNavbarReady, setIsNavbarReady] = useState(false);

    const currentPage = usePathname();
    var width = useWindowWidth();

    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    useEffect(() => {
      setIsNavbarReady(true);
    }, []);
    
    useEffect(() => {
      if (width <= 828) {
        if (!isSmallScreen) {
          setIsSmallScreen(true);
        } 
      } 
      else 
      {
        if (isSmallScreen) {
          setIsSmallScreen(false);
        }
      }
    }, [width]);

    // Used to set the corresponding navigation item as selected on refresh/start
    useEffect(() => {
      if (clickedMainIndex == -1) {
        switch (currentPage) {
          case "/activity":
            setClickedMainIndex(0);
            break;
          case "/nutrition":
            setClickedMainIndex(1);
            break;
          case "/goals":
            setClickedMainIndex(2);
            break;
        } 
      }
      if (clickedSecondaryIndex == -1) {
        switch (currentPage) {
          case "/settings":
            setClickedSecondaryIndex(0);
            break;
        } 
      }
    }, []);

    const handleMainItemClick = (index: number) => {
      setClickedSecondaryIndex(-1);

      // Check if is small screen 
      if (isSmallScreen && index != clickedMainIndex) {
        toggleNavbar();
        
        resetNavbarLogic();
      }

      setClickedMainIndex(index);
    };

    const handleSecondaryItemClick = (index: number) => {
      setClickedMainIndex(-1);

      // Check if is small screen
      if (isSmallScreen && index != clickedSecondaryIndex) {
        toggleNavbar();
        
        resetNavbarLogic();
      }

      setClickedSecondaryIndex(index);
    };

    const toggleNavbar = () => {
      setIsNavbarOpen(!isNavbarOpen);
    };

    const resetNavbarLogic = () => {
      // Needed since the click is still on the navbar (generally doesn't close)
      const button = document.querySelector('.openclose-navbar-btn') as HTMLButtonElement;
      if (button) {
        // reset button
        button.click();
        button.blur();
      }
    }

    return (
        <div className='navbar-panel'>
          <div className='navbar shadow-navbarShadow'>
            {isNavbarReady ? 
              <div className='navbar-container'>
                <div className='navbar-container-info'>
                  {isSmallScreen ? 
                  <button type='button' title='Open/Close Navbar' className={`openclose-navbar-btn${isNavbarOpen ? '' : '-closed'}`} onClick={toggleNavbar}>
                    <GiHamburgerMenu/>
                  </button>
                  : null }
                  <h3 className={`${inter.className} navbar-app-name${isSmallScreen ? '-small-screen' : ''}`}>MyVitaBuilder</h3>
                </div>
                <div className={isSmallScreen ? `sidebar-container-paths${isNavbarOpen ? '' : '-closed'}` : 'navbar-container-paths'}>
                  <div className={`options${isSmallScreen ? '-small-screen' : ''} md:mr-4`}>                     
                    {
                        menuMainItems.map((item, index) => (                       
                            <Link href={item.path} key={index} className={`option group ${clickedMainIndex === index ? 'clicked-option' : ''}`} onClick={() => handleMainItemClick(index)}>
                              <div className={`group-hover:text-white icon ${clickedMainIndex === index ? 'clicked-icon' : ''}`}>{item.icon}</div>                    
                              <h3 className={`${inter.className} group-hover:text-white link-text ${clickedMainIndex === index ? 'clicked-text' : ''}`}>{item.name}</h3>
                            </Link>
                        ))
                    }                      
                  </div>
                  <div className={`options${isSmallScreen ? '-small-screen' : ''}`}>                     
                    {
                        menuSecondaryItems.map((item, index) => (                       
                            <Link href={item.path} key={index} className={`option group ${clickedSecondaryIndex === index ? 'clicked-option' : ''}`} onClick={() => handleSecondaryItemClick(index)}>
                                <div className={`group-hover:text-white icon ${clickedSecondaryIndex === index ? 'clicked-icon' : ''}`}>{item.icon}</div>                    
                                <h3 className={`${inter.className} group-hover:text-white link-text ${clickedSecondaryIndex === index ? 'clicked-text' : ''}`}>{item.name}</h3>
                            </Link>
                        ))
                    }
                  </div>
                </div>
              </div>
            : null }  
          </div>
        </div>           
    )
}