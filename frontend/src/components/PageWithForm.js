import React from 'react';
import { Link } from 'react-router-dom';

function PageWithForm({ title, onSubmit, submitText, children, isRegister }) {

    return (
        <div className="login">
            <h2 className="login__heading">{title}</h2>
            <form className="login__form" onSubmit={onSubmit} noValidate>
                {children}
                <div className="login__button-container">
                    <button className="login__link" type="submit">{submitText}</button>
                </div>
            </form>

            {isRegister && (<div className="login__signin-container">
                <p>Уже зарегистрированы?</p>
                <Link to="/sign-in" className="login__signin">Войти</Link>
            </div>)}

        </div>
    );
}

export default PageWithForm;