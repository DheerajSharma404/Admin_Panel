import { IQuotes } from "../../types"
import { motion } from "framer-motion";

const Quotes : React.FC<{quotes: IQuotes | IQuotes[]}> = ({quotes}) => {

    const quotesArray = Array.isArray(quotes) ? quotes : [quotes];

    if (!quotesArray || quotesArray.length === 0) {
        return <div>No quotes available</div>;
    }

    return (
        <div className="flex flex-col space-y-4 items-center justify-center text-center bg-gray-100 p-4 rounded-lg">
            <h1 className="text-2xl font-bold">Quote of the day</h1>
            {quotesArray.map((quote, index) => {
                return (
                    <motion.div 
                        key={index} 
                        className="flex flex-col space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.5 }} 
                    >
                        <h1 className="text-2xl font-bold">{quote.quote}</h1>
                        <p className="text-lg">{quote.author}</p>
                    </motion.div>
                );
            })}
        </div>
    )
}
export default Quotes
