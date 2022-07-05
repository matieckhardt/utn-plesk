import { Button, FormControl, FormHelperText, Input, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/store";
import { getPokemons } from "../../../services/api";
import { changeAvatarAndImage, changeEmail, changeName, changePassword } from "./actions";
import { reducerFunction } from "./reducer";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { handleRegister } from "../../../services/authorization";
import { toast } from 'react-hot-toast';
import { changeRegisteredIn } from "../../../redux/actions/globalActions";
import perfil from "../images/profesorOakShort.png";
import Nav from "../../Nav/Nav"
import style from "./Register.module.css";

function Register() {
    
    const {dispatch} = useContext(AppContext);
    const navigate = useNavigate();
    const [hasErrorLogin, setHasErrorLogin] = useState(false);
    const [errorMessageLogin] = useState("");


    const [avatars, setAvatars] = useState([]);

    const [registerState, setRegisterState] = useReducer(reducerFunction, {
        name: "",
        email: "",
        password: "",
        avatar: "",
        image: ""
    });

    useEffect(() => {


        const fetchingData = async () => {
            try {
                const listAvatars = await fetch("/api/v1/auth/user/avatars")
                const avatars = await listAvatars.json();
                const pokes = avatars.map(({userAvatar, userImage}) => ({name: userAvatar, image: userImage}));

                const result = await getPokemons();
    
                const filteredArray = result.filter(function(objFromA) {
                    return !pokes.find(function(objFromB) {
                      return objFromA.name === objFromB.name
                    })
                  })
                
                setAvatars(filteredArray);
            }
            catch (error) {
                console.log(error);
            }
        }

        fetchingData();

    }, []);

    const { name, email, password, avatar, image } = registerState;


    const handleChangeEmail = (event) => {

        setRegisterState(changeEmail(event.target.value));
    }

    const handleChangePassword = (event) => {

        setRegisterState(changePassword(event.target.value));
    }

    const handleChangeName = (event) => {

        setRegisterState(changeName(event.target.value));

    }

    const handleChangeAvatar = (event) => {

        const newAvatar = event.target.value;
        const avatarObject = avatars.find((element) => {
            return element.name === newAvatar;
        });
        const newImage = avatarObject.image;

        setRegisterState(changeAvatarAndImage(newAvatar, newImage));

    }

          const handleSubmit = (event) => {

            event.preventDefault();
    
            handleRegister(name, email, password, avatar, image)
                .then((response) => {
                    dispatch(changeRegisteredIn(true));
                    toast.success("User created Succesfully");
                        navigate('/login');
                })
                .catch((error) => {

                    setHasErrorLogin(true);
                    toast.error("email already registered");
                })
    }
    return (
        <>
            <Nav></Nav>
            <div className={style.containerRegister}>
      <div className={style.containerFormulario}>
        <div className={style.containerBotonAtras}>
          <a className={style.botonAtras} href="/">
            <BsFillArrowLeftCircleFill />
          </a>

        </div>
        <h1 className={style.tituloFormulario}>Sign Up</h1>
                    <form className={style.formulario} onSubmit={handleSubmit}>
                    <div className={style.containerImagen}>
            <img alt="imagen" className={style.imagen} src={perfil}></img>
          </div>
                            <FormControl sx={{ width: "50%" }}>
                                <InputLabel>User Name</InputLabel>
                                <Input name="userName" type="text" value={name} onChange={handleChangeName} />
                                <FormHelperText>Please type your user name.</FormHelperText>
                            </FormControl>
                            <FormControl sx={{ width: "50%" }}>
                                <InputLabel>Email Address</InputLabel>
                                <Input name="userMail" type="email" value={email} onChange={handleChangeEmail} />
                                <FormHelperText>We'll never share your email.</FormHelperText>
                            </FormControl>
                            <FormControl sx={{ width: "50%" }}>
                                <InputLabel>Password</InputLabel>
                                <Input name="userPassword" type="password" value={password} onChange={handleChangePassword} />
                                <FormHelperText>Please type your password.</FormHelperText>
                            </FormControl>
                            <br />
                            <FormControl sx={{ width: "50%" }}>
                                <InputLabel  id="avatar">User Avatar</InputLabel>
                                <Select
                                    className={style.select}
                                    name="userAvatar"
                                    labelId="avatar"
                                    value={avatar}
                                    label="User Avatar"
                                    onChange={handleChangeAvatar}
                                >
                                    {avatars.map(element => {
                                        return (
                                            <MenuItem sx={{ textTransform: 'capitalize' }} value={element.name}>
                                                <Typography component="span">{element.name}</Typography>
                                                <img  src={element.image} alt={element.name} width={50} height={50} />
                                                <Input name="userImage" value={element.image} type="hidden" ></Input>
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                                <FormHelperText>Please select your avatar.</FormHelperText>
                            </FormControl>
                            <FormControl sx={{
                                marginTop: "10px",
                                alignItems: "center",
                                justifyContent: "center",
                                display: "flex"
                            }}>
                                <Button type="submit" sx={{
                                    padding: '10px 20px'
                                }}>
                                    Register
                                </Button>       
                                 {hasErrorLogin &&
                                <Typography variant="contained" color="red" sx={{
                                    textTransform: "capitalize"
                                }}>
                                    {errorMessageLogin}
                                </Typography>
                            }
                            </FormControl>
                    </form>
                    </div>
    </div>
        </>
    )
}

export default Register;