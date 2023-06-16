import axios from "axios";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import Swal2 from "sweetalert2";

export default function Logout(){
    let navigate = useNavigate();

    let [cookies, setCookie] = useCookies(['token']);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("role");

    setCookie('token', cookies);

    axios.get("/logout", {headers: {cookie: cookies}})
    .then((res)=>{
        Swal2.fire({
            icon : "success",
            title : res.data
        })
        .then(()=>{
            navigate('/login');
        })
    })
    .catch((err)=>{
        if(err.response.status == 404){
            Swal2.fire({
                icon: "error",
                title: "You are not looged in."
            })
        }else{
            Swal2.fire({
                icon : "error",
                title : err
            })
        }
        navigate('/login');
    })

    return (
        <a href="http://localhost:3006/login"/>
    );
};

