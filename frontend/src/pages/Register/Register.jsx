import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate,Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import './register.css'
import navLogo from '../../images/flixxit_logo.png'
import { useRegisterMutation } from '../../redux/user/userApiSlice'
import { setCredentials } from '../../redux/auth/authSlice'
const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate=useNavigate()
    const dispatch =useDispatch()

    const {userInfo}=useSelector((state)=>state.auth)
    const [register,{isLoading,error}]=useRegisterMutation()
    
    useEffect(()=>{
        if (userInfo){
            navigate('/subscribe')
        }
    },[navigate,userInfo])

    
    const handleSubmit=async(e)=>{
        e.preventDefault()
        if (password !== confirmPassword){
            toast.error('Passwords donot match')
        }else{
            try {
                const response=await register({ name, email, password }).unwrap()
                dispatch(setCredentials({...response}))
                navigate('/subscribe')
            } catch (err) {
                if (err.data?.errors && err.data?.errors?.password) {
                    toast.error(err.data.errors.password.message);
                  } else {
                    toast.error(err.data?.message || err.error);
                  }
            }
        }
    }   
  return (
    <div className='register'>
        <div className="nav-top">
            <img src={ navLogo || "https://app.gemoo.com/share/image-annotation/604743199318691840?codeId=vzxlEYOROQBX9&origin=imageurlgenerator&card=604743196353318912"} alt="logo" width='110px' height='35px' />
            <button className='signin-btn btn-block'><Link to='/login'>Sign in</Link></button>
        </div>
        <div className="login-container">
            <div className="heading">
                <h1>Unlimited movies, TV shows and more.</h1>
                <h2>Watch anywhere. Cancel anytime.</h2>
            </div>
            <div className="form">
                 <div className="form-group">
                    <p>Register to create new account</p>
                </div>
    
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input 
                                 type="text" 
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder='Enter your userName' />
            </div>
            <div className="form-group">
                <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter your email address' />
            </div>
            <div className="form-group">
                <input 
                    type="password" 
                    name="password" 
                    value={password}
                    id="password" 
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter your password' />
            </div>
            <div className="form-group">
                <input 
                    type="password" 
                    name="confirmPassword" 
                    value={confirmPassword}
                    id="confirmPassword" 
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder='Confirm password' />
            </div>
            {isLoading && <h3>Loading....Please wait !</h3>}
            <div className="form-group">
                <p> Already has an account ? <Link to='/login'>Sign in</Link> </p>
                <button className="btn-block">Register</button>
            </div>
        </form>
    </div>
        
    </div>
  
</div>
  )
}

export default Register
