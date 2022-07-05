import React from "react"
import Nav from "../Nav/Nav"
import style from "./dashboard.module.css"

const Dashboard =  () => {

const [user, setUser] = React.useState([])

React.useEffect(() => { 
    getUserData()

}, [])



const getUserData = async function(res, req){

    const token = JSON.stringify(localStorage.token);
    const response = await fetch("http://localhost:4000/api/v1/auth/user/profile?token=" + token);
    const objeto = await response.json();
        setUser(objeto);

     }
return (
    <div>
        <Nav></Nav>
        <div className={style.containerDashboard}>
        <h1 className={style.title}>Welcome to your Dashboard </h1><br />
        <div className={style.data}><img className={style.image} src={user.userImage} alt=""></img>
        <h3 className={style.data}> {user.userAvatar}</h3><br />
        </div>
        <br></br>
<h3 className={style.data}> This is your Username: {user.userName}</h3><br />
<h3 className={style.data}>This is the email you registered: {user.userMail}</h3><br />


</div>
    </div>
)

}
export default Dashboard