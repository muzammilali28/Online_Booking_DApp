import { ethers } from "ethers";
import Conabi from "../abi/FormData.json";
import Conadd from "../abi/ContractAddress.json";
import { useState } from "react";
import DownloadPopUp from './DownloadPopup';
import formLogo from "../images/formLogo.png";

const contractAbi = Conabi.abi;
const contractAddress = Conadd.address;

const AppointmentForm = ({ DialogCrossIcon }) => {

  // useEffect(() => {

  //   const storeAccounts = async () => {
  //     const response = await fetch("/userWallets", {
  //       method: "POST",
  //       headers: {
  //         "Content-type": "application/json"
  //       },
  //       body: JSON.stringify({ Address: AccAddress, Balance: AccBalance })
  //     })
  //     const result = await response.json();

  //     console.log(result);
  //   }

  //   storeAccounts();
  // });

  const [ContractCalled, setContractCalled] = useState();
  const [otherSelected, setOtherSeleceted] = useState(false);
  const [isRegister, setIsRegsiter] = useState(false);
  const [remainingChr, setRemainChr] = useState(0);
  const [textArea, setTextArea] = useState("");

  const ContractAccess = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const Contract = new ethers.Contract(contractAddress, contractAbi, signer);

    return Contract;
  }

  const FilledForm = async (event) => {

    event.preventDefault();

    setIsRegsiter(false);

    const date = new Date();

    const issuedTime = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(); /// date.getSeconds()

    const current_date = date.getDate() + " / " + (date.getMonth() + 1) + " / " + date.getFullYear();

    const expiry_date = (date.getDate() + 3) + " / " + (date.getMonth() + 1) + " / " + date.getFullYear();

    const [name, cnicNumber, contact, appointment, description] = event.target;

    const Details = {
      // "Name": name.value,
      // "CNICNumber": cnicNumber.value,
      // "Contact": contact.value,
      // "Address": address.value,
      "Appointment": appointment.value,
      "currentDate": current_date,
      "expiryDate": expiry_date,
      "registerTime": issuedTime
    };

    // console.log("Name is : ", typeof name.value)
    // console.log("CNIC is : ", typeof cnicNumber.value)
    // console.log("Contact is : ", typeof contact.value)
    // console.log("Address is : ", address.value)
    // console.log("Appointment Type is : ", typeof appointment.value)
    // console.log("Description is : ", typeof description.value)

    // console.log(Details);
    // console.log("Appending Key Value in Object")
    // EnterDeatils["PUSH"] = "Sample Pushed Data";
    // console.log(EnterDeatils);

    if (otherSelected) {
      // console.log("Other Option is set to True Here!!!")
      // console.log("Description is : ", typeof description.value)
      Details["Description"] = description.value;
    }

    if (appointment.value === "General Checkup") {
      Details["Amount"] = 100;
    }
    else if (appointment.value === "Specialist Consultation") {
      Details["Amount"] = 200;
    }
    else if (appointment.value === "Peed's Services") {
      Details["Amount"] = 300;
    }
    else if (appointment.value === "Gynecology") {
      Details["Amount"] = 400;
    }
    else if (appointment.value === "Others") {
      Details["Amount"] = 500;
    }

    /*
      Now Contact will be called here and await till values are set and Meta Mask Confirms the Transcation
    */
    const Contract = ContractAccess();

    setContractCalled(Contract);

    const confirmation = await Contract.setData(name.value, cnicNumber.value, contact.value);

    console.log("Confirmation : ", confirmation)

    const tx = await confirmation.wait();

    console.log(" TX : ", tx)

    console.log("I am waiting for the Transaction to write on Blockchain")

    const result = await Contract.getData();

    Details["Name"] = result[0];
    Details["CNICNumber"] = result[1];
    Details["Contact"] = result[2];

    // console.log("Name : ",result[0])
    // console.log("CNICNumber : ",result[1])
    // console.log("Contact : ",result[2])

    //POST Request at localhost:5000/OnlineRegistration (Router)
    const response = await fetch("/OnlineRegistration", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(Details)
    })
    const server_res = await response.json();

    console.log(server_res)

    // console.log(result);

    // console.log(fetchedValue);

    // setContractCalled(false); DONE

    // const Contract = ContractAccess(); DONE

    // await Contract.setCounter(fetchedValue);

    // console.log("I have waited here for the Confirmation");

    // const counterUpdate = await Contract.getCount();

    // console.log(counterUpdate);

    // const value = ethers.utils.arrayify(counterUpdate);

    // console.log(value[0]);

    // setUpdateCounter(value[0]);

    // setUpdateCounter(parseInt(fetchedValue));

    setIsRegsiter(true);
  }

  const checkCharacters = (e) => {
    setTextArea(e.target.value)
    setRemainChr(e.target.value.length)
  }

  return (
    <>
      {isRegister && <DownloadPopUp DialogCrossIcon={DialogCrossIcon} Contract={ContractCalled} />}
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-21 w-auto"
              // src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              src={formLogo}
              alt="Hospital Logo"
            />
            <h2 className="text-center text-3xl font-bold tracking-tight text-red-500">
              Online Appointment Booking
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={FilledForm}>
            {/* <input type="hidden" name="remember" defaultValue="true" /> */}
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                {/* htmlFor="password" className="sr-only" */}
                <label>
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="name"
                  required
                  className="mt-2 relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Full Name"
                />
              </div>
              <br />
              <div>
                <label>
                  CNIC Number
                </label>
                <input
                  id="cnicNumber"
                  name="cnicNumber"
                  type="tel"
                  pattern="[0-9]{5}-[0-9]{7}-[0-9]{1}"
                  required
                  className="mt-2 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="35202 - 58XXXXXX - X"
                />
              </div>
              <br />
              <div>
                <label>
                  Contact Number
                </label>
                <input
                  id="contact"
                  name="contact"
                  type="tel"
                  pattern="[0-9]{4}-[0-9]{7}"
                  required
                  className="mt-2 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="0349 - 52XXXXX"
                />
              </div>
              <br />
              {/* <div>
                <label>
                  Address <span className="ml-1 mx-auto mb-10 text-slate-400 text-xs">Optional</span>
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  className="mt-2 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="House No 4##, Block J-#, Johar Town, Lahore"
                />
              </div>
              <br /> */}
              <div>
                <label>
                  Appointment Type
                </label>
                <select
                  id="appointment"
                  name="appointment"
                  className="mt-2 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-grey-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  required>
                  <option value={"General Checkup"} onClick={() => { setOtherSeleceted(false) }}>General Checkup (Rs. 100)</option>
                  <option value={"Specialist Consultation"} onClick={() => { setOtherSeleceted(false) }}>Specialist Consultation (Rs. 200)</option>
                  <option value={"Peed's Services"} onClick={() => { setOtherSeleceted(false) }}>Peed's Services (Rs. 300)</option>
                  <option value={"Gynecology"} onClick={() => { setOtherSeleceted(false) }}>Gynecology (Rs. 400)</option>
                  <option value={"Others"} onClick={() => { setOtherSeleceted(true) }}>Others... (Rs. 500)</option>
                </select>
              </div>
              <br />
              {otherSelected &&
                <div>
                  <textarea
                    name="description"
                    type="text"
                    maxLength="70"
                    required
                    // onKeyUp={checkCharacters}
                    value={textArea}
                    onChange={checkCharacters}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" rows="4" placeholder="Please Specify Here....."
                  >
                  </textarea>
                  <div className="float-right text-sm">
                    <p1 className="text-gray-400">{remainingChr} / 70</p1>
                  </div>
                </div>
              }
              <br />
              <br />
              <span className="flex justify-center ml-1 mx-auto mb-10 text-slate-600 text-sm">Online Booking will be valid for (<b> 3 Days</b> )</span>
            </div>
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-500 py-2 px-4 text-sm font-large text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Book Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default AppointmentForm