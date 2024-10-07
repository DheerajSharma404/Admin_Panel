const ModuleCards = () => {
    const modules = [
        {
            name: "User Management",
            description: "Manage users in the system",
            image: "https://cdn-icons-png.flaticon.com/512/2321/2321232.png",
        },
        {
            name: "Product Management",
            description: "Manage products in the system",
            image: "https://cdn-icons-png.flaticon.com/512/2321/2321232.png",
        },
        {
            name: "Reports",
            description: "View reports in the system",
            image: "https://cdn-icons-png.flaticon.com/512/2321/2321232.png",
        },
        {
            name: "Contest Management",
            description: "Manage contests in the system",
            image: "https://cdn-icons-png.flaticon.com/512/2321/2321232.png",
        },
    ];

    return (
        <div className="rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {modules.map((module, index) => (
                <div
                    key={index}
                    className="bg-gray-200 rounded-lg shadow-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:bg-gray-300"
                >
                    <img src={module.image} alt={module.name} className="w-16 h-16 mb-4" />
                    <h2 className="text-xl font-semibold mb-2">{module.name}</h2>
                    <p className="text-gray-600 text-center">{module.description}</p>
                </div>
            ))}
        </div>
    );
};

export default ModuleCards;
