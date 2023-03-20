import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import './Register.css';
import Spinner from '../../../components/Spinner/Spinner';
import { AuthService } from '../../../api/service/auth';

function Register() {
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    const res = await AuthService.register(data);
    if (res.response?.data) setResponse(res.response.data.detail);
    if (res.status === 200) setResponse('Đăng ký thành công');
    setLoading(false);
  });
  return (
    <div className='register-container'>
      {loading && <Spinner />}
      <form className='register-form' onSubmit={onSubmit}>
        <h1 className='register-title'>SIGN UP</h1>
        <label>First Name</label>
        <input
          className='register-input'
          {...register('first_name', {
            required: { value: true, message: 'Không được để trống' },
          })}
        />
        {errors.first_name && (
          <span className='input-error'>{errors.first_name?.message}</span>
        )}
        <label>Last Name</label>
        <input
          className='register-input'
          {...register('last_name', {
            required: { value: true, message: 'Không được để trống' },
          })}
        />
        {errors.last_name && (
          <span className='input-error'>{errors.last_name?.message}</span>
        )}
        <label>Username</label>
        <input
          className='register-input'
          {...register('username', {
            required: { value: true, message: 'Không được để trống' },
          })}
        />
        {errors.username && (
          <span className='input-error'>{errors.username?.message}</span>
        )}
        <label>Email</label>
        <input
          className='register-input'
          type='email'
          {...register('email', {
            required: { value: true, message: 'Không được để trống' },
          })}
        />
        {errors.email && (
          <span className='input-error'>{errors.email?.message}</span>
        )}
        <label>Password</label>
        <input
          className='register-input'
          type='password'
          {...register('password', {
            required: { value: true, message: 'Không được để trống' },
            minLength: { value: 8, message: 'Mật khẩu phải nhiều hơn 8 ký tự' },
          })}
        />
        {errors.password && (
          <span className='input-error'>{errors.password?.message}</span>
        )}
        <button id='register-submit' type='submit'>
          Sign up
        </button>
        {response && <span className='error'>{response.toString()}</span>}
      </form>
      <div className='register-login'>
        <span>Already has account?</span>
        <Link to='/login'>Login</Link>
      </div>
    </div>
  );
}

export default Register;
