import { IconButton } from "@mui/material";
import React from "react";
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import DeleteIcon from '@mui/icons-material/Delete';
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";
import { useDispatch } from "react-redux";


export const MenuList = ({ data, onAdd, onDelete }) => {
    const { deleteMenu } = bindActionCreators(actionCreators, useDispatch())

    const deleteMenuItem = (id) => () => {

        deleteMenu(id)
    }


    return <div style={{ display: 'flex', justifyContent: 'space-between' }} >
        <div style={{ display: 'flex' }}>
            <img style={{ width: '60px', height: '60px', borderRadius: '15px', objectFit: 'cover' }} src={data.image} alt="" />
            <p style={{ paddingLeft: '20px', fontSize: '20px' }}>{data.name}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton aria-label="delete" onClick={onDelete(data.id)} style={{ width: '40px', height: '40px' }}>
                <IndeterminateCheckBoxIcon style={{ fontSize: '40px', }} />
            </IconButton>
            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>{data.amount}</p>
            <IconButton aria-label="add" onClick={onAdd(data.id)} style={{ width: '40px', height: '40px' }} >
                <AddBoxIcon style={{ fontSize: '40px' }} />
            </IconButton>
            <p style={{ fontSize: '20px', fontWeight: 'bold', margin: '15px', width: '75px', textAlign: 'right' }}>
                {data.summaryPrice}
            </p>
            <IconButton onClick={deleteMenuItem(data.id)}>
                <DeleteIcon  />
            </IconButton>
        </div>
    </div>
}
