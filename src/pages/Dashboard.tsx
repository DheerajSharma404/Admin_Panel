import ModuleCards from "../components/dashboard/ModuleCards";
import Quotes from "../components/dashboard/Quotes";
import { getQuotes } from "../services/quoteService"
import { IQuotes } from "../types"
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
const Dashboard = () => {
  const [quotes, setQuotes] = useState<IQuotes[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuotes = async () => {
      const data = await getQuotes();
      setQuotes(data);
      setLoading(false);
    };
    const interval = setInterval(fetchQuotes, 10000);
    fetchQuotes();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-100">
      <div className="">
      <div className="flex flex-col p-6 md:p-12 h-full">
        <h1 className="text-3xl md:text-4xl font-bold text-left mb-6 text-gray-800">Mentoons Admin</h1>
        <div className="flex flex-col space-y-6">
          <div className="w-full flex justify-center relative">
            <img src="/assets/logo.png" alt="logo" className="lg:h-[20rem] object-contain lg:object-cover " />
            <motion.img 
              src="/assets/football.png" 
              alt="team" 
              className="w-20 h-20 absolute bottom-0 right-0 hidden md:block"
              animate={{
                y: [-16, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
            <motion.img 
              src="/assets/helicopter.png" 
              alt="helicopter" 
              className="w-20 h-20 absolute bottom-0 left-0 rotate-180 hidden md:block" 
              animate={{
                x: ['0%', '100%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }}
            />
          </div>
          </div>
          {
            loading ? <p className="text-center text-gray-600">Loading...</p> : <Quotes quotes={quotes} />
          }
        </div>
        <div className="w-full py-2">
          <ModuleCards/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;