import { Avatar } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import './HeaderOption.css';

//below ew are doing destructuring -> instead of passing props directly and then using props.value, we destructure it into values as {value1, value2}
function HeaderOption({avatar, Icon, title, onClick}) {
    
    const user = useSelector(selectUser);

    return (
        <div onClick={onClick} className="headerOption">
            {Icon && <Icon className="headerOption__icon"/>}
            {avatar && 
                <Avatar className="headerOption__icon" src={user?.photoUrl}>{user?.photoUrl}</Avatar>
            }
            <h2 className='headerOption__title'>{title}</h2>
        </div>
    )
}

export default HeaderOption
