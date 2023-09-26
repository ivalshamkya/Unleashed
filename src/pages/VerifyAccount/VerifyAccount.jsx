import { Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { verification } from "../../store/slices/auth/slices";

export default function VerifyAccount() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isVerified, email } = useSelector(state => {
        return {
            email : state.auth.email,
            isVerified : state.auth.isVerified
        }
    });

    const { token } = useParams();

    const VerifyAction = () => {
        dispatch(verification(token))
    }
  
    if ( isVerified ) {
    return <Navigate to="/profile" replace/>
    }

  return (
    <div className="w-screen h-screen bg-slate-950 font-albra flex flex-col justify-center items-center">
        <div className="w-[450px] flex flex-col gap-4 px-7 py-7 bg-white rounded-md shadow-lg">
            <div className="flex justify-center">
                <img src="/img/shield.png" alt="shield" className="w-[140px]" />
            </div>
            <h1 className="text-4xl text-center text-slate-900 font-semibold font-resolve">Verify it`s you</h1>
            <h3 className="text-sm text-center text-slate-800 font-thin">Thank you for creating an account with us. Click the <q className="text-slate-900">Verify Account</q>  button to complete the verification process.</h3>
            <div className="flex justify-center">
                <Button color="dark" className="px-5" onClick={VerifyAction}>Verify Account</Button>
            </div>
        </div>
    </div>
  );
}
