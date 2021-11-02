import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { Button, Dialog, DialogActions, IconButton, TextField } from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";

import db from "../store/firebaseConfig";


// const menu = [
//     {
//         id: 1,
//         name: 'Grilled Corn',
//         weight: 150,
//         price: 10,
//         image: 'https://cdn-bangp.nitrocdn.com/sgDWyaKSQWynxlPFJioCiXyCPePotHlq/assets/static/optimized/rev-62087a5/wp-content/uploads/2019/06/Mexican-Corn-Elote.jpeg',
//         amount: 0,
//         summaryPrice: 0,
//         discount: 5

//     },
//     {
//         id: 2,
//         name: 'Ranch Burgers',
//         weight: 150,
//         price: 7.75,
//         image: 'https://www.slenderkitchen.com/sites/default/files/styles/gsd-1x1/public/recipe_images/beef-ranch-burger.jpg',
//         amount: 0,
//         summaryPrice: 0,
//         discount: 5
//     },
//     {
//         id: 3,
//         name: 'Becon pizza',
//         weight: 150,
//         price: 7.00,
//         image: 'https://media-cdn.tripadvisor.com/media/photo-s/06/31/7f/a5/eldofninn-pizzeria.jpg',
//         summaryPrice: 0,
//         amount: 0,
//         discount: 7
//     },
//     {
//         id: 4,
//         name: 'Fettuccine pasta',
//         weight: 150,
//         price: 7.75,
//         image: 'https://1.bp.blogspot.com/-KvsNtTxd6CY/X3RX26c3yBI/AAAAAAABvco/tbEWlc9XOkATn-CSqPR-zkIY1vApm9cRACLcBGAsYHQ/s0/grandma%2Bfettuccine%2B12.jpg',
//         amount: 0,
//         summaryPrice: 0,
//         discount: 3
//     },
//     {
//         id: 5,
//         name: 'Stuffed Flank Steak',
//         weight: 150,
//         price: 13.50,
//         image: 'https://www.simplyrecipes.com/thmb/2BlZo98JUeXYYE0o7_D_7UB9gOc=/1800x1200/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2003__08__rolled-stuffed-flank-steak-horiz-a-1800-cd8eeb1f03b94191b3ffed3fb31c08e9.jpg',
//         amount: 0,
//         summaryPrice: 0,
//         discount: 12
//     },
//     {
//         id: 6,
//         name: 'Tortillas',
//         weight: 150,
//         price: 7.5,
//         image: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F6477169.jpg',
//         amount: 0,
//         summaryPrice: 0,
//         discount: 0
//     }
// ]



export const Home = () => {
    const [openDialog, setOpenDialog] = useState(false)
    const [selectMenu, setSelectMenu] = useState(null)
    const [menuAmount, setmenuAmount] = useState(0)
    const [menuData, setMenuData] = useState([])

    const dispatch = useDispatch();

    const { addMenu } = bindActionCreators(actionCreators, dispatch)

    useEffect(() => {
        db.collection("menu")
            .onSnapshot((data) => {
                setMenuData(data.docs.map((each) => {
                    return (each.data())
                }))
            });
    }, [])

    // const addDataToFirebase = () => {
    //     menu.forEach((each, i) => {
    //         db.collection("menu").add(each).then(() => {
    //             console.log('success', i)
    //         })
    //     })
    // }


    const handleOpenDialog = (item) => () => {
        setSelectMenu(item)
        setOpenDialog(true)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
        setmenuAmount(0)
    }
    const handleAddAmout = () => {
        setmenuAmount(menuAmount + 1)
    }
    const handleAddDelete = () => {
        if (menuAmount > 0) {
            setmenuAmount(menuAmount - 1)
        }
    }

    const handleChangeAmout = (event) => {
        setmenuAmount(parseInt(event.target.value))
    }

    const handleSelect = () => {
        const result = { ...selectMenu, amount: menuAmount, summaryPrice: selectMenu.price * menuAmount }
        console.log('****',result)
        addMenu(result)
        handleCloseDialog()

    }

    return <div>
        <Grid container spacing={2}>
            {/* <Button onClick={addDataToFirebase}>add</Button> */}
            {
                menuData.map((each) => (
                    <Grid item sm={6} md={4} key={each.id} style={{ cursor: 'pointer' }}
                        onClick={handleOpenDialog(each)}>
                        <Card variant="outlined" style={{ padding: '12px', borderRadius: '15px', marginLeft: '25px', boxSizing: 'border-box', maxHeight: '233px' }}>
                            <div>
                                <div>
                                    <p style={{ fontWeight: 'bold', fontSize: "30px", margin: '0' }} >{each.name}</p>
                                    <p style={{ color: '#A9A9A9', marginTop: '0', fontSize: '20px' }}>{`${each.weight}g`}</p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                                    <p style={{ fontWeight: 'bold', fontsiz: '16px', color: '#D2691E', marginBottom: '0', fontSize: '25px' }}>{`$${each.price}`}</p>
                                    <img style={{ width: '120px', height: '120px', borderRadius: '15px', objectFit: 'cover' }} src={each.image} alt="" />
                                </div>
                            </div>
                        </Card>
                    </Grid>
                ))
            }
        </Grid>
        <Dialog onClose={handleCloseDialog} open={openDialog} fullWidth={true} maxWidth='sm'>
            {selectMenu && <div>
                <div style={{ padding: '25px', display: 'flex' }}>
                    <img style={{ width: '120px', height: '120px', objectFit: 'cover', marginRight: '20px', borderRadius: '15px' }} src={selectMenu.image} alt="" />
                    <div>
                        <p style={{ fontSize: '30px', marginBottom: '0' }}>{selectMenu.name}</p>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton color="primary" aria-label="addBoxIcon" onClick={handleAddDelete}  >
                                <IndeterminateCheckBoxIcon style={{ fontSize: '40px' }} />
                            </IconButton>
                            <TextField type='number' size='small' id="outlined-basic" label="" variant="outlined" value={menuAmount} onChange={handleChangeAmout} />
                            <IconButton color="primary" aria-label="addBoxIcon" onClick={handleAddAmout} >
                                <AddBoxIcon style={{ fontSize: '40px' }} />
                            </IconButton>

                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            </div>}
            <DialogActions>
                <Button onClick={handleSelect} variant="outlined">OK</Button>
            </DialogActions>
        </Dialog>
    </div>

}