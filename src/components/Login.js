import { useState } from 'react';

function Login ({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(password, email)
  }
  
  function handleChange(evt) {
    const name = evt.target.name;
    const value = evt.target.value;
    name === 'email' ? setEmail(value) : setPassword(value); 
  }

  return (
    <div className='auth'>
    <h2 className='auth__title'>Вход</h2>
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
      <button className='auth__submit-button' type='submit' aria-label='Войти'>Войти</button>
    </form>
  </div>
  )
}

export default Login