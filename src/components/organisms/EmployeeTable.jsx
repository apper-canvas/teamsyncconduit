import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import StatusBadge from "@/components/molecules/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import employeeService from "@/services/api/employeeService";

const EmployeeTable = ({ employees, departments, onEdit, onRefresh }) => {
  const [deletingId, setDeletingId] = useState(null);

const getDepartmentName = (employee) => {
    // Access department name from the lookup field that includes referenceField data
    if (employee.department_id_c && typeof employee.department_id_c === 'object' && employee.department_id_c.Name) {
      return employee.department_id_c.Name;
    }
    return "Unknown";
  };

const handleDelete = async (employee) => {
    if (window.confirm(`Are you sure you want to delete ${employee.first_name_c} ${employee.last_name_c}?`)) {
      setDeletingId(employee.Id);
      try {
        await employeeService.delete(employee.Id);
        toast.success("Employee deleted successfully");
        onRefresh();
      } catch (error) {
        toast.error("Failed to delete employee");
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <Card className="bg-gradient-to-br from-white to-gray-50">
    <CardHeader>
        <CardTitle className="flex items-center">
            <ApperIcon name="Users" size={20} className="mr-2" />Employee Directory
                                            </CardTitle>
    </CardHeader>
    <CardContent>
        <div className="overflow-x-auto">
            <table className="w-full table-auto">
                <thead>
<tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Employee</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Department</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Role</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Hire Date</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Boolean1 Date</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Decimal1</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Decimal2</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                    </tr>
                </thead>
<tbody>
                    {employees.map((employee, index) => <motion.tr
                        key={employee.Id || `employee-${index}`}
                        initial={{
                            opacity: 0,
                            y: 20
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                        transition={{
                            delay: index * 0.05
                        }}
                        className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent transition-all duration-200">
                        <td className="py-3 px-4">
                            <div className="flex items-center space-x-3">
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                                    <span className="text-white font-semibold text-sm">
                                        {employee.first_name_c?.[0]}{employee.last_name_c?.[0]}
                                    </span>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">
                                        {employee.first_name_c} {employee.last_name_c}
                                    </p>
                                    <p className="text-sm text-gray-500">{employee.email_c}</p>
                                </div>
                            </div>
                        </td>
                        <td className="py-3 px-4">
                            <span className="text-gray-900">{getDepartmentName(employee)}</span>
                        </td>
                        <td className="py-3 px-4">
                            <span className="text-gray-900">{employee.role_c}</span>
                        </td>
<td className="py-3 px-4">
                            <span className="text-gray-900">
                                {employee.hire_date_c ? format(new Date(employee.hire_date_c), "MMM dd, yyyy") : "N/A"}
                            </span>
                        </td>
<td className="py-3 px-4">
                            <span className="text-gray-900">
                                {employee.boolean1_c ? format(new Date(employee.boolean1_c), "MMM dd, yyyy") : "N/A"}
                            </span>
                        </td>
                        <td className="py-3 px-4">
                            <span className="text-gray-900">
                                {employee.decimal1_c ? parseFloat(employee.decimal1_c).toFixed(2) : "0.00"}
                            </span>
                        </td>
                        <td className="py-3 px-4">
                            <span className="text-gray-900">
                                {employee.decimal2_c ? parseFloat(employee.decimal2_c).toFixed(2) : "0.00"}
                            </span>
                        </td>
                            <td className="py-3 px-4">
                                <StatusBadge status={employee.status_c} />
                            </td>
                            <td className="py-3 px-4">
                                <div className="flex items-center space-x-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onEdit(employee)}
                                        className="hover:bg-blue-50 hover:text-blue-600">
                                        <ApperIcon name="Edit" size={16} />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleDelete(employee)}
                                        disabled={deletingId === employee.Id}
                                        className="hover:bg-red-50 hover:text-red-600">
                                        {deletingId === employee.Id ? <ApperIcon name="Loader2" size={16} className="animate-spin" /> : <ApperIcon name="Trash2" size={16} />}
                                    </Button>
                                </div>
                            </td>
                        </motion.tr>)}
                </tbody>
            </table>
        </div>
    </CardContent>
</Card>
  );
};

export default EmployeeTable;