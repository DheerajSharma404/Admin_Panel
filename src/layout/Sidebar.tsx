import TaskSidebar from "../components/taskmanager/TaskSidebar"

const Sidebar = () => {
    const type: string = "USER"
    const rendersidebar = () => {
        switch (type) {
            case "USER":
                return <TaskSidebar />
            default:
                return <div>Unknown Panel</div>
        }
    }
    return (
        <div className="shadow-lg rounded-lg p-6 h-full">
            <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-800">Admin Panel</h1>
            <div className="border-t border-gray-300 mt-4 pt-4">
                {rendersidebar()}
            </div>
        </div>
    )
}

export default Sidebar
