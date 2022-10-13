import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import "./sign-in-form.styles.scss";

// import { UserContext } from "../../contexts/user.context";
//non ne abbiamo bisongo perche utilizziamo observable di firebase

import { 
    signInWithGooglePopup,
    // createUserDocumentFromAuth,
    signInUserWiithEmailAndPassword 
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
    email: "",
    password: "",
}

//COMPONENTS
const SignInForm = () => {

    const [formFields, setFormfields] = useState(defaultFormFields);
    const {email, password} = formFields;

    // const {setCurrentUser} = useContext(UserContext); 
    //non ne abbiamo bisogno perché utilizzeremo l'observable di firebase

    const resetFormFields = () => {
        setFormfields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup(); //lo user è dentro UserContext
        console.log("SignIn Component: google OAuth");
    }

    const handleSubmit = async (event)=>{
        event.preventDefault();

        try {
            const {user} = await signInUserWiithEmailAndPassword(email, password);
            console.log(user, "SignIn Component: Email-Pass Native Provider");
            resetFormFields();
        } catch (error) { //in risposta da firebase ci arrivano delle strnghe con errori specifici
            // se l'email o passoword sono sbagliati 
            switch (error.code) {
                case "auth/wrong-password":
                    alert("incorrect password");
                    break;
                case "auth/user-not-found":
                    alert("No user associated with this email");
                    break;
            
                default:
                    console.log(error);
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
            <h2>Already have an account? </h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput label="Email" type="email" onChange={handleChange} name="email" value={email} required />
                <FormInput label="Password" type="password" onChange={handleChange} name="password" value={password} required />

                <div className="buttons-container">
                    <Button type="submit">Sign in</Button>
                    {/* di default tutti ibutton sono di tipo submit se dentro unform  */}
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google sing in</Button>
                </div>

            </form>
        </div>
    )
}

export default SignInForm;