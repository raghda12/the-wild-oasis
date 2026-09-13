import styled from "styled-components";
import { useUser } from "../features/authentication/userUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router";
import { useEffect } from "react";
const FullPage = styled.div`
height:100vh;
background-color:var(--color-grey-50);
display:flex;
align-items:center;
justify-content:center;
`
function ProtectedRoute({children}){
    const navigate = useNavigate();
    //1.Load the  authenticated user
    const {user , isLoading  , isAuthenticated} =  useUser();

    //2.If There  is No authenticated user, redirect to the/ login
    useEffect(function(){
        if(!isAuthenticated  && !isLoading) navigate("/login")
    },[isAuthenticated,isLoading,navigate])

        //3.While loading , show a spinner
    if(isLoading)return <FullPage><Spinner/></FullPage>
    //4.If there Is a user, render the app
   if (isAuthenticated) return children;
}
export default ProtectedRoute