import { Button, CardContent, FormControl, FormHelperText, Input, InputLabel, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { handleLogin } from "../../services/authorization";
import { AppContext } from "../../context/store";
import { changeLoggedIn } from "../../redux/actions/globalActions";
import Nav from "../../components/Nav/Nav"
import style from "./Login.module.css";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import ash from "./images/brock.png";

function Login() {

    const { isLoggedIn, dispatch } = useContext(AppContext);

    const [hasErrorLogin, setHasErrorLogin] = useState(false);
    const [errorMessageLogin] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event) => {

        event.preventDefault();


        handleLogin(email, password)
            .then((response) => {
                dispatch(changeLoggedIn(true));
                toast.success("Logged successfully");
            })
            .catch((error) => {
                console.log(error);
                setHasErrorLogin(true);
                toast.error("Wrong Credentials");
            })
            
    }

    return (
        <>
        <Nav></Nav>
            {isLoggedIn && <Navigate to="/dashboard" replace={true} />}
            <div className={style.containerRegister}>
      <div className={style.containerFormulario}>
        <div className={style.containerBotonAtras}>
          <a className={style.botonAtras} href="/">
            <BsFillArrowLeftCircleFill />
          </a>
        </div>
        <h1 className={style.tituloFormulario}>Log In</h1>
                    <form className={style.formulario} onSubmit={handleSubmit}>
                    <div className={style.containerImagen}> 
                    <img alt="imagen" className={style.imagen} src={ash}></img>
                    </div>
                        <CardContent sx={{
                            minHeight: 400,
                            minWidth: 400,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "50px"
                        }}>

                                <FormControl>
                                    <InputLabel>Email Address</InputLabel>
                                    <Input name="userMail" type="email" value={email} onChange={handleChangeEmail} />
                                    <FormHelperText>We'll never share your email.</FormHelperText>
                                </FormControl>

                                <FormControl>
                                    <InputLabel>Password</InputLabel>
                                    <Input name="userPassword" type="password" value={password} onChange={handleChangePassword} />
                                    <FormHelperText>Please type your password.</FormHelperText>
                                </FormControl>
                            <Box sx={{
                                marginTop: "10px",
                                alignItems: "center",
                                justifyContent: "center",
                                display: "flex"
                            }}>
                                <Button type="submit" sx={{
                                    padding: '10px 20px'
                                }}>
                                    Log In
                                </Button>
                            </Box>
                            {hasErrorLogin &&
                                <Typography variant="contained" color="red" sx={{
                                    textTransform: "capitalize"
                                }}>
                                    {errorMessageLogin}
                                </Typography>
                            }
                        </CardContent>
                    </form>
                    </div>
                    </div>
        </>
    )
}

export default Login;