import { useState } from 'react';
function Login(props) {
  // susikurti state email ir pass
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [error, setError] = useState('');
  //susieti su two way binding inputus su state ir atvaizduoti html ivestas reiksmes
  function emailHandler(event) {
    const enteredEmailValue = event.target.value.trim();
    setEmailValue(enteredEmailValue);
  }
  function passHandler(event) {
    const enteredPassValue = event.target.value.trim();
    setPasswordValue(enteredPassValue);
  }
  function loginHandler(event) {
    event.preventDefault();
    console.log('event ===', event.target[0].value);
    console.log('emailValue ===', emailValue);
    if (emailValue === '' || passwordValue === '') {
      console.warn('labai blogai nes kazkas neivesta');
      setError('Prasome uzpildyti visus laukus');
      return;
    } else setError('');
    console.log('viskas ok siunciam forma >>>>>');
    sendLoginReq({ email: emailValue, password: passwordValue });
  }
  function sendLoginReq(loginObj) {
    const url = 'https://reqres.in/api/login';
    fetch(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(loginObj),
    })
      .then((resp) => resp.json())
      .then((dataInJs) => {
        console.log('dataInJs ===', dataInJs);
        // jei klaida tai setinam klaida
        // jei sekme tai consolinam sekme
        // jei sekme paslepti forma ir parodyti sveikinimo kortele
      })
      .catch((err) => console.warn('login error', err));
  }

  const showError = error !== '';

  return (
    <div>
      <form onSubmit={loginHandler} className='card'>
        {showError && <h3 className='errorAlert'>{error}</h3>}

        <input
          onChange={emailHandler}
          type='text'
          placeholder='Email'
          value={emailValue}
        />
        <input
          onChange={passHandler}
          type='password'
          placeholder='Password'
          value={passwordValue}
        />
        <button type='submit'>Login</button>
      </form>
      <div className='card'>
        <h3>Email: {emailValue}</h3>
        <h3>Pasword: {passwordValue}</h3>
      </div>
    </div>
  );
}
export default Login;
