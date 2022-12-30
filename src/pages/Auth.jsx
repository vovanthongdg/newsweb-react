/* eslint-disable no-undef */

import React,{ useState, useEffect } from 'react'
import logo from '../assets/img/logo.png'
import styled from 'styled-components'
import '../App.css'
import { useDispatch, useSelector } from 'react-redux'

// import { logIn } from '../actions/authAction'
import { signUp } from '../store/slice/authSlice'

const Auth = () => {

    const dispatch = useDispatch()
    const loading = useSelector((state) => state.loading)
    // const loading = false
    const [isSignUp, setIsSignUp] =  useState(false)
    const [data, setData] =  useState({
        name: "", 
        email: "",
        username : "", 
        password: "",
        confirmPassword: "" 
    })



    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if(isSignUp) {
            if(data.password === data.confirmPassword ){
                dispatch(signUp(data))
            }              
        } else {
            // dispatch(logIn(data))
        }
    }

    const resetForm = () => {
        setData({
            name: "", 
            email: "",
            username : "", 
            password: "",
            confirmPassword: "" 
        })
    }

    const [faceioInstance,setfaceioInstance] = useState(null)

    // let faceioInstance = null
    useEffect(() => {
        const script = document.createElement('script')
        script.src = '//cdn.faceio.net/fio.js'
        script.async = true
        script.onload = () => loaded()
        document.body.appendChild(script)
        return () => {
            document.body.removeChild(script)
        }
        }, [])
        
      const loaded = () => {
        console.log(faceIO)
        if (faceIO && !faceioInstance) {
            const faceio = new faceIO('fioa1b98')
            setfaceioInstance(faceio)
        }
       }

    const faceRegistration = async () => {
      try {
        const userInfo = await faceioInstance.enroll({
          locale: "auto",
          payload: {
            email: "laviethung280699@gmail.com",
            userId: 28061999,
            username: "laviethung99",
          },
        })
        console.log(userInfo)
        console.log('Unique Facial ID: ', userInfo.facialId)
        console.log('Enrollment Date: ', userInfo.timestamp)
        console.log('Gender: ', userInfo.details.gender)
        console.log('Age Approximation: ', userInfo.details.age)
      } catch (errorCode) {
        console.log(errorCode)
        handleError(errorCode)
      }
    }

    const faceSignIn = async () => {
      try {
        console.log(faceioInstance)
        const userData = await faceioInstance.authenticate({
          locale: "auto",
        })
        console.log(userData)
    
        console.log('Unique Facial ID: ', userData.facialId)
        console.log('PayLoad: ', userData.payload)
      } catch (errorCode) {
        console.log(errorCode)
        handleError(errorCode)
      }
    }

    const handleError = (errCode) => {
      // Log all possible error codes during user interaction..
      // Refer to: https://faceio.net/integration-guide#error-codes
      // for a detailed overview when these errors are triggered.
      // const fioErrCode={PERMISSION_REFUSED:1,NO_FACES_DETECTED:2,UNRECOGNIZED_FACE:3,MANY_FACES:4,PAD_ATTACK:5,FACE_MISMATCH:6,NETWORK_IO:7,WRONG_PIN_CODE:8,PROCESSING_ERR:9,UNAUTHORIZED:10,TERMS_NOT_ACCEPTED:11,UI_NOT_READY:12,SESSION_EXPIRED:13,TIMEOUT:14,TOO_MANY_REQUESTS:15,EMPTY_ORIGIN:16,FORBIDDDEN_ORIGIN:17,FORBIDDDEN_COUNTRY:18,UNIQUE_PIN_REQUIRED:19,SESSION_IN_PROGRESS:20},fioState={UI_READY:1,PERM_WAIT:2,PERM_REFUSED:3,PERM_GRANTED:4,REPLY_WAIT:5,PERM_PIN_WAIT:6,AUTH_FAILURE:7,AUTH_SUCCESS:8}
      switch (errCode) {
        case fioErrCode.PERMISSION_REFUSED:
          console.log("Access to the Camera stream was denied by the end user")
          break
        case fioErrCode.NO_FACES_DETECTED:
          console.log("No faces were detected during the enroll or authentication process")
          break
        case fioErrCode.UNRECOGNIZED_FACE:
          console.log("Unrecognized face on this application's Facial Index")
          break
        case fioErrCode.MANY_FACES:
          console.log("Two or more faces were detected during the scan process")
          break
        case fioErrCode.PAD_ATTACK:
          console.log("Presentation (Spoof) Attack (PAD) detected during the scan process")
          break
        case fioErrCode.FACE_MISMATCH:
          console.log("Calculated Facial Vectors of the user being enrolled do not matches")
          break
        case fioErrCode.WRONG_PIN_CODE:
          console.log("Wrong PIN code supplied by the user being authenticated")
          break
        case fioErrCode.PROCESSING_ERR:
          console.log("Server side error")
          break
        case fioErrCode.UNAUTHORIZED:
          console.log("Your application is not allowed to perform the requested operation (eg. Invalid ID, Blocked, Paused, etc.). Refer to the FACEIO Console for additional information")
          break
        case fioErrCode.TERMS_NOT_ACCEPTED:
          console.log("Terms & Conditions set out by FACEIO/host application rejected by the end user")
          break
        case fioErrCode.UI_NOT_READY:
          console.log("The FACEIO Widget code could not be (or is being) injected onto the client DOM")
          break
        case fioErrCode.SESSION_EXPIRED:
          console.log("Client session expired. The first promise was already fulfilled but the host application failed to act accordingly")
          break
        case fioErrCode.TIMEOUT:
          console.log("Ongoing operation timed out (eg, Camera access permission, ToS accept delay, Face not yet detected, Server Reply, etc.)")
          break
        case fioErrCode.TOO_MANY_REQUESTS:
          console.log("Widget instantiation requests exceeded for freemium applications. Does not apply for upgraded applications")
          break
        case fioErrCode.EMPTY_ORIGIN:
          console.log("Origin or Referer HTTP request header is empty or missing")
          break
        case fioErrCode.FORBIDDDEN_ORIGIN:
          console.log("Domain origin is forbidden from instantiating fio.js")
          break
        case fioErrCode.FORBIDDDEN_COUNTRY:
          console.log("Country ISO-3166-1 Code is forbidden from instantiating fio.js")
          break
        case fioErrCode.SESSION_IN_PROGRESS:
          console.log("Another authentication or enrollment session is in progress")
          break
        case fioErrCode.NETWORK_IO:
        default:
          console.log("Error while establishing network connection with the target FACEIO processing node")
          break
      }
    }
    

  return (
    <Container>
        <div className="auth-left">
            <img src={logo} alt='Logo'/>
            <div className="appName">
                <h1 style={{color: "var(--main)"}}>Fast News</h1>
                <h6 style={{color: "var(--gray)"}}>Explore the ideas throught out the word!</h6>
            </div>
        </div>
        <div className="appRight">
            <form action='' className='infoForm' type='submit' onSubmit={handleSubmit}>
                <h3>{ isSignUp ? "Sign Up" : "Log In"}</h3>
                {isSignUp && 
                    <div>
                        <input type="text" className="infoInput" placeholder='Name' name='name' onChange={handleChange} value={data.firstname}/>
                        <input type="text" className="infoInput" placeholder='Email' name='email' onChange={handleChange} value={data.lastname}/>
                    </div>
                }
                <div>
                    <input type="text" className="infoInput" placeholder='User Name' name='username' onChange={handleChange} value={data.username}/>
                </div>
                <div>
                    <input type="password" className="infoInput" placeholder='Password' name='password' onChange={handleChange} value={data.password}/>
                    { isSignUp && 
                        <input type="password" className="infoInput" placeholder='Confirm Password' name='confirmPassword' onChange={handleChange} value={data.confirmPassword}/>
                    }
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}} >
                    <span className='faceid' style={{fontSize: 14, cursor: "pointer"}} onClick={() => {setIsSignUp((prev)=>!prev);resetForm()}}>
                        {isSignUp ? "Already have an account?  Login" : "Don't have an account?  SignUp"}
                    </span>
                    <span className='faceid' style={{fontSize: 14, cursor: "pointer"}} onClick={() => faceSignIn()}>
                        {isSignUp ? "" : "Login with FaceID"}
                    </span>
                </div>
                <button disabled={loading}>{loading ? "Loading..." : isSignUp ? "Sign Up" : "Log In"}</button>
            </form>
        </div>
    </Container>
  )
}


const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    gap: 4rem;
    position: relative;
    .appRight {
        background: white;
        border-radius: 1rem;
        padding: 1rem;
    }
    .auth-left {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        img {
            width: rem;
            height: 12rem;
        }
        .appName {
            h1{
                font-size: 3rem;
                background-color: var(--main-color);
                background-image: var(--buttonBg);
                background-size: 100%;
                background-repeat: repeat;
                -webkit-background-clip: text;
                /* -webkit-text-fill-color: transparent; */
                -moz-background-clip: text;
                -moz-text-fill-color: transparent;
            }
            h6 {
                font-size: 0.85rem;
            }
        }
    }
    .infoForm {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2.4rem;
        h3 {
            color: var(--main);
            background-color: pink;
            background-image: var(--main);
            background-size: 100%;
            background-repeat: repeat;
            -webkit-background-clip: text;
            /* -webkit-text-fill-color: transparent; */
            -moz-background-clip: text;
            -moz-text-fill-color: transparent;
        }
        .infoInput {
            border: none;
            outline: none;
            background-color: var(--inputColor);
            border-radius: 8px;
            padding: 20px;
            flex: 1;
            width: 100%;
        }

        .faceid:hover {
            color: var(--main);
        }

        button {
            display: flex;
            align-items: center;
            justify-content: center;
            align-self: flex-end;
            color: white;
            border: none;
            border-radius: 0.5rem;
            background: var(--main);
            transition: all 100ms ease-out;
            height: 2rem;
            width: 6rem;
        }

        button:hover {
            cursor: pointer;
            /* border: 1px solid var(--orange); */
            color: var(--orange);
            background: rgba(244, 175, 123, 0.6);
        }

        button:disabled {
            background-color: silver;
            pointer-events: none;
        }
    }
    .infoForm > div {
        display: flex;
        gap: 1rem;
        height: 2rem;
        width: 100%;
        align-items: center;
        justify-content: center;
    }
`

export default Auth