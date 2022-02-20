import React from 'react'
import { useNavigate } from 'react-router-dom';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';

import './header.css'

const CustomHeader = ({state, toggle}) => {

    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem('accessToken')
        navigate('/login')
    }

    return (
        <div className='custom-header'>
            <div>
                {
                    React.createElement(state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: toggle,
                    })
                }
            </div>
            <div onClick={logout} className='user-avatar'>
                logout
            </div>
        </div>
    )
}

export default CustomHeader