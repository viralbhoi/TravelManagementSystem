import React from 'react'
import NotFound from './NodataFound'
export default function History({userTripHys}) {
  return (
    
        <>
            <div className="w-full flex flex-col  items-center justify-center overflow-x-auto">
                <div className="row">
                    {userTripHys.length === 0 ? (
                        <NotFound message='No Booking History Fond or Pending Trips' />
                    ) : (
                        
                        <table className="table-auto  border-collapse border my-10 border-gray-400 w-full text-center">
                            <caption className='text-xl text-left'>Your Trips History:</caption>
                            <thead>
                                <tr className="bg-blue-600 text-white">
                                    <th className="border border-gray-400 px-4 py-2">Start Date</th>
                                    <th className="border border-gray-400 px-4 py-2">End Date</th>
                                    <th className="border border-gray-400 px-4 py-2">Pickup City</th>
                                    <th className="border border-gray-400 px-4 py-2">Destination City</th>
                                    <th className="border border-gray-400 px-4 py-2">Vehicle Type</th>
                                    <th className="border border-gray-400 px-4 py-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userTripHys.map((trip, index) => (
                                    <tr key={index} className="bg-gray-300 hover:bg-gray-200">
                                        <td className="border border-gray-400 px-4 py-2">{trip.startDate}</td>
                                        <td className="border border-gray-400 px-4 py-2">{trip.endDate}</td>
                                        <td className="border border-gray-400 px-4 py-2">{trip.pickUp}</td>
                                        <td className="border border-gray-400 px-4 py-2">{trip.destination}</td>
                                        <td className="border border-gray-400 px-4 py-2">{trip.vehicleType}</td>
                                        <td className={`border font-semibold border-gray-400  px-4 py-2 ${trip?.status==='pending'?'text-red-700':'text-green-700'}`}>
                                            {trip.status === "rejected"
                                                ? `Rejected - ${trip.rejectionReason}`
                                                : trip.status}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        
                        </table>


                    )}
                </div>

              

            </div>
        </>
  )
}
