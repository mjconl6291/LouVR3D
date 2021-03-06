import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom"
import API from "../../utils/API";
import M from "materialize-css"
import UserContext from "../../content/UserContext";
import pyramid from "../../components/images/pyramid.jpg"
import Sidenav from "../../components/SideNav/sidenav"
import $ from "jquery"


const Signup = () => {
  const [users, setUsers] = useState([])
  const [formObject, setFormObject] = useState({
    username: "",
    email: "",
    password: "",
    error: ""
  })
  const { userData, setUserData } = useContext(UserContext);
  useEffect(() => {
    API.getUsers()
      .then(res => {
        setUsers(res.data)
      }
      ).catch(err => console.log(err))
  }, [])

  const history = useHistory()

  const handleInputChange = event => {
    const { name, value } = event.target
    setFormObject({ ...formObject, [name]: value })
   
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    // var ele = document.getElementsByTagName('input');
    // console.log(ele.checked)
    let imagelink = $('input[name="avatarCheck"]:checked').val();
    console.log(imagelink)
    if (formObject.username && formObject.email && formObject.password) {
      API.saveUser({
        username: formObject.username,
        email: formObject.email,
        password: formObject.password,
        avatar: imagelink
      }).then((res) => {
        // console.log(res)
        // console.log(imagelink)
        if (res.status === 200) {
          M.toast({ html: 'Success!' })
          API.loginUser({
            username: formObject.username,
            password: formObject.password
          }).then((res) => {
            console.log(res.data.token)
            setUserData({
              token: res.data.token,
              user: res.data.user
            })
            localStorage.setItem("auth-token", res.data.token)
            history.push("/profile")
          })
        console.log(res)
        }
      }).catch((res) => {
        console.log(res)
        return M.toast({ html: 'This email or username already belongs to a memeber!' })
      })
    }
  }
  
  const handleLogout = () => {
    setUserData({
      token: undefined,
      user: undefined
    })
    localStorage.setItem("auth-token", "")
    //   window.location.replace("/signup");
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
              {/* <h2>Welcome{}</h2> */}
              {/* <img id="pyramid" alt="" src={pyramid}/> */}
              <br />
              {/* <h2>Welcome to Le LouVr3D</h2> */}
              {userData.user ? (
                 <div >
                 <Sidenav
                userData={userData}
                />
   <div className="col s12">
               <div className="col m1">
              <img
     alt=""
     src={pyramid}
   className="pyramid"
   />
     </div>
     <div className="col m11">
       
       {/* <h2 className="exhibitheader">Discover LouVr3D</h2> */}
       {/* <h2 className="white-text">Login to Le LouVr3D</h2> */}
   <h2 className="white-text">{userData.user.username}, you are already logged in.</h2>
   </div>
   </div>
       <button type="submit" className="btn btn-default" href="/login"
         onClick={handleLogout}>Logout</button>
         </div>
              ) : (
                  <>
                    <h2 className="white-text">Sign Up Form</h2>
                    <form className="signup">
                      <div className="form-group">
                        <input
                          // type="username"  
                          className="form-control white-text"
                          id="username-input"
                          placeholder="Username (required)"
                          onChange={handleInputChange}
                          name="username" />
                      </div>

                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control white-text"
                          id="email-input"
                          placeholder="Email (required)"
                          onChange={handleInputChange}
                          name="email" />
                      </div>

                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control white-text"
                          id="password-input"
                          placeholder="Password (required)"
                          onChange={handleInputChange}
                          name="password" />
                      </div>
                      {/* <h5 className="white-text">Select A Patronage Avatar</h5>
                      <p className="white-text">Be sure to hit save to submit the change</p>
                      <div className="  col s12 center">

                        <p className="col s6 m3">
                          <img className=" circle profile-avatar" style={{width: "100px"}} alt="avatar1" src="https://api.adorable.io/avatars/face/eyes1" />
                          <label>
                            <input type="radio" name="avatarCheck" value="https://api.adorable.io/avatars/face/eyes1" />
                            <span  className="white-text">Gogh</span>
                          </label>
                        </p>
                        <p className="col s6 m3">
                          <img className=" circle profile-avatar" style={{width: "100px"}} alt="avatar2" src="https://api.adorable.io/avatars/face/eyes2" />
                          <label className="white-text">
                            <input type="radio" name="avatarCheck" value="https://api.adorable.io/avatars/face/eyes2" />
                            <span>Bourgeois</span>
                          </label>
                        </p>
                        <p className="col s6 m3">
                          <img className=" circle profile-avatar" style={{width: "100px"}} alt="avatar3" src="https://api.adorable.io/avatars/face/eyes3" />
                          <label className="white-text">
                            <input type="radio" name="avatarCheck" value="https://api.adorable.io/avatars/face/eyes3" />
                            <span lassName="white-text">Vinci</span>
                          </label>
                        </p>
                        <p className="col s6 m3">
                          <img className=" circle profile-avatar" style={{width: "100px"}} alt="avatar4" src="https://api.adorable.io/avatars/face/eyes4" />
                          <label className="white-text">
                            <input type="radio" name="avatarCheck" value="https://api.adorable.io/avatars/face/eyes4" />
                            <span lassName="white-text">Basquiat</span>
                          </label>
                        </p>

                        <p className="col s6 m3">
                          <img className=" circle profile-avatar" style={{width: "100px"}} alt="avatar5" src="https://api.adorable.io/avatars/face/eyes5" />
                         <label className="white-text">
                            <input type="radio" name="avatarCheck" value="https://api.adorable.io/avatars/face/eyes" />
                            <span>Monet</span>
                          </label>
                        </p>
                        <p className="col s6 m3">
                          <img className=" circle profile-avatar" style={{width: "100px"}} alt="avatar6" src="https://api.adorable.io/avatars/face/eyes6" />
                         <label className="white-text">
                            <input type="radio" name="avatarCheck" value="https://api.adorable.io/avatars/face/eyes6" />
                            <span>Jules</span>
                          </label>
                        </p>
                        <p className="col s6 m3">
                          <img className=" circle profile-avatar" style={{width: "100px"}} alt="avatar7" src="https://api.adorable.io/avatars/face/eyes7" />
                         <label className="white-text">
                            <input type="radio" name="avatarCheck" value="https://api.adorable.io/avatars/face/eyes7" />
                            <span>Michel</span>
                          </label>
                        </p>
                        <p className="col s6 m3">
                          <img className=" circle profile-avatar" style={{width: "100px"}} alt="avatar8" src="https://api.adorable.io/avatars/face/eyes8" />
                         <label className="white-text">
                            <input type="radio" name="avatarCheck" value="https://api.adorable.io/avatars/face/eyes8" />
                            <span>Frida</span>
                          </label>
                        </p>
                      </div> */}
                      
                      <button type="submit" className="btn btn-default"
                        disabled={!(formObject.username || formObject.email || formObject.password)}
                        onClick={handleFormSubmit}
                      >Sign Up</button>
                    </form>
                    <br />
                    {/* <Modal/> */}
                    <p className="white-text" >Or log in <a  href="/login">here</a></p>
                  </>
                )}
            </div>
          </div>
        </div>
      </div>



  )
}

export default Signup;