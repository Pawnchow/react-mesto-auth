import useForm from '../hooks/useForm';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  const { values, handleChange } = useForm({});

  function handleSubmit(evt) {
    evt.preventDefault();
    evt.preventDefault();
    if (!values.email || !values.password) {
      return
    }
    onRegister(values)
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
            value={values.email || ''}
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
            value={values.password || ''}
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