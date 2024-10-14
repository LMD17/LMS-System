import './Header.css'
import logo from '../../assets/lms_logo.png'
import { useEffect, useState } from 'react'
import Username from '../Username/Username';


const Header = () => {


    var [date, setDate] = useState(new Date());

    
    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }
    });

    // Format the date to be written out, like: "Thursday, September 5, 2024"
    const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'long',   // Full name of the day
        month: 'long',     // Full month name
        day: 'numeric',     // Day of the month (numeric)
        year: 'numeric',   // Full year

    });

    // Format the date to be written out,like: "Thursday, September 5, 2024"
    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true, // for 12-hour format
    });


   
    return (
        <div className='header'>
            <div className="head-username">
                <Username />
            </div>
            <div className='head-logo'>
                <img src={logo} alt="LMS Logo" />
            </div>
            <div className='head-time'>
                <p>{formattedDate}</p>
                <p>{formattedTime}</p>
            </div>
        </div>
    )
}

export default Header
