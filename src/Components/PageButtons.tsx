import React, { useEffect, useState } from "react";
import axios from "axios";
import './styles.css';
import {MdOutlineKeyboardDoubleArrowRight,MdOutlineKeyboardDoubleArrowLeft,MdOutlineKeyboardArrowLeft,MdOutlineKeyboardArrowRight} from 'react-icons/md';

interface ApiResponse {
  data: {
    meta: {
      total: number;
      per_page: number;
      current_page: number;
      last_page: number;
    };
  };
}

interface LastPageComponentProps {
  page: number;
  setPage: (n: number) => void;
}

const LastPageComponent: React.FC<LastPageComponentProps> = ({ page, setPage }) => {
  const [lastPage, setLastPage] = useState<number>(0);
  const [selectedButton, setSelectedButton] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          "https://api2.myauto.ge/ka/products/"
        );
        const { last_page } = response.data.data.meta;
        setLastPage(last_page);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Rest of the useEffect code

    const button = document.getElementById(selectedButton.toString());
    if (button) {
      const innerHTML = button.innerHTML;
      // onInnerHTML(innerHTML); // Call the onInnerHTML function with innerHTML value
    }

    // Rest of the component code
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      console.log(page);
    }, 2000); // Log every 2 seconds (2000 milliseconds)

    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, [selectedButton]);

  return (
    <div className="navbut">
      <button className="butt"
        disabled = {page === 1}
        onClick={() => {
          setPage(1);
        }}
      ><MdOutlineKeyboardDoubleArrowLeft/></button>
      <button className="butt"
        disabled = {page === 1}
        onClick={() => {
          setPage(page - 1);
        }}
      ><MdOutlineKeyboardArrowLeft/></button>

      {
        (() => {
          let x: any[] = [];
          for (let i = Math.min(Math.max(1, page - 3), lastPage - 6); i <= Math.min(Math.max(7, page + 3), lastPage); i++) {
            x.push(<button
              id={i+""}
              className="butt"
              style={page === i ? { color: "orangered" } : {}}
              onClick={() => {
                setPage(i);
              }}
            >
              {i}
            </button>);
          }
          return x;
        })()
      }

      <button className="butt"
        disabled = {page >= lastPage}
        onClick={() => {
          setPage(page + 1);
        }}
      >

<MdOutlineKeyboardArrowRight/>
        </button>
      <button className="butt"
        disabled = {page === lastPage}
        onClick={() => {
          setPage(lastPage);
        }}
      ><MdOutlineKeyboardDoubleArrowRight/></button>
      {/* <p>Last Page: {lastPage}</p> */}
    </div>
  );
};

export default LastPageComponent;