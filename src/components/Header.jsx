import React from "react";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'

const item = [
    {
        name: 'ALL ITEMS',
        to: '/',
    },
    {
        name: 'FOOD',
        to: '/food'
    },
    {
        name: 'ALCOHOL',
        to: '/'
    }
]

export const Header = () => {
    return <div style={{ padding: '50px 0 50px 50px' }}>
        {
            item.map((each) => (
                <Link style={{textDecoration:'none'}} to=
                    {each.to} key={each.name}>
                    <Button style={{ borderRadius: '15px', marginRight: '70px' }} variant="contained" color='info'>{each.name}</Button>
                </Link>
            ))
        }
    </div>
}
