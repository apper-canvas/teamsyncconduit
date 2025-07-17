import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import FormField from "@/components/molecules/FormField";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";
import { employeeService } from "@/services/api/employeeService";
import { departmentService } from "@/services/api/departmentService";
const EmployeeModal = ({ isOpen, onClose, employee, onSuccess }) => {
const [formData, setFormData] = useState({
    first_name_c: "",
    last_name_c: "",
    name1_c: "",
    name2_c: false,
    name3_c: "",
    name4_c: "",
    name5_c: "",
    name6_c: "",
    name7_c: "",
name8_c: [],
    name9_c: "",
    name10_c: "",
    name11_c: "",
    name12_c: "",
    name13_c: "",
    name14_c: "",
    name15_c: "",
    name16_c: "",
    name17_c: "",
    email_c: "",
    phone_c: "",
    role_c: "",
    department_id_c: "",
    hire_date_c: "",
    status_c: "active"
  });
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

useEffect(() => {
    if (employee) {
setFormData({
        first_name_c: employee.first_name_c,
        last_name_c: employee.last_name_c,
        name1_c: parseInt(employee.name1_c) || 0,
        name2_c: employee.name2_c === true || employee.name2_c === "true",
        name3_c: parseFloat(employee.name3_c) || 0,
        name4_c: employee.name4_c || "",
        name5_c: employee.name5_c || "",
name6_c: parseFloat(employee.name6_c) || 0,
        name7_c: employee.name7_c || "",
name8_c: employee.name8_c ? employee.name8_c.split(',').filter(v => v.trim()) : [],
        name9_c: employee.name9_c || "",
        name10_c: employee.name10_c || "",
        name11_c: employee.name11_c || "",
        name12_c: employee.name12_c || "",
        name13_c: employee.name13_c || "",
        name14_c: employee.name14_c || "",
        name15_c: employee.name15_c || "",
        name16_c: employee.name16_c || "",
        name17_c: employee.name17_c || "",
        email_c: employee.email_c,
        phone_c: employee.phone_c,
        role_c: employee.role_c,
        department_id_c: employee.department_id_c,
        hire_date_c: employee.hire_date_c,
        status_c: employee.status_c
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
if (formData.name1_c !== "" && isNaN(formData.name1_c)) newErrors.name1_c = "Name1 must be a valid number";
    if (formData.name3_c !== "" && (isNaN(formData.name3_c) || isNaN(parseFloat(formData.name3_c)))) newErrors.name3_c = "Name3 must be a valid decimal number";
    if (formData.name6_c !== "" && (isNaN(formData.name6_c) || isNaN(parseFloat(formData.name6_c)))) newErrors.name6_c = "Name6 must be a valid decimal number";
    
    if (formData.email_c && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email_c)) {
      newErrors.email_c = "Please enter a valid email address";
}
    
    if (formData.name7_c && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.name7_c)) {
      newErrors.name7_c = "Please enter a valid email address";
    }
    
    if (formData.name10_c && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.name10_c.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.name10_c = "Please enter a valid phone number";
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
        name1_c: parseInt(formData.name1_c) || 0,
        name2_c: Boolean(formData.name2_c),
        name3_c: parseFloat(formData.name3_c) || 0,
        name6_c: parseFloat(formData.name6_c) || 0,
        name8_c: Array.isArray(formData.name8_c) ? formData.name8_c.join(',') : formData.name8_c
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
      name1_c: "",
      name2_c: false,
      name3_c: "",
      name4_c: "",
      name5_c: "",
name6_c: 0,
      name7_c: "",
name8_c: [],
      name9_c: "",
      name10_c: "",
      name11_c: "",
      name12_c: "",
      name13_c: "",
      name14_c: "",
      name15_c: "",
      name16_c: "",
      name17_c: "",
      email_c: "",
      phone_c: "",
      role_c: "",
      department_id_c: "",
      hire_date_c: "",
      status_c: "active"
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
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold gradient-text">
              {employee ? "Edit Employee" : "Add New Employee"}
            </h2>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <ApperIcon name="X" size={20} />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
              label="Name1"
              name="name1_c"
              type="number"
              value={formData.name1_c}
              onChange={handleChange}
              error={errors.name1_c}
              placeholder="Enter name1"
/>

<div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="name2_c"
                name="name2_c"
                checked={formData.name2_c}
                onChange={handleChange}
                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
              />
              <label htmlFor="name2_c" className="text-sm font-medium text-gray-700">
                Name2
              </label>
              {errors.name2_c && (
                <span className="text-red-500 text-sm">{errors.name2_c}</span>
              )}
            </div>

            <FormField
              label="Name3"
              name="name3_c"
              value={formData.name3_c}
              onChange={handleChange}
              error={errors.name3_c}
              placeholder="Enter name3"
            />

<FormField
              label="Name4"
              name="name4_c"
              type="date"
              value={formData.name4_c}
              onChange={handleChange}
              error={errors.name4_c}
              placeholder="Select date"
            />

<FormField
              label="Name5"
              name="name5_c"
              type="datetime-local"
              value={formData.name5_c}
              onChange={handleChange}
              error={errors.name5_c}
              placeholder="Select date and time"
            />

<FormField
              label="Name6"
              name="name6_c"
              type="number"
              step="0.01"
              value={formData.name6_c}
              onChange={handleChange}
              error={errors.name6_c}
              placeholder="Enter decimal value"
            />

<FormField
              label="Name7"
              name="name7_c"
              type="email"
              value={formData.name7_c}
              onChange={handleChange}
              error={errors.name7_c}
              placeholder="Enter email address"
            />
<div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Name8</label>
              <div className="flex flex-wrap gap-2">
                {['value1', 'value2', 'value3', 'fdffdf', 'check', 'demo', '123', 'check23'].map(option => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleMultiSelectChange('name8_c', option)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      formData.name8_c.includes(option)
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {errors.name8_c && (
                <span className="text-red-500 text-sm">{errors.name8_c}</span>
              )}
            </div>

<FormField
              label="Name9"
              name="name9_c"
              type="textarea"
              value={formData.name9_c}
              onChange={handleChange}
              error={errors.name9_c}
              placeholder="Enter name9"
            />

<FormField
              label="Name10"
              name="name10_c"
              type="tel"
              value={formData.name10_c}
              onChange={handleChange}
              error={errors.name10_c}
              placeholder="Enter phone number"
            />

            <FormField
              label="Name11"
              name="name11_c"
              value={formData.name11_c}
              onChange={handleChange}
              error={errors.name11_c}
              placeholder="Enter name11"
            />

            <FormField
              label="Name12"
              name="name12_c"
              value={formData.name12_c}
              onChange={handleChange}
              error={errors.name12_c}
              placeholder="Enter name12"
            />

            <FormField
              label="Name13"
              name="name13_c"
              value={formData.name13_c}
              onChange={handleChange}
              error={errors.name13_c}
              placeholder="Enter name13"
            />

            <FormField
              label="Name14"
              name="name14_c"
              value={formData.name14_c}
              onChange={handleChange}
              error={errors.name14_c}
              placeholder="Enter name14"
            />

            <FormField
              label="Name15"
              name="name15_c"
              value={formData.name15_c}
              onChange={handleChange}
              error={errors.name15_c}
              placeholder="Enter name15"
            />

            <FormField
              label="Name16"
              name="name16_c"
              value={formData.name16_c}
              onChange={handleChange}
              error={errors.name16_c}
              placeholder="Enter name16"
            />

            <FormField
              label="Name17"
              name="name17_c"
              value={formData.name17_c}
              onChange={handleChange}
              error={errors.name17_c}
              placeholder="Enter name17"
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
              <option value="">Select Department</option>
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
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