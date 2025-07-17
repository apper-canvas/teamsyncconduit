import { NavLink } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Sidebar = ({ isOpen, onClose }) => {
  const navigation = [
    { name: "Dashboard", href: "/", icon: "LayoutDashboard" },
    { name: "Employees", href: "/employees", icon: "Users" },
    { name: "Departments", href: "/departments", icon: "Building" },
    { name: "Attendance", href: "/attendance", icon: "Clock" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:z-50">
        <div className="flex flex-col flex-grow bg-gradient-to-b from-gray-900 to-gray-800 shadow-xl">
          <div className="flex items-center h-16 px-4">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-r from-primary to-secondary rounded-lg mr-3">
                <ApperIcon name="Users" size={20} className="text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">TeamSync Pro</h1>
            </div>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white",
                    isActive
                      ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                      : "text-gray-300 hover:text-white"
                  )
                }
              >
                <ApperIcon
                  name={item.icon}
                  size={20}
                  className="mr-3"
                />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
          <div className="fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-gray-900 to-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="flex items-center justify-between h-16 px-4">
              <div className="flex items-center">
                <div className="p-2 bg-gradient-to-r from-primary to-secondary rounded-lg mr-3">
                  <ApperIcon name="Users" size={20} className="text-white" />
                </div>
                <h1 className="text-xl font-bold text-white">TeamSync Pro</h1>
              </div>
              <button
                onClick={onClose}
                className="text-gray-300 hover:text-white"
              >
                <ApperIcon name="X" size={24} />
              </button>
            </div>
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white",
                      isActive
                        ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                        : "text-gray-300 hover:text-white"
                    )
                  }
                >
                  <ApperIcon
                    name={item.icon}
                    size={20}
                    className="mr-3"
                  />
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;