import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import FormField from "@/components/molecules/FormField";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";
import employeeService from "@/services/api/employeeService";
import departmentService from "@/services/api/departmentService";
const EmployeeModal = ({ isOpen, onClose, employee, onSuccess }) => {
const [formData, setFormData] = useState({
first_name_c: "",
    last_name_c: "",
email_c: "",
    phone_c: "",
    role_c: "",
    department_id_c: "",
    hire_date_c: "",
    status_c: "active",
  });
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

useEffect(() => {
    if (employee) {
setFormData({
        first_name_c: employee.first_name_c || "",
        last_name_c: employee.last_name_c || "",
email_c: employee.email_c || "",
        phone_c: employee.phone_c || "",
        role_c: employee.role_c || "",
        department_id_c: employee.department_id_c || "",
        hire_date_c: employee.hire_date_c || "",
        status_c: employee.status_c || "active",
      });
    }
  }, [employee]);

  useEffect(() => {
    if (isOpen) {
      loadDepartments();
    }
  }, [isOpen]);

  const loadDepartments = async () => {
    try {
      const data = await departmentService.getAll();
      setDepartments(data);
    } catch (error) {
      toast.error("Failed to load departments");
    }
  };

const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleMultiSelectChange = (name, value) => {
    setFormData(prev => {
      const currentValues = prev[name] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      return {
        ...prev,
        [name]: newValues
      };
    });
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

const validateForm = () => {
    const newErrors = {};
    
    if (!formData.first_name_c.trim()) newErrors.first_name_c = "First name is required";
if (formData.email_c && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email_c)) {
      newErrors.email_c = "Please enter a valid email address";
    }
    
setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      // Ensure name1_c is sent as an integer and name2_c as Boolean
const submitData = {
...formData,
// Email fields - ensure proper email format
        email_c: formData.email_c && formData.email_c.includes('@') ? formData.email_c : "",
      };
      if (employee) {
        await employeeService.update(employee.Id, submitData);
        toast.success("Employee updated successfully");
      } else {
        await employeeService.create(submitData);
        toast.success("Employee created successfully");
      }
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.message || "Failed to save employee");
    } finally {
      setLoading(false);
    }
  };

const handleClose = () => {
setFormData({
      first_name_c: "",
      last_name_c: "",
email_c: "",
      phone_c: "",
      role_c: "",
      department_id_c: "",
      hire_date_c: "",
      status_c: "active",
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-xl shadow-2xl max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold gradient-text">
            {employee ? "Edit Employee" : "Add New Employee"}
          </h2>
          <Button variant="ghost" size="sm" onClick={handleClose}>
            <ApperIcon name="X" size={20} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<FormField
              label="First Name"
              name="first_name_c"
              value={formData.first_name_c}
              onChange={handleChange}
              error={errors.first_name_c}
              placeholder="Enter first name"
            />

<FormField
              label="Last Name"
              name="last_name_c"
              value={formData.last_name_c}
              onChange={handleChange}
              error={errors.last_name_c}
              placeholder="Enter last name"
/>

<FormField
              label="Email"
              name="email_c"
              type="email"
              value={formData.email_c}
              onChange={handleChange}
              error={errors.email_c}
              placeholder="Enter email address"
            />

            <FormField
              label="Phone"
              name="phone_c"
              value={formData.phone_c}
              onChange={handleChange}
              error={errors.phone_c}
              placeholder="Enter phone number"
            />

            <FormField
              label="Role"
              name="role_c"
              value={formData.role_c}
              onChange={handleChange}
              error={errors.role_c}
              placeholder="Enter role"
            />

            <FormField
              label="Department"
              name="department_id_c"
              type="select"
              value={formData.department_id_c}
              onChange={handleChange}
              error={errors.department_id_c}
            >
<option key="select-placeholder" value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept.Id} value={dept.Id}>{dept.Name}</option>
              ))}
            </FormField>

            <FormField
              label="Hire Date"
              name="hire_date_c"
              type="date"
              value={formData.hire_date_c}
              onChange={handleChange}
              error={errors.hire_date_c}
            />

            <FormField
              label="Status"
              name="status_c"
              type="select"
              value={formData.status_c}
              onChange={handleChange}
              error={errors.status_c}
            >
<option key="active" value="active">Active</option>
              <option key="inactive" value="inactive">Inactive</option>
            </FormField>


          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <ApperIcon name="Loader2" size={16} className="mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <ApperIcon name="Save" size={16} className="mr-2" />
                  {employee ? "Update" : "Create"} Employee
                </>
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EmployeeModal;