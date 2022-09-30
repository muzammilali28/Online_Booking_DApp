import tickBoxImg from "../images/tick-box.svg";
import downloadImg from "../images/download.svg";
import download from 'downloadjs';
import { useState } from "react";

const DownloadPopup = ({ DialogCrossIcon, Contract }) => {

    const [isDownloaded, setIsDownloaded] = useState(false)

    const Download = async () => {

        const confirmation = await Contract.confirmDownload(true);
        await confirmation.wait();

        setIsDownloaded(true)

        const response = await fetch("/OnlineRegistration");    //GET Request at localhost:5000/OnlineRegistration (Router)
        const blob = await response.blob();
        console.log(blob);
        // download(blob, "SampleFile");
        download(blob, "OnlineBooking_E_Receipt.pdf");

        // const result = await Contract.getData();
        // // console.log(result);
        // console.log("Name : ",result[0]);
        // console.log("CNIC : ",result[1]);
        // console.log("Phone Number : ",result[2]);
        // console.log("I waited here for the data fetch");
    };

    /* This is for reference Download popup */
    // return (
    //     <div className="fixed inset-0 bg-black bg-opacity-10 flex
    //     justify-center items-center z-40">
    //         <div className="bg-white">My Modal</div>
    //     </div>
    // )

    const ErrorPopUp = () => {
        alert("Please Download Your .pdf File")
    }

    return (
        <div className='fixed inset-0 flex items-center justify-center min-h-screen bg-slate-600 bg-opacity-50 z-40 inset-0'>
            <div className="relative bg-slate-100 shadow-2xl rounded-lg">
                <div className="flex flex-col -mx-24">
                    <img src={tickBoxImg} alt="tick-box" className="mt-10 mb-8 mx-auto w-16" />
                    <h2 className="mb-4 text-center text-2xl font-bold">Booking Successful</h2>
                    <p className="mx-auto text-center w-[50%] mb-8 text-lg">Please bring this E-Receipt when you visit. Kindly Click below to Download your Booking Receipt</p>
                    <button
                        className="flex items-center justify-center px-5 py-3 mb-4 bg-indigo-500 hover:bg-green-600 w-[60%] mx-auto space-x-4 rounded-lg hadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150"
                        onClick={Download}
                    >
                        <img className="animate-bounce w-6" src={downloadImg} alt="downloadlogo" />
                        <span className="text-white text-lg">Download</span>
                    </button>
                    <p className="mx-auto mb-10 text-slate-400">Your wallet will be charged for this E-Receipt.</p>
                </div>
                <div className="group absolute  right-4 flex items-center justify-center w-10 h-10 bg-slate-300 rounded-full
               top-4 hover:cursor-pointer hover:-translate-y-0.5 transition duration-150"
                    onClick={isDownloaded ? DialogCrossIcon : ErrorPopUp}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-black group-hover:text-gray-600" viewBox="0 0 24 24"
                        strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </div>

            </div>
        </div>
        // <div className='flex items-center justify-center min-h-screen bg-slate-600'>
        //     <div className="bg-slate-100 shadow-2xl rounded-lg">
        //         <div className="flex flex-col mx-auto">
        //             <img src={tickBoxImg} alt="tick-box" class="mt-10 mb-8 mx-auto w-16" />
        //                 <h2 className="mb-4 text-center text-2xl font-bold">Booking Successful</h2>
        //                 <p className="mx-auto text-center w-[50%] mb-8 text-lg">Pleasebring this E-Receipt when you visit. Kindly Click below to Download your Booking Receipt</p>
        //                 {/* <p className="mx-auto text-center w-[50%] mb-8 text-lg"> Kindly click below to Download your booking confirmation</p> */}
        //                 <button className="flex items-center justify-center px-5 py-3 mb-4 bg-indigo-500 hover:bg-green-600 w-[60%] mx-auto space-x-4 rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150">
        //                    <img className="w-6" src={downloadImg} alt="Download" />
        //                         <span className="text-white text-lg">Download</span>
        //                 </button>
        //                 <p className="mx-auto mb-10 text-slate-400">Your wallet will be charged for this E-Receipt.</p>
        //         </div>
        //     </div>
        // </div>
    )
}

export default DownloadPopup