import React from 'react';
import { useState } from 'react';
import PageWithForm from './PageWithForm';

function Register({ onRegister, isLoading }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleEmailInput(evt) {
        setEmail(evt.target.value);
    }

    function handlePasswordInput(evt) {
        setPassword(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        onRegister(password, email);
        setEmail('');
        setPassword('');
    }

    return (
        <PageWithForm
            title='Регистрация'
            onSubmit={handleSubmit}
            submitText={isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
            isRegister={true}
        >
            <fieldset className="login__input-container">
                <input
                    name="email"
                    id="email-input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailInput}
                    required />
                <input
                    name="password"
                    id="password-input"
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={handlePasswordInput}
                    required />
            </fieldset>

        </PageWithForm>
    )
}

export default Register;