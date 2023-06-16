import { useNavigate } from "react-router";
import Swal2 from "sweetalert2";
import { useCookies } from "react-cookie";
import axios from "axios";

const GoogleLogin = () => {
    let navigate = useNavigate();

    const [cookies, setCookie] = useCookies(['token']);
    setCookie('token', cookies);

    axios.post('/auth-user-oauth', {headers: {cookie: cookies}})
    .then((res) => {

        console.log(res.data.role);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("role", res.data.role);

    }).then(()=>{
        return Swal2.fire({
            icon : "success",
            title : "Logged in Successfully."
        })
    })
    .then((res) =>{
        navigate('/');
    })
    .catch((err)=>{
        console.log(err);
    })
    
    return null;
}

export default GoogleLogin;