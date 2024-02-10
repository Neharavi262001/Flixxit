import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate,Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useUpdateProfileMutation } from '../../redux/user/userApiSlice'
import { setCredentials } from '../../redux/auth/authSlice'
import './profileForm.css'

const ProfileForm = () => {
  const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate=useNavigate()
    const dispatch =useDispatch()

    const {userInfo}=useSelector((state)=>state.auth)
   const [updateProfile,{isLoading}]=useUpdateProfileMutation()
    
    useEffect(()=>{
       setName(userInfo.name);
       setEmail(userInfo.email)
    },[userInfo.setName,userInfo.setEmail])

    
    const handleSubmit=async(e)=>{
        e.preventDefault()

        if (name === userInfo.name && email === userInfo.email && !newPassword) {
          toast.warning('No changes made.');
          return;
        }
        
        if (newPassword && newPassword !== confirmPassword){
            toast.error('Passwords donot match.Retype password')
        }else{
          try {
            const response =await updateProfile({
              _id:userInfo._id,
              name,
              email,
              password,
              newPassword,
            }).unwrap()
            dispatch(setCredentials({...response}))
            toast.success('Profile updated successfully')
          } catch (err) {
            if (err.data?.errors && err.data?.errors?.password) {
              toast.error(err.data.errors.password.message);
            } else {
              toast.error(err.data?.message || err.error || 'Current password mismatch or new password not strong enough. Verify and try again');
            }
          }
        }
    }   
  return (
    <div className='profile-form'>
     <h1>Update user details</h1>
     
        <div className="login-container">
            
            <div className="form">
                
    
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
                    name="newPassword" 
                    value={newPassword}
                    id="newPassword" 
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder='Enter new Password' />
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
          {isLoading&& <h3>Loading..... please wait</h3>}
           <div className="form-group">
            <button className="btn-block">Update</button>
           </div>
        </form>
    </div>
    
    </div>
  
    </div>
  )
}

export default ProfileForm
