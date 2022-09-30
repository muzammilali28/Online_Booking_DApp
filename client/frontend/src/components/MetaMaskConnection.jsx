import { LockClosedIcon } from '@heroicons/react/20/solid'
import metamaskLogo from "../images/MetaMask_Fox.svg";

const MetaMaskConnection = ({ connectMetaMask }) => {

    // const downloadPDF = async () => {
    //     const response = await fetch("/pdfCreator");
    //     const blob = await response.blob();
    //     console.log(blob);
    //     download(blob, "SampleFile");

    //     // console.log(result);
    // }

    return (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <img
                        className="mx-auto h-40 w-auto"
                        // src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        src={metamaskLogo}
                        alt="MetaMask Logo"
                    />
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Connect your MetaMask
                    </h2>
                </div>
                < button
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={connectMetaMask}
                >
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                    </span>
                    Connect
                </button >
            </div>
        </div>
    )
}

export default MetaMaskConnection