import { useState } from 'react';

import { buttonConfig } from '../config';
import { IAddInputGroup } from '../interfaces';

import { Button, Form, InputGroup } from "react-bootstrap";

const AddInputGroup = ({type, submitHandler, currentUserId = null}: IAddInputGroup) => {
    const [inputValue, setInputValue] = useState('');
    const inputInfo = buttonConfig[type];

    const handleSubmit = () => {
        if(inputValue){
            submitHandler(inputValue, currentUserId);
            return setInputValue('');
        }
        return alert(`${inputInfo.placeholder} can not be empty`);
    }

    return (
        <Form onSubmit={(e) => e.preventDefault()}>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder={inputInfo.placeholder}
                    aria-label={inputInfo.placeholder}
                    aria-describedby={inputInfo.buttonId}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <Button type='submit' variant="outline-secondary" id={inputInfo.buttonId} onClick={() => handleSubmit()}>
                    {inputInfo.buttonText}
                </Button>
            </InputGroup>
        </Form>
    );
}

export default AddInputGroup;