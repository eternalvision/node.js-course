import { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./style.scss";

export const App = () => {
    const form = useRef();

    const sendEmail = (event) => {
        event.preventDefault();

        const SendMailFunc = async () => {
            try {
                await emailjs.sendForm("", "", form.current, {
                    publicKey: "",
                });
                console.log("Success!");
            } catch (error) {
                console.error(error);
            }
        };

        SendMailFunc();
    };

    return (
        <form ref={form} onSubmit={sendEmail}>
            <label>
                Name
                <input type="text" placeholder="Name" name="Name" />
            </label>
            <label>
                Phone Number
                <input
                    type="text"
                    placeholder="Phone number"
                    name="phoneNumber"
                />
            </label>
            <label>
                Comment
                <input type="text" placeholder="Comment" name="Comment" />
            </label>
            <label>
                Email to send
                <input
                    type="text"
                    placeholder="Email to send"
                    name="userEmail"
                />
            </label>

            <input className="Send" type="submit" value="Send" />
        </form>
    );
};
