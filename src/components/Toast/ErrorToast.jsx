import { Toast } from "flowbite-react";
import { useState } from "react";
import { HiXCircle, HiXMark } from "react-icons/hi2";

export default function ErrorToast({message, show}) {
    const [showToast, setShowToast] = useState(show);

    const handleHideToast = () => {
        setShowToast(false);
    }

    return (
    <div hidden={!showToast} className="fixed top-5 right-5 md:bottom-5 md:top-auto">
        <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-200 text-red-600 dark:bg-red-800 dark:text-red-200">
                <HiXCircle className="h-5 w-5" />
            </div>
            <div className="mx-3 text-sm text-slate-950 font-normal inline-flex items-center justify-center">
                {message}
            </div>
            <button onClick={handleHideToast} className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-300 hover:bg-gray-300 hover:text-slate-900">
                <HiXMark className="h-5 w-5" />
            </button>
        </Toast>
    </div>
    );
}