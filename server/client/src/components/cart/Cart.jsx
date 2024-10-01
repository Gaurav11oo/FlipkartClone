
import { Grid, Typography, Box, styled, Button } from "@mui/material";
import { useSelector } from "react-redux"
import { toast } from "react-toastify";
//COMPONENTS
import CartItem from "./CartItem";
import TotalView from "./TotalView";
import EmptyCart from "./EmptyCart";
// import { payUsingPaytm } from "../../service/api";
// import { post } from "../../utils/paytm";
import axios from 'axios';



const Container = styled(Grid)(({ theme }) => ({
    padding: '30px 135px',
    [theme.breakpoints.down('md')]: {
        padding: '15px 0',
    }
}));

const Header = styled(Box)`
    padding: 15px 24px;
    background: #fff;
`;

const ButtonWrapper = styled(Box)`
    padding: 16px 22px;
    background: #fff;
    box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
    border-top: 1px solid #f0f0f0;
`;

const StyledButton = styled(Button)`
    display: flex;
    margin-left: auto;
    background: #fb641b;
    color: #fff;
    width: 250px;
    height: 51px;
    border-radius: 2px;

`;

const LeftComponent = styled(Grid)(({ theme }) => ({
    paddingRight: 15,
    [theme.breakpoints.down('md')]: {
        marginBottom: 15
    }
}));

const Cart = () => {


    const buyNow = async () => {
        const data = {
            name: "John Doe",
            mobileNumber: 1234567890,
            amount: 100,
        }
        try {
            const response = await axios.post('http://localhost:8000/create-order', data)
            console.log(response.data)
            window.location.href = response.data.url
            toast.dark("Proceed to payment!!!");

        } catch (error) {
            console.log("error in payment", error)
        }
    }

    const { cartItems } = useSelector(state => state.cart);
    return (
        <>
            {
                cartItems.length ?
                    <Container container>
                        <LeftComponent item lg={9} md={9} sm={12} xs={12}>
                            <Header>
                                <Typography>My Cart ({cartItems.length})</Typography>
                            </Header>
                            {
                                cartItems.map(item => (
                                    <CartItem item={item} />

                                ))
                            }
                            <ButtonWrapper>
                                <StyledButton variant="contained" onClick={() => buyNow()}>Place Order</StyledButton>
                                {/* <StyledButton variant="contained">Place Order</StyledButton> */}
                            </ButtonWrapper>

                        </LeftComponent>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <TotalView cartItems={cartItems} />
                        </Grid>
                    </Container>
                    : <EmptyCart />
            }
        </>
    )
}

export default Cart