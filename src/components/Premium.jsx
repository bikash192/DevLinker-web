import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";

const Premium = () => {
  const [isUserPremium,setUserPremium]=useState(false)
  const verifyPremiumUser=async()=>{
    const res=await axios.get(BASE_URL+"/premium/verify",{withCredentials:true});
    if(res.data.isPremium){
      setUserPremium(true);
    }

  }
  const handleClick = async (type) => {
    try {
      const order = await axios.post(
        BASE_URL + "/payment/create",
        { membershipType: type },
        { withCredentials: true }
      );
      const {amount,currency,keyId,notes,orderId}=order.data;
      const options = {
        key: keyId, 
        amount, 
        currency,
        name: 'DevLinker',
        description: 'Connect to other developers',
        order_id: orderId, 
        prefill: {
          name: notes.firstName+" "+notes.lastName,
          email: notes.email,
          contact: '9999999999'
        },
        theme: {
          color: '#F37254'
        },
        handler:verifyPremiumUser,
      }; 
      const rzp = new window.Razorpay(options);
      rzp.open();
      // It should open the dialog box of razorpay
    } catch (err) {
      console.log(err);
    }
  };
  return isUserPremium?(
    "You are already a premuim User"
  ):(
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col items-center py-16 px-6">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">
        Choose Your <span className="text-indigo-600">Membership</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
        {/* Silver Membership */}
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200 hover:shadow-2xl transition">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Silver Membership
          </h2>
          <p className="text-gray-500 text-center mt-2">Best for Starters</p>
          <div className="mt-6 text-center">
            <span className="text-4xl font-extrabold text-indigo-600">$19</span>
            <span className="text-gray-500"> / 3 months</span>
          </div>
          <ul className="mt-6 space-y-3 text-gray-700">
            <li className="flex items-center gap-2">
              <span className="text-indigo-600 font-bold">✔</span> Chat with
              other people
            </li>
            <li className="flex items-center gap-2">
              <span className="text-indigo-600 font-bold">✔</span> 100
              connections per day
            </li>
            <li className="flex items-center gap-2">
              <span className="text-indigo-600 font-bold">✔</span> Verified Blue
              Tick
            </li>
            <li className="flex items-center gap-2">
              <span className="text-indigo-600 font-bold">✔</span> Valid for 3
              months
            </li>
          </ul>
          <button
            onClick={() => handleClick("silver")}
            className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-medium transition"
          >
            Buy Silver
          </button>
        </div>

        {/* Gold Membership */}
        <div className="bg-gradient-to-b from-yellow-50 to-yellow-100 shadow-lg rounded-2xl p-8 border border-yellow-300 hover:shadow-2xl transition">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Gold Membership
          </h2>
          <p className="text-gray-600 text-center mt-2">For Professionals</p>
          <div className="mt-6 text-center">
            <span className="text-4xl font-extrabold text-yellow-600">$39</span>
            <span className="text-gray-600"> / 6 months</span>
          </div>
          <ul className="mt-6 space-y-3 text-gray-700">
            <li className="flex items-center gap-2">
              <span className="text-yellow-600 font-bold">✔</span> Chat with
              other people
            </li>
            <li className="flex items-center gap-2">
              <span className="text-yellow-600 font-bold">✔</span> Infinite
              connection requests
            </li>
            <li className="flex items-center gap-2">
              <span className="text-yellow-600 font-bold">✔</span> Verified Blue
              Tick
            </li>
            <li className="flex items-center gap-2">
              <span className="text-yellow-600 font-bold">✔</span> Valid for 6
              months
            </li>
          </ul>
          <button
            onClick={() => handleClick("gold")}
            className="mt-8 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl font-medium transition"
          >
            Buy Gold
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
