import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const DepartmentGrid = ({ departments, employees, onEdit, onDelete }) => {
  const getEmployeesByDepartment = (departmentId) => {
    return employees.filter(emp => emp.departmentId === departmentId);
  };

  const getDepartmentHead = (departmentId) => {
    const dept = departments.find(d => d.Id === departmentId);
    if (!dept || !dept.headId) return null;
    return employees.find(emp => emp.Id === dept.headId);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {departments.map((department, index) => {
        const departmentEmployees = getEmployeesByDepartment(department.Id);
        const head = getDepartmentHead(department.Id);
        
        return (
          <motion.div
            key={department.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full bg-gradient-to-br from-white to-blue-50 border-blue-200">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{department.name}</CardTitle>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(department)}
                      className="hover:bg-blue-100"
                    >
                      <ApperIcon name="Edit" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(department)}
                      className="hover:bg-red-100 hover:text-red-600"
                    >
                      <ApperIcon name="Trash2" size={16} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm">{department.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Team Members</span>
                    <span className="text-2xl font-bold gradient-text">
                      {departmentEmployees.length}
                    </span>
                  </div>
                  
                  {head && (
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-xs">
                          {head.firstName[0]}{head.lastName[0]}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {head.firstName} {head.lastName}
                        </p>
                        <p className="text-xs text-gray-500">Department Head</p>
                      </div>
                    </div>
                  )}
                  
                  {departmentEmployees.length > 0 && (
                    <div className="pt-2 border-t border-gray-200">
                      <p className="text-xs text-gray-500 mb-2">Recent Team Members</p>
                      <div className="space-y-1">
                        {departmentEmployees.slice(0, 3).map(emp => (
                          <div key={emp.Id} className="text-xs text-gray-600">
                            {emp.firstName} {emp.lastName} - {emp.role}
                          </div>
                        ))}
                        {departmentEmployees.length > 3 && (
                          <div className="text-xs text-gray-500">
                            +{departmentEmployees.length - 3} more
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

export default DepartmentGrid;