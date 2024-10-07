import { FaUsers, FaBox, FaChalkboardTeacher, FaBriefcase } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="bg-gray-100 shadow-xl rounded-r-3xl p-6 h-full flex flex-col">
            <img src="/assets/logo.png" alt="logo" className="h-[10rem] w-[17rem]" />
            <nav className="flex-grow">
                <SidebarSection icon={<FaUsers />} title="Users" items={[
                    { href: "/users", label: "All Users" },
                ]} />
                <SidebarSection icon={<FaBox />} title="Products" items={[
                    { href: "/products", label: "Dashboard" },
                    { href: "/product-table", label: "All Products" },
                    { href: "/add-products", label: "Add Product" },
                ]} />
                <SidebarSection icon={<FaChalkboardTeacher />} title="Workshops" items={[
                    { href: "/workshop-dashboard", label: "Dashboard" },
                    { href: "/active-workshops", label: "Active Workshops" },
                    { href: "/workshop-enquiries", label: "Enquiries" },
                ]} />
                <SidebarSection icon={<FaBriefcase />} title="Career Corner" items={[
                    { href: "/all-jobs", label: "All Jobs" },
                    { href: "/hiring-form", label: "Add Job" },
                    { href: "/view-applications", label: "View Applications" },
                ]} />
            </nav>
        </div>
    )
}

interface SidebarSectionProps {
    icon: React.ReactNode;
    title: string;
    items: { href: string; label: string }[];
}

const SidebarSection = ({ icon, title, items }: SidebarSectionProps) => (
    <div className="p-6">
        <div className="flex items-center mb-3">
            <span className="text-gray-600 mr-2">{icon}</span>
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>
        <ul className="space-y-2 pl-8">
            {items.map((item, index) => (
                <li key={index}>
                    <NavLink
                        to={item.href}
                        className={({ isActive }) =>
                            `text-gray-600 hover:text-blue-600 transition-colors duration-200 ${
                                isActive ? 'text-blue-600 font-semibold' : ''
                            }`
                        }
                    >
                        {item.label}
                    </NavLink>
                </li>
            ))}
        </ul>
    </div>
);

export default Sidebar;
