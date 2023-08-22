import {useState} from "react";
import {signupFields} from "../constants/formFields";
import Input from "./Input";
import FormAction from "./FormAction";

const fields = signupFields;
let fieldsState = {}

fields.forEach(field => fieldsState[field.id] = '');

export default function Signup() {
    const [signupState, setSignupState] = useState(fieldsState);
    const [errorMessages, setErrorMessages] = useState({});

    const handleChange = (e) => setSignupState({...signupState, [e.target.id]: e.target.value});

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log(signupState)
            // createAccount()
        }
    };

    //FORM VALIDATION
    function validateForm() {

        const errors = {};
        //check username

        if (signupState.username === '') {
            errors.username = 'Username is required';
        }


        //check email

        if (signupState.email === '') {
            errors.email = 'Email is required';
        }

        //check password

        if (signupState.password.length < 8) {
          errors.password = 'Password must contain atleast 8 characters';
        }
        //count uppercase
        let countUpperCase = 0
        //count lowercase
        let countLowerCase = 0
        //count digits
        let countDigits = 0
        //count special character
        let countSpecialCharacters = 0

        for (let i = 0; i < signupState.password.length; i++) {
            const specialCharacters = [
                '!',
                '@',
                '#',
                '$',
                '%',
                '^',
                '&',
                '*',
                '(',
                ')',
                '_',
                '-',
                '+',
                '=',
                '[',
                '{',
                ']',
                '}',
                ':',
                ';',
                '<',
                '>',
            ]

            if (specialCharacters.includes(signupState.password[i])) {
                countSpecialCharacters++
            } else if (!isNaN(signupState.password[i] * 1)) {
                countDigits++
            } else {
                if (signupState.password[i] == signupState.password[i].toUpperCase()) {
                    countUpperCase++
                }
                if (signupState.password[i] === signupState.password[i].toLowerCase()) {
                    countLowerCase++
                }
            }
        }
        if (countLowerCase === 0) {
           errors.passwordLowerCase = 'Password must contain at least one lowercase letter';
        }
        if (countUpperCase === 0) {
           errors.passwordUpperCase = 'Password must contain at least one uppercase letter';
        }
        if (countDigits === 0) {
            errors.passwordDigits = 'Password must contain at least one number'
        }


        setErrorMessages(errors);

        return Object.keys(errors).length === 0
;
    }

    return (
        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
            <div className=''>
                {
                    fields.map(field => (
                        <div key={field.id}>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                        />
                            {errorMessages[field.id] && <p className="text-red-500">{errorMessages[field.id]}</p>}

                        </div>
                    ))
                }
                <FormAction handleSubmit={handleSubmit} text='Signup'/>
            </div>
        </form>
    )
}