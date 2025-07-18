import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import StatusBadge from "@/components/molecules/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import { employeeService } from "@/services/api/employeeService";

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
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Name4</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Name5</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Name6</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Name7</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Name8</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Name12</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Name13</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Name15</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Name16</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Name17</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Name19</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Name20</th>
<th className="text-left py-3 px-4 font-semibold text-gray-700">Number1</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Number2</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Number3</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Number4</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Number5</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Number6</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Number7</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Number8</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Number9</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Number10</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Number11</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Number12</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Number13</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Number14</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Number15</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Number16</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Website</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, index) => <motion.tr
                        key={employee.Id}
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
                                {format(new Date(employee.hire_date_c), "MMM dd, yyyy")}
                            </span>
                        </td>
                        <td className="py-3 px-4">
                            <span className="text-gray-900">
                                {employee.name4_c ? format(new Date(employee.name4_c), "MMM dd, yyyy") : "-"}
                            </span>
                        </td>
                        <td className="py-3 px-4">
                            <span className="text-gray-900">
                                {employee.name5_c ? format(new Date(employee.name5_c), "MMM dd, yyyy HH:mm") : "-"}
                            </span>
                        </td>
                        <td className="py-3 px-4">
                            <span className="text-gray-900">
                                {employee.name6_c ? parseFloat(employee.name6_c).toFixed(2) : "-"}
                            </span>
                        </td>
                        <td className="py-3 px-4">
                            <span className="text-gray-900">
                                {employee.name7_c || "-"}
                            </span>
                        </td>
                        <td className="py-3 px-4">
                            <div className="flex flex-wrap gap-1">
                                {employee.name8_c && employee.name8_c.split(",").filter(v => v.trim()).map((value, index) => <span
                                    key={index}
                                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {value.trim()}
                                </span>)}
                                {(!employee.name8_c || employee.name8_c.split(",").filter(v => v.trim()).length === 0) && <span className="text-gray-500">-</span>}
                            </div>
                        </td>
                        <td className="py-3 px-4">
                            <span className="text-gray-900">
                                {employee.name12_c || "-"}
                            </span>
                        </td>
                        <td className="py-3 px-4">
                            <div className="flex flex-wrap gap-1">
                                {employee.name13_c && employee.name13_c.split(",").filter(v => v.trim()).map((value, index) => <span
                                    key={index}
                                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    {value.trim()}
                                </span>)}
                                {(!employee.name13_c || employee.name13_c.split(",").filter(v => v.trim()).length === 0) && <span className="text-gray-500">-</span>}
                            </div>
                        </td>
                        <td className="py-3 px-4">
                            <div className="flex items-center">
                                {employee.name15_c ? <>
                                    {[1, 2, 3, 4, 5].map(star => <span
                                        key={star}
                                        className={`text-lg ${star <= employee.name15_c ? "text-yellow-400" : "text-gray-300"}`}>★
                                                                    </span>)}
                                </> : <span className="text-gray-500">-</span>}
                            </div>
                        </td>
                        <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                                {employee.name16_c ? <>
                                    <div className="w-20 bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full"
                                            style={{
                                                width: `${parseInt(employee.name16_c) || 0}%`
                                            }}></div>
                                    </div>
                                    <span className="text-sm text-gray-600">{employee.name16_c}</span>
                                </> : <span className="text-gray-500">-</span>}
                            </div>
                        </td>
                        <td className="py-3 px-4">
                            <div className="flex flex-wrap gap-1">
                                {employee.name17_c && employee.name17_c.split(",").filter(v => v.trim()).map((value, index) => <span
                                    key={index}
                                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                    {value.trim()}
                                </span>)}
                                {(!employee.name17_c || employee.name17_c.split(",").filter(v => v.trim()).length === 0) && <span className="text-gray-500">-</span>}
                            </div>
                        </td>
                        <td className="py-3 px-4">
                            <div className="flex flex-wrap gap-1">
                                {employee.name18_c && employee.name18_c.split(",").filter(v => v.trim()).map((value, index) => <span
                                    key={index}
                                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                    {value.trim()}
                                </span>)}
                                {(!employee.name18_c || employee.name18_c.split(",").filter(v => v.trim()).length === 0) && <span className="text-gray-500">-</span>}
                            </div>
                        </td>
                        <td className="py-3 px-4">
                            <div className="flex flex-wrap gap-1">
                                {employee.name19_c && employee.name19_c.split(",").filter(v => v.trim()).map((value, index) => <span
                                    key={index}
                                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                                    {value.trim()}
                                </span>)}
                                {(!employee.name19_c || employee.name19_c.split(",").filter(v => v.trim()).length === 0) && <span className="text-gray-500">-</span>}
                            </div>
                        </td>
                        <td className="py-3 px-4">
                            <span className="text-gray-900">
                                {employee.name20_c || "-"}
                            </span>
                        </td>
<td className="py-3 px-4">
                            <span className="text-gray-900">
                                {employee.number1_c || "-"}
                            </span>
                        </td>
<td className="py-3 px-4">
                            <span className="text-gray-900">
                                {employee.number2_c === true ? "Yes" : employee.number2_c === false ? "No" : "-"}
                            </span>
                        </td>
<td className="py-3 px-4">
                            <span className="text-gray-900">
                                {employee.number3_c ? `$${parseFloat(employee.number3_c).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "-"}
                            </span>
                        </td>
                        <td className="py-3 px-4">
                            <span className="text-gray-900">
                                {employee.number4_c || "-"}
                            </span>
                        </td>
                        <td className="py-3 px-4">
                            <span className="text-gray-900">
                                {employee.number5_c || "-"}
                            </span>
                        </td>
                        <td className="py-3 px-4">
                            <span className="text-gray-900">
                                {employee.number6_c || "-"}
                            </span>
                        </td>
                        <td className="py-3 px-4">
                            <span className="text-gray-900">
                                {employee.number7_c || "-"}
                            </span>
                        </td>
                        <td className="py-3 px-4">
                            <span className="text-gray-900">
                                {employee.number8_c || "-"}
                            </span>
                        </td>
                        <td className="py-3 px-4">
                            <span className="text-gray-900">
                                {employee.number9_c || "-"}
                            </span>
                        </td>
                        <td className="py-3 px-4">
                            <span className="text-gray-900">
                                {employee.number10_c || "-"}
                            </span>
                        </td>
                        <td className="py-3 px-4">
                            <span className="text-gray-900">
                                {employee.number11_c || "-"}
                            </span>
                        </td>
                        <td className="py-3 px-4">
                            <span className="text-gray-900">
                                {employee.number12_c || "-"}
                            </span>
                        </td>
                        <td className="py-3 px-4">
                            <span className="text-gray-900">
                                {employee.number13_c || "-"}
                            </span>
                        </td>
                        <td className="py-3 px-4">
                            <span className="text-gray-900">
                                {employee.number14_c || "-"}
                            </span>
                        </td>
                        <td className="py-3 px-4">
                            <span className="text-gray-900">
                                {employee.number15_c || "-"}
                            </span>
                        </td>
                        <td className="py-3 px-4">
                            <span className="text-gray-900">
                                {employee.number16_c || "-"}
                            </span>
                        </td>
                        <td className="py-3 px-4">
                            {employee.name14_c ? <a
                                href={employee.name14_c.startsWith("http") ? employee.name14_c : `https://${employee.name14_c}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 hover:underline">
                                {employee.name14_c}
                            </a> : <span className="text-gray-500">-</span>}
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