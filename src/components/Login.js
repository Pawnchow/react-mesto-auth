import useForm from '../hooks/useForm';
function Login ({ onLogin }) {
  const { values, handleChange } = useForm({});

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!values.email || !values.password) {
      return
    }
    onLogin(values)
  }

  return (
    <div className='auth'>
    <h2 className='auth__title'>Вход</h2>
    <form className='form auth__form' onSubmit={handleSubmit}>
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
      <button className='auth__submit-button' type='submit' aria-label='Войти'>Войти</button>
    </form>
  </div>
  )
}

export default Login