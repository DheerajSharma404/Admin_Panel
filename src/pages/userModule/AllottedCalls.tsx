import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useState, useEffect } from "react";

const statusConfig: any = {
  'reached out': {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-200',
    label: 'Reached Out'
  },
  'converted to lead': {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-200',
    label: 'Converted to Lead'
  },
  'awaiting outreach': {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    border: 'border-yellow-200',
    label: 'Awaiting Outreach'
  },
  'conversion unsuccessful': {
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-200',
    label: 'Conversion Unsuccessful'
  }
};

const AllottedCalls = () => {
    const {getToken} = useAuth()
    const [allottedCalls, setAllottedCalls] = useState<any[]>([]);

    const fetchAllottedCalls = async () => {
        try {
            const response = await axios.get(`https://mentoons-backend-zlx3.onrender.com/api/v1/user/allocatedCalls`,
                {
                    headers: {
                        Authorization: `Bearer ${await getToken()}`
                    }
                }
            )
            setAllottedCalls(response.data.data.allocatedCalls)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchAllottedCalls()
    }, [])

    if(allottedCalls.length === 0) return <div className="text-center text-2xl font-bold text-gray-900">No allotted calls</div>

  return(
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Allotted Calls</h1>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Caller Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allottedCalls.map(call => (
              <tr key={call._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{call.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{call.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{call.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ${statusConfig[call.status].bg} ${statusConfig[call.status].text} ${statusConfig[call.status].border}`}>
                    {statusConfig[call.status].label}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
};

export default AllottedCalls;
