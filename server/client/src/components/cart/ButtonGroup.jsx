import { Button, ButtonGroup, styled } from "@mui/material"
import React, { useState } from "react";


const Component = styled(ButtonGroup)`
    margin-top: 30px;
    color: #000;
`;
const StyledButton = styled(Button)`
    border-radius: 60%;
    color:#000;
`;


const GroupButton = () => {
    const [counter, setCounter] = useState(1);

    const handleIncrement = () => {
        setCounter(counter => counter + 1);
    };

    const handleDecrement = () => {
        setCounter(counter => counter - 1);
    };
    return (
        <Component>
            <StyledButton onClick={() => handleDecrement()} disabled={counter === 0}>-</StyledButton>
            <Button disabled>{counter}</Button>
            <StyledButton onClick={() => handleIncrement()}>+</StyledButton>
        </Component>
    )
}

export default GroupButton;