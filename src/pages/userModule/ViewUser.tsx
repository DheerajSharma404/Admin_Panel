import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { User } from "../../types";
// Import additional components and icons
import { FaArrowLeft, FaEnvelope, FaPhone } from "react-icons/fa";
import { errorToast } from '../../utils/toastResposnse';
import Loader from '../../components/common/Loader';

const ViewUser: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const { getToken } = useAuth();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = await getToken();
                const response = await axios.get(`http://localhost:4000/api/v1/user/user/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(response.data.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
                errorToast('Failed to load user details');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [getToken, userId]);

    if (loading) {
        return <Loader />;
    }

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h2 className="text-2xl font-bold mb-4">User not found</h2>
                <button
                    onClick={() => navigate('/users')}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
                >
                    Back to Users
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <div className="flex-grow container mx-auto px-4 py-8">
                <button
                    onClick={() => navigate('/users')}
                    className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out font-semibold"
                >
                    <FaArrowLeft className="h-5 w-5 mr-2" />
                    Back to Users
                </button>
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    <div className="md:flex">
                        <div className="md:flex-shrink-0 bg-gray-100 flex items-center justify-center p-8">
                            <img
                                className="h-48 w-48 object-cover rounded-full border-4 border-white shadow-lg"
                                src={user.picture || "https://via.placeholder.com/128"}
                                alt={user.name}
                            />
                        </div>
                        <div className="p-8 flex-grow">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                                    <p className="text-gray-600">@{user.name}</p>
                                </div>
                                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold">
                                    {user.role || "User"}
                                </span>
                            </div>
                            
                            <div className="mt-6 space-y-4">
                                <div className="flex items-center space-x-3">
                                    <FaEnvelope className="text-purple-500" />
                                    <span className="text-gray-700">{user.email}</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <FaPhone className="text-purple-500" />
                                    <span className="text-gray-700">{user.phoneNumber || "Not provided"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewUser;
