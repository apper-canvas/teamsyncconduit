import { useState, useContext } from "react";
import { useSelector } from "react-redux";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import ApperIcon from "@/components/ApperIcon";
import { AuthContext } from "@/App";

const Header = ({ title, onMenuClick, onSearch, showSearch = false }) => {
  const [showProfile, setShowProfile] = useState(false);
  const { logout } = useContext(AuthContext);
  const { user } = useSelector((state) => state.user);

  const handleLogout = async () => {
    setShowProfile(false);
    await logout();
  };

  const getUserInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`;
    }
    if (user?.name) {
      const names = user.name.split(' ');
      return names.length > 1 ? `${names[0][0]}${names[1][0]}` : names[0][0];
    }
    return 'U';
  };

  const getUserDisplayName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user?.name || 'User';
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuClick}
              className="lg:hidden"
            >
              <ApperIcon name="Menu" size={20} />
            </Button>
            <h1 className="text-2xl font-bold gradient-text">{title}</h1>
          </div>

          <div className="flex items-center space-x-4">
            {showSearch && (
              <div className="hidden sm:block">
                <SearchBar
                  placeholder="Search employees..."
                  onSearch={onSearch}
                  className="w-64"
                />
              </div>
            )}
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <ApperIcon name="Bell" size={20} />
              </Button>
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowProfile(!showProfile)}
                  className="flex items-center space-x-2"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {getUserInitials()}
                    </span>
                  </div>
                  <span className="hidden sm:block text-sm font-medium">
                    {getUserDisplayName()}
                  </span>
                </Button>
                
                {showProfile && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                      <p className="font-medium">{getUserDisplayName()}</p>
                      <p className="text-gray-500">{user?.emailAddress}</p>
                    </div>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                    <div className="border-t border-gray-200 my-1"></div>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;