import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import Spinner from '../../../components/Spinner/Spinner';
import { AuthService } from '../../../api/service/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../store/userSlice';

function Login() {
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(true);
  const [response, setResponse] = useState();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem('user')) || {
    username: '',
    password: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const rememberAccount = (user) => {
    if (remember) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    rememberAccount(data);
    setLoading(true);
    const res = await AuthService.login(data);

    if (res.status === 200) {
      const { name, username, access } = res.data;
      dispatch(setUser({ name, username }));
      localStorage.setItem('token', JSON.stringify({ token: access }));
      setLoading(false);
      navigate('/');
    }
    if (res.response?.data) {
      setResponse(res.response.data.detail);
      setLoading(false);
    }
  });

  return (
    <div className='login-container'>
      <form className='login-form' onSubmit={onSubmit}>
        <h1 className='login-title'>SIGN IN</h1>
        <label>Email</label>
        <input
          className='login-input'
          type='text'
          defaultValue={user.username ? user.username : ''}
          {...register('username', {
            required: { value: true, message: 'Không được để trống' },
          })}
        />
        {errors.username && (
          <span className='input-error'>{errors.username?.message}</span>
        )}
        <label>Password</label>
        <input
          className='login-input'
          type='password'
          defaultValue={user.password ? user.password : ''}
          {...register('password', {
            required: { value: true, message: 'Không được để trống' },
            minLength: { value: 5, message: 'Mật khẩu phải nhiều hơn 5 ký tự' },
            pattern: {
              value: /^[\S]{5,}$/g,
              message: 'Mật khẩu không hợp lệ',
            },
          })}
        />
        {errors.password && (
          <span className='input-error'>{errors.password?.message}</span>
        )}
        <div className='login-option'>
          <div className='remember-account'>
            <input
              type='checkbox'
              name='remember'
              checked={remember}
              onChange={() => setRemember(!remember)}
            />
            <span>Remember me</span>
          </div>
          <Link to='/forgot-password'>Forgot password?</Link>
        </div>
        <button id='login-submit' type='submit'>
          Sign in
        </button>
        {response && <span className='error'>{response.toString()}</span>}
      </form>
      <div className='login-register'>
        <span>{"Don't have an account?"}</span>
        <Link to='/register'>Register</Link>
      </div>
      {loading && <Spinner />}
    </div>
  );
}

export default Login;
