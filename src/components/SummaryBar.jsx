import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import { Divider, IconButton } from "@mui/material";
import Card from '@mui/material/Card';

import { MenuList } from "./MenuList";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";



export const SummaryBar = () => {

    const {clearAll} = bindActionCreators(actionCreators, useDispatch())

    const clearAllItem = () => {
        clearAll()
    }


    const state = useSelector((state) => state.bank)

    const [menu, setmenu] = useState([])

    useEffect(()=>{
        setmenu(state)
    },[state])

    const handleAddAmount = (id) => () => {
        const oldMenu = [...menu].map((item) => {
            if (item.id === id) {
                const amount = item.amount + 1
                return { ...item, amount, summaryPrice: item.price * amount }
            }
            return item
        })
        setmenu(oldMenu)
    }

    const handleAddDelete = (id) => () => {
        const orderMenu = [...menu].map((item) => {
            if (item.id === id) {
                const amount = item.amount - 1
                if (item.amount > 0) {
                    return { ...item, amount, summaryPrice: item.price * amount }
                }
            }
            return item
        })
        setmenu(orderMenu)
    }
    const total = () => {
        console.log('>>>',menu)
        if(menu.length>0){
            const subTotal = menu.map((total) => {
                return total.summaryPrice - (total.summaryPrice * total.discount / 100)
            })
            console.log('...',subTotal)
            const resultPrice = subTotal.reduce((a, b) => a + b)
            const num = resultPrice.toFixed(2)
            return num
        }
        return 0

    }

    const subTotal = () => {
        if (menu.length > 0) {

            const total = menu.map((price) => {
                return price.summaryPrice
            })
            const totalPrice = total.reduce((a, b) => a + b)
            return totalPrice
        }
        return 0
    }

    const discount = () => {
        if (menu.length > 0) {
            const totalDiscountt = menu.map((count) => {
                return count.summaryPrice * count.discount / 100
            })
            const allDiscount = totalDiscountt.reduce((a, b) => a - b)
            const num = allDiscount.toFixed(2)
            return num
        }
        return 0
    }
    // const handleClearAll = () => {
    //     const order = [...menu].map((all) => {
    //         return { ...all, amount: 0, summaryPrice: 0 }
    //     })
    //     setmenu(order)
    // }

    console.log('summary', state);

    return <div style={{ padding: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h1>Current Order</h1>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button onClick={clearAllItem} style={{ height: '35px', alignItems: 'center', textTransform: 'lowercase' }} variant="outlined">Clear All</Button>
                <IconButton aria-label="delete">
                    <SettingsIcon />
                </IconButton>
            </div>
        </div>
        {menu.map((order) => {
            return <div key={order.id}>
                <MenuList data={order} onAdd={handleAddAmount} onDelete={handleAddDelete} />
            </div>
        })}

        <div >
            <Card style={{ border: '#D3D3D3', width: '100%', height: '200px' }}>
                <div style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold' }}>
                        <p style={{ margin: '0' }}>Subtotal</p>
                        <p style={{ margin: '0' }}>{subTotal()}</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold' }}>
                        <p style={{ margin: '0' }}>Discount</p>
                        <p style={{ margin: '0' }}>{discount()}</p>
                    </div>
                </div>
                <Divider />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '30px', fontWeight: 'bold', padding: '20px' }}>
                    <p style={{ margin: '0' }}>Total</p>
                    <p style={{ margin: '0' }}>{total()}</p>
                </div>
            </Card>
            <Card style={{ border: '#D3D3D3', width: '100%', height: '80px', marginTop: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', padding: '15px' }}>
                    <div>
                        <h6 style={{ margin: '0' }}>CASHLESS CREDIT</h6>
                        <h4 style={{ margin: '0', color: '#D2691E' }}>${total()}</h4>
                        <h6 style={{ margin: '0', color: '#D3D3D3' }}>Available</h6>
                    </div>
                    <Button style={{ height: '35px', textTransform: 'lowercase', marginLeft: 'auto' }} variant="outlined">Cancel</Button>
                </div>
            </Card >
            <Button fullWidth={true} style={{ marginTop: '20px', background: '#D2691E', height: '50px', color: '#fff' }}>
                Pay With Cashless Credit
            </Button>
        </div>
    </div>

}