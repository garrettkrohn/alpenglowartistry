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
    const USER_ID = "C_jK2QIM4s7Q8G8AR";

    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);

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
        }
        console.log(nameIsValid, emailIsValid, messageIsValid)
    }, [nameIsValid, emailIsValid, messageIsValid]);

    const handleOnSubmit = (e: MouseEventHandler) => {
    emailjs.send(SERVICE_ID, TEMPLATE_ID, {name, email, message}, USER_ID).then(
        (result: any) => {
            console.log(result.text);
            setOpen(true);
            nameReset();
            emailReset();
            messageReset();
        },
        (error: any) => {
            console.log(error.text);
        }
    );
    };

    // const handleNameChange = (e: any) => {
    //     setName(e.target.value);
    // };
    //
    // const handleEmailChange = (e: any) => {
    //     setEmail(e.target.value);
    // };
    //
    // const handleMessageChange = (e: any) => {
    //     setMessage(e.target.value);
    // };
    //
    // const Alert = React.forwardRef(function Alert(props, ref) {
    //     //@ts-ignore
    //     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    // });
    //
    // function CustomizedSnackbars() {
    //     const [open, setOpen] = React.useState(false);
    //
    //     const handleClick = () => {
    //         setOpen(true);
    //     };
    //
    //     const handleClose = (event: any, reason: any) => {
    //         if (reason === "clickaway") {
    //             return;
    //         }
    //
    //         setOpen(false);
    //     };
    // }
    //
    // const handleClose = (event: any, reason: any) => {
    //     if (reason === "clickaway") {
    //         return;
    //     }
    //
    //     setOpen(false);
    // };

    return (
        <div>
            Contact Form
            <form >
                <label>Name</label>
                <input
                    type='text'
                    id='name'
                    value={name}
                    onChange={setName}
                    onBlur={nameBlur}
                />
                <label>Email</label>
                <input
                    type='text'
                    id='email'
                    value={email}
                    onChange={setEmail}
                    onBlur={emailBlur}
                />
                <label>Message</label>
                <input
                    type='text'
                    id='message'
                    value={message}
                    onChange={setMessage}
                    onBlur={messageBlur}
                />
            </form>
            <button disabled={!formIsValid}>Submit</button>
        </div>
    );
};

export default Contact;
