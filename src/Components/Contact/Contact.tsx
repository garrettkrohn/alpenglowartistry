import React, {MouseEventHandler, useEffect} from "react";
import './Contact.css';
//@ts-ignore
import emailjs from 'emailjs-com';
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import useInput from "../../Hooks/useInput";

const Contact = () => {

    const SERVICE_ID = "service_0le29ik";
    const TEMPLATE_ID = "template_fr3m5sh";
    const USER_ID = "u6GOiEMZ7HvRl8MZI";

    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const [formIsValid, setFormIsValid] = useState(false);

    const {
        value: name,
        valueChangeHandler: setName,
        inputBlurHandler:nameBlur,
        hasError: nameError,
        isValid: nameIsValid,
        reset: nameReset
    } = useInput((value: string) => value.trim() !== '');

    const {
        value: email,
        valueChangeHandler: setEmail,
        inputBlurHandler:emailBlur,
        hasError: emailError,
        isValid: emailIsValid,
        reset: emailReset
    } = useInput((value: string) => value.trim() !== '');

    const {
        value: message,
        valueChangeHandler: setMessage,
        inputBlurHandler: messageBlur,
        hasError: messageError,
        isValid:messageIsValid,
        reset: messageReset
    } = useInput((value: string) => value.trim() !== '');


    useEffect(() => {
        if (nameIsValid && emailIsValid && messageIsValid) {
            setFormIsValid(true);
        } else {
            setFormIsValid(false);
        }
        console.log(nameIsValid, emailIsValid, messageIsValid)
    }, [nameIsValid, emailIsValid, messageIsValid]);

    const handleOnSubmit = () => {
    emailjs.send(SERVICE_ID, TEMPLATE_ID, {name: name, from_email: email, message: message, reply_to: email}, USER_ID).then(
        (result: any) => {
            console.log(result);
            setOpen(true);
            nameReset();
            emailReset();
            messageReset();
            setEmailSent(true);
        },
        (error: any) => {
            console.log(error.text);
        }
    );
    };

    return (
        <div className='contact-container'>
            <div className='contact-title'>
                Contact Form
            </div>
            <form >
                <div>
                    <label>Name:</label>
                    <input
                        type='text'
                        id='name'
                        value={name}
                        onChange={setName}
                        onBlur={nameBlur}
                        className='contact-input'
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type='text'
                        id='email'
                        value={email}
                        onChange={setEmail}
                        onBlur={emailBlur}
                        className='contact-input'

                    />
                </div>
               <div>
                   <label>Message:</label>
                   <input
                       type='text'
                       id='message'
                       value={message}
                       onChange={setMessage}
                       onBlur={messageBlur}
                       className='contact-input, contact-message'
                   />
               </div>
            </form>
            <div>
                <button disabled={!formIsValid} onClick={handleOnSubmit}>Submit</button>
            </div>
            {emailSent ? <div>Email Sent</div> : ''}
        </div>
    );
};

export default Contact;
