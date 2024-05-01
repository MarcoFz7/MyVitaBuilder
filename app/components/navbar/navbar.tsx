"use client"

import './navbar.css'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Inter } from 'next/font/google';
import React, { useState, useEffect } from 'react';
import { TbStar } from 'react-icons/tb';
import { GiHamburgerMenu } from 'react-icons/gi'

const inter = Inter({weight: '400', style: "normal", subsets: ["latin"]})


const menuMainItems=[
  {
      path:"/nutrition",
      name:"Nutrition",
      icon:<TbStar/>
  },
  {
      path:"/experience",
      name:"Experience",
      icon:<TbStar/>
  },
  {
      path:"/projects",
      name:"Projects",
      icon:<TbStar/>
  }
]

const menuSecondaryItems=[
  {
      path:"/contacts",
      name:"Contacts",
      icon:<TbStar/>
  }
]


export default function SideNavBar() {
    const [isNavbarOpen, setIsNavbarOpen] = useState(true);
    const [clickedMainIndex, setClickedMainIndex] = useState(-1);
    const [clickedSecondaryIndex, setClickedSecondaryIndex] = useState(-1);

    const currentPage = usePathname();

    // Used to set the corresponding navigation item as selected on refresh/start
    useEffect(() => {
      if (clickedMainIndex == -1) {
        switch (currentPage) {
          case "/nutrition":
            setClickedMainIndex(0);
            break;
          case "/experience":
            setClickedMainIndex(1);
            break;
          case "/projects":
            setClickedMainIndex(2);
            break;
        } 
      }
      if (clickedSecondaryIndex == -1) {
        switch (currentPage) {
          case "/contacts":
            setClickedSecondaryIndex(0);
            break;
        } 
      }
    }, []);

    const handleMainItemClick = (index: number) => {
      setClickedSecondaryIndex(-1);
      setClickedMainIndex(index);
    };

    const handleSecondaryItemClick = (index: number) => {
      setClickedMainIndex(-1);
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
          <button type='button' title='Open/Close Navbar' className={`openclose-navbar-btn${isNavbarOpen ? '' : '-closed'}`} onClick={toggleNavbar}>
              <GiHamburgerMenu/>
          </button>
          <div className={`navbar${isNavbarOpen ? '' : '-closed'}`}>
            <div className='navbar-container'>
              <div className='options'>                     
                {
                    menuMainItems.map((item, index) => (                       
                        <Link href={item.path} key={index} className={`option group ${clickedMainIndex === index ? 'clicked-option' : ''}`} onClick={() => handleMainItemClick(index)}>
                          <div className={`group-hover:text-white icon ${clickedMainIndex === index ? 'clicked-icon' : ''}`}>{item.icon}</div>                    
                          <h3 className={`${inter.className} group-hover:text-white link-text ${clickedMainIndex === index ? 'clicked-text' : ''}`}>{item.name}</h3>
                        </Link>
                    ))
                }                      
              </div>
              <div className='options'>                     
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
        </div>           
    )
}