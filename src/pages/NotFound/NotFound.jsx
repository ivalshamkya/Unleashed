import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

export default function NotFound() {

  return (
    <div className="w-screen h-screen bg-slate-950 font-albra flex flex-col justify-center items-center">
        <div>
            <h1 className="text-8xl text-center text-slate-50 font-black tracking-wider font-resolve">OOPS!</h1>
            <img src="/img/404.png" alt="" className="w-[380px]" />
            <h1 className="text-3xl text-center text-slate-50 font-black tracking-wide font-resolve mb-8">Sorry, The page not found</h1>
            <div className="flex justify-center">
                <Link to={'/'}>
                    <button type="button" className="text-slate-950 bg-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none hover:bg-slate-200">
                        Back to home
                    </button>
                </Link>
            </div>
        </div>
    </div>
  );
}
