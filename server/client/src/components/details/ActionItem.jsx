import React from 'react';
import { useState } from "react";
import { Box, Button, styled } from "@mui/material";
import { ShoppingCart as Cart, FlashOn as Flash } from '@mui/icons-material'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import { toast } from 'react-toastify';
// import { payUsingPaytm } from "../../service/api.js";
// import { post } from "../../utils/paytm";
import axios from 'axios';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const LeftContainer = styled(Box)(({ theme }) => ({
    minWidth: '40%',
    padding: '40px 0 0 80px',
    [theme.breakpoints.down('md')]: {
        padding: '20px 40px'
    }
}));

const Image = styled('img')({
    width: '95%',
    padding: '15px'
});

const StyledButton = styled(Button)(({ theme }) => ({
    width: '48%',
    height: 50,
    borderRadius: 2,
    [theme.breakpoints.down('lg')]: {
        width: '44%'
    },
    [theme.breakpoints.down('sm')]: {
        width: '48%'

    }


}));

const ActionItem = ({ product }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    // const [quantity] = useState(1);
    const { id } = product;




    const addItemToCart = () => {
        dispatch(addToCart(id, quantity));
        navigate('/cart');
    }


    const buyNow = async () => {
        const data = {
            name: "John Doe",
            mobileNumber: 1234567890,
            amount: 100,
        }
        try {
            // const response = await axios.post('http://localhost:8000/create-order', data)
            const response = await axios.post('create-order', data)
            console.log(response.data)
            window.location.href = response.data.url
            toast.dark("Proceed to payment!!!");
        } catch (error) {
            console.log("error in payment", error)
        }
    }
    return (
        <LeftContainer>
            <Box style={{
                padding: '15px 20px',
                border: '1px solid #f0f0f0',
                marginBottom: 10
            }}>
                <Image src={product.detailUrl} alt='product' />
            </Box>
            <StyledButton variant="contained" onClick={() => addItemToCart()} style={{ marginRight: 10, background: '#ff9f00' }}><Cart />Add to Cart</StyledButton>
            <StyledButton variant="contained" onClick={() => buyNow()} style={{ background: '#fb541b' }}><Flash />Buy Now</StyledButton>
        </LeftContainer >
    )
}



export default ActionItem;
