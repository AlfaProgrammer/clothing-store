import "./button.styles.scss";
//abbiamo tre tipi di button che devono essere creati partendo da questo componente

//defaul 

//inverted

//google-sing in

//creiamo quindi delle classi da applicare dinamicamente
const BUTTON_TYPE_CLASSES = {
    google: "google-sign-in",
    inverted: "inverted"
}

const Button = ({children, buttonType, ...otherProps}) => {

    return(
        <button className={`button-container  ${BUTTON_TYPE_CLASSES[buttonType]}`}> {children} </button>
    )
}

export default Button;