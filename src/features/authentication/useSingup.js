import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signupApi} from "../../services/apiAuth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export function useSigup(){
    const queryClient=useQueryClient();
    const navigate = useNavigate();
    const  {mutate:signup , isLoading} =
    useMutation({
        mutationFn:({email,password})=>signupApi({
            email,password ,
        }),
        onSuccess:(user)=>{
            queryClient.setQueryData(['user'], user.user)
            toast.success("Account successfully created! Please verufy the new account from the user's email address.")
           navigate("/login" , {replace:true})
        }
    });
    return {signup ,  isLoading};
}