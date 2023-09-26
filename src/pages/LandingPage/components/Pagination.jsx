import { HiArrowLeft, HiArrowLeftCircle, HiArrowRightCircle } from "react-icons/hi2";

export default function Pagination ({
    disabledPrev = false,
    disabledNext = false,
    onChangePagination = (type = "next") => {},
}) {
    return (
        <div className="flex justify-center space-x-14">
            <button type="button" className="flex items-center cursor-pointer" disabled={disabledPrev} onClick={() => onChangePagination("prev")}>
                <HiArrowLeftCircle className="text-3xl text-slate-700"></HiArrowLeftCircle> Prev
            </button>
            <button type="button" className="flex items-center cursor-pointer" disabled={disabledNext} onClick={() => onChangePagination("next")}>
            Next <HiArrowRightCircle className="text-3xl text-slate-700"></HiArrowRightCircle>
            </button>
        </div>
    )
}