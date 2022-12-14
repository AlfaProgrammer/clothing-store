import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { createAuthUserWiithEmalAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";


import "./sign-up-form.styles.scss";

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const SignUpForm = () => {

    const [formFields, setFormfields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;
    // console.log(formFields);

    const resetFormFields = () => {
        setFormfields(defaultFormFields);
    }

    const handleSubmit = async (event)=>{
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("password do not match");
            return;
        }

        try {
            const {user} = await createAuthUserWiithEmalAndPassword(email, password);
            
            await createUserDocumentFromAuth(user, {displayName});

            resetFormFields();
        } catch (error) {
            if(error.code === "auth/email-already-in-use"){
                alert("This email already exists");
            }else{

                console.log("user creation encountered an error", error);
            }
        }
    }


    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormfields({...formFields, [name]: value}); //setState è un Object.assiign, quindi può avere questa forma
        // assegno a formField solo il valore dell'input corrispondente
    }

    return(
        <div className="sign-up-container">
            <h2>Don't have an account? </h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput label="Display Name" type="text" onChange={handleChange} name="displayName" value={displayName} required />
                <FormInput label="Email" type="email" onChange={handleChange} name="email" value={email} required />
                <FormInput label="Password" type="password" onChange={handleChange} name="password" value={password} required />
                <FormInput label="Confirm Password" type="password" onChange={handleChange} name="confirmPassword" value={confirmPassword} required />

                <Button type="submit">Sign up</Button>

            </form>
        </div>
    )
}

export default SignUpForm;