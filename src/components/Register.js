import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(password, email)
  }

  function handleChange(evt) {
    const name = evt.target.name;
    const value = evt.target.value;
    name === 'email' ? setEmail(value) : setPassword(value); 
  }

  return (

      <div className='auth'>
        <h2 className='auth__title'>Регистрация</h2>
        <form className='form auth__form' onSubmit={handleSubmit} noValidate>
          <input
            id='email'
            name='email'
            placeholder='Email'
            className='auth__input'
            type='email'
            value={email || ''}
            onChange={handleChange}
            required
          >
          </input>
          <input
            id='password'
            name='password'
            placeholder='Пароль'
            className='auth__input'
            type='password'
            value={password || ''}
            onChange={handleChange}
            required
          >
          </input>
          <button className='auth__submit-button' type='submit' aria-label='Зарегистрироваться'>Зарегистрироваться</button>
        </form>
        <Link to='/sign-in' className='auth__link'> Уже зарегистрированы? Войти</Link>
      </div>

  )
}
export default Register