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
    name1_c: 0,
    name2_c: false,
    name3_c: 0,
    name4_c: "",
    name5_c: "",
    name6_c: 0,
    name7_c: "",
    name8_c: [],
    name9_c: "",
    name10_c: "",
    name11_c: "",
    name12_c: "",
    name13_c: [],
    name14_c: "",
    name15_c: 0,
    name16_c: "",
    name17_c: [],
    email_c: "",
    phone_c: "",
    role_c: "",
    department_id_c: "",
    hire_date_c: "",
    status_c: "active",
    name18_c: [],
    name19_c: [],
    name20_c: "",
number1_c: "",
    number2_c: false,
number3_c: 0,
    number4_c: "",
    number5_c: "",
number6_c: 0.00,
number7_c: "",
number8_c: [],
number9_c: "",
number10_c: "",
number11_c: "",
number12_c: "",
    number13_c: 0,
    number14_c: 0,
    number15_c: 0,
    number16_c: 0
  });
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

useEffect(() => {
    if (employee) {
setFormData({
        first_name_c: employee.first_name_c || "",
        last_name_c: employee.last_name_c || "",
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
        name13_c: employee.name13_c ? employee.name13_c.split(',').filter(v => v.trim()) : [],
        name14_c: employee.name14_c || "",
        name15_c: parseInt(employee.name15_c) || 0,
        name16_c: employee.name16_c || "",
        name17_c: employee.name17_c ? employee.name17_c.split(',').filter(v => v.trim()) : [],
        email_c: employee.email_c || "",
        phone_c: employee.phone_c || "",
        role_c: employee.role_c || "",
        department_id_c: employee.department_id_c || "",
        hire_date_c: employee.hire_date_c || "",
        status_c: employee.status_c || "active",
        name18_c: employee.name18_c ? employee.name18_c.split(',').filter(v => v.trim()) : [],
        name19_c: employee.name19_c ? employee.name19_c.split(',').filter(v => v.trim()) : [],
        name20_c: employee.name20_c || "",
number1_c: employee.number1_c || "",
        number2_c: employee.number2_c === true || employee.number2_c === "true",
number3_c: parseFloat(employee.number3_c) || 0,
        number4_c: employee.number4_c || "",
number5_c: employee.number5_c || "",
number6_c: parseFloat(employee.number6_c) || 0.00,
number7_c: employee.number7_c || "",
number8_c: employee.number8_c ? employee.number8_c.split(',').filter(v => v.trim()) : [],
number9_c: employee.number9_c || "",
number10_c: employee.number10_c || "",
number11_c: employee.number11_c || "",
number12_c: employee.number12_c || "",
        number13_c: parseInt(employee.number13_c) || 0,
        number14_c: parseInt(employee.number14_c) || 0,
        number15_c: parseInt(employee.number15_c) || 0,
        number16_c: parseInt(employee.number16_c) || 0
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
    if (formData.name15_c !== 0 && (formData.name15_c < 1 || formData.name15_c > 5)) newErrors.name15_c = "Rating must be between 1 and 5";
    if (formData.email_c && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email_c)) {
      newErrors.email_c = "Please enter a valid email address";
}
    
if (formData.name7_c && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.name7_c)) {
      newErrors.name7_c = "Please enter a valid email address";
    }
    
if (formData.name10_c && !/^[+]?[1-9][\d]{0,15}$/.test(formData.name10_c.replace(/[\s\-()]/g, ''))) {
      newErrors.name10_c = "Please enter a valid phone number";
    }
    
    if (formData.name14_c && !/^https?:\/\/.+\..+/.test(formData.name14_c)) {
      newErrors.name14_c = "Please enter a valid website URL (e.g., https://example.com)";
    }
    
if (formData.name20_c && !/^[+]?[1-9][\d]{0,15}$/.test(formData.name20_c.replace(/[\s\-()]/g, ''))) {
      newErrors.name20_c = "Please enter a valid phone number";
}
    
if (formData.number3_c !== "" && (isNaN(formData.number3_c) || isNaN(parseFloat(formData.number3_c)))) newErrors.number3_c = "Number3 must be a valid currency amount";
    // number4_c is now a date field, no number validation needed
    // number5_c is now a datetime field, no number validation needed
if (formData.number6_c !== "" && (isNaN(formData.number6_c) || isNaN(parseFloat(formData.number6_c)))) newErrors.number6_c = "Number6 must be a valid decimal number";
if (formData.number7_c && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.number7_c)) newErrors.number7_c = "Please enter a valid email address";
if (formData.number10_c && !/^[+]?[1-9][\d]{0,15}$/.test(formData.number10_c.replace(/[\s\-()]/g, ''))) {
      newErrors.number10_c = "Please enter a valid phone number";
    }
// number12_c is now a radio field, no number validation needed
    if (formData.number13_c !== "" && isNaN(formData.number13_c)) newErrors.number13_c = "Number13 must be a valid number";
    if (formData.number14_c !== "" && isNaN(formData.number14_c)) newErrors.number14_c = "Number14 must be a valid number";
    if (formData.number15_c !== "" && isNaN(formData.number15_c)) newErrors.number15_c = "Number15 must be a valid number";
    if (formData.number16_c !== "" && isNaN(formData.number16_c)) newErrors.number16_c = "Number16 must be a valid number";
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
name8_c: Array.isArray(formData.name8_c) ? formData.name8_c.join(',') : formData.name8_c,
        name13_c: Array.isArray(formData.name13_c) ? formData.name13_c.join(',') : formData.name13_c,
        name15_c: parseInt(formData.name15_c) || 0,
name17_c: Array.isArray(formData.name17_c) ? formData.name17_c.join(',') : formData.name17_c,
        name18_c: Array.isArray(formData.name18_c) ? formData.name18_c.join(',') : formData.name18_c,
        name19_c: Array.isArray(formData.name19_c) ? formData.name19_c.join(',') : formData.name19_c,
number1_c: formData.number1_c || "",
        number2_c: Boolean(formData.number2_c),
number3_c: parseFloat(formData.number3_c) || 0,
        number4_c: formData.number4_c || "",
        number5_c: formData.number5_c || "",
number6_c: parseFloat(formData.number6_c) || 0.00,
number7_c: formData.number7_c || "",
number8_c: Array.isArray(formData.number8_c) ? formData.number8_c.join(',') : formData.number8_c,
number9_c: formData.number9_c || "",
number10_c: formData.number10_c || "",
number11_c: formData.number11_c || "",
number12_c: formData.number12_c || "",
        number13_c: parseInt(formData.number13_c) || 0,
        number14_c: parseInt(formData.number14_c) || 0,
        number15_c: parseInt(formData.number15_c) || 0,
        number16_c: parseInt(formData.number16_c) || 0
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
      name1_c: 0,
      name2_c: false,
      name3_c: 0,
      name4_c: "",
      name5_c: "",
      name6_c: 0,
      name7_c: "",
      name8_c: [],
      name9_c: "",
      name10_c: "",
      name11_c: "",
      name12_c: "",
      name13_c: [],
      name14_c: "",
      name15_c: 0,
      name16_c: "",
      name17_c: [],
      email_c: "",
      phone_c: "",
      role_c: "",
      department_id_c: "",
      hire_date_c: "",
      status_c: "active",
      name18_c: [],
      name19_c: [],
      name20_c: "",
number1_c: "",
number2_c: false,
number3_c: 0,
      number4_c: "",
number12_c: formData.number12_c || "",
number6_c: 0.00,
number7_c: "",
number8_c: [],
number9_c: "",
number10_c: "",
number11_c: "",
      number13_c: 0,
      number14_c: 0,
      number15_c: 0,
      number16_c: 0
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
              type="text"
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
              type="select"
              value={formData.name11_c}
              onChange={handleChange}
              error={errors.name11_c}
            >
              <option value="">Select Name11</option>
              <option value="Option1">Option1</option>
              <option value="Option2">Option2</option>
              <option value="Option3">Option3</option>
            </FormField>

<div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Name12</label>
              <div className="flex flex-col space-y-2">
                {['Option A', 'Option B', 'Option C', 'Option D'].map(option => (
                  <label key={option} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="name12_c"
                      value={option}
                      checked={formData.name12_c === option}
                      onChange={handleChange}
                      className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary focus:ring-2"
                    />
                    <span className="text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
              {errors.name12_c && (
                <span className="text-red-500 text-sm">{errors.name12_c}</span>
              )}
            </div>
<div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Name13</label>
              <div className="flex flex-wrap gap-2">
                {['ikj', 'chess', 'test', 'demo123', '456', '23.46', 'asasasd'].map(option => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleMultiSelectChange('name13_c', option)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      formData.name13_c.includes(option)
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {errors.name13_c && (
                <span className="text-red-500 text-sm">{errors.name13_c}</span>
              )}
            </div>

<FormField
              label="Website"
              name="name14_c"
              type="url"
              value={formData.name14_c}
              onChange={handleChange}
              error={errors.name14_c}
              placeholder="Enter website URL (e.g., https://example.com)"
            />

<div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Name15 (Rating)</label>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, name15_c: star }))}
                    className={`text-2xl transition-colors hover:scale-110 ${
                      star <= formData.name15_c ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-200'
                    }`}
                  >
                    ★
                  </button>
                ))}
                {formData.name15_c > 0 && (
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, name15_c: 0 }))}
                    className="ml-2 text-sm text-gray-500 hover:text-gray-700"
                  >
                    Clear
                  </button>
                )}
              </div>
              {errors.name15_c && (
                <span className="text-red-500 text-sm">{errors.name15_c}</span>
              )}
            </div>

<FormField
              label="Name16 (Range)"
              name="name16_c"
              type="range"
              value={formData.name16_c}
              onChange={handleChange}
              error={errors.name16_c}
              min="0"
              max="100"
            />

<div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Name17</label>
              <div className="flex flex-wrap gap-2">
                {['value1', 'value2', 'value3', 'fdffdf', 'check', 'demo', '123', 'check23', 'test', 'test17', '23.47'].map(option => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleMultiSelectChange('name17_c', option)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      formData.name17_c.includes(option)
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {errors.name17_c && (
                <span className="text-red-500 text-sm">{errors.name17_c}</span>
              )}
            </div>

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

<div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Name18</label>
              <div className="flex flex-wrap gap-2">
                {['value1', 'value2', 'value3', 'option4', 'option5', 'sample1', '22', 'demo'].map(option => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleMultiSelectChange('name18_c', option)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      formData.name18_c.includes(option)
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {errors.name18_c && (
                <span className="text-red-500 text-sm">{errors.name18_c}</span>
              )}
            </div>

<div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Name19</label>
              <div className="flex flex-wrap gap-2">
                {['sample1', '22', 'demo', 'prathmesh 3'].map(option => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleMultiSelectChange('name19_c', option)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      formData.name19_c.includes(option)
                        ? 'bg-teal-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {errors.name19_c && (
                <span className="text-red-500 text-sm">{errors.name19_c}</span>
              )}
            </div>

<FormField
              label="Phone Number"
              name="name20_c"
              type="tel"
              value={formData.name20_c}
              onChange={handleChange}
              error={errors.name20_c}
placeholder="Enter phone number"
            />

<FormField
              label="Number1"
              name="number1_c"
              type="text"
              value={formData.number1_c}
              onChange={handleChange}
              error={errors.number1_c}
              placeholder="Enter number1"
            />

<div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="number2_c"
                name="number2_c"
                checked={formData.number2_c}
                onChange={handleChange}
                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
              />
              <label htmlFor="number2_c" className="text-sm font-medium text-gray-700">
                Number2
              </label>
              {errors.number2_c && (
                <span className="text-red-500 text-sm">{errors.number2_c}</span>
              )}
            </div>

<FormField
              label="Number3 (Currency)"
              name="number3_c"
              type="text"
              value={formData.number3_c}
              onChange={handleChange}
              error={errors.number3_c}
              placeholder="Enter currency amount (e.g., 1234.56)"
            />

<FormField
              label="Number4"
              name="number4_c"
              type="date"
              value={formData.number4_c}
              onChange={handleChange}
              error={errors.number4_c}
              placeholder="Select date"
            />

<FormField
              label="Number5"
              name="number5_c"
              type="datetime-local"
              value={formData.number5_c}
              onChange={handleChange}
              error={errors.number5_c}
              placeholder="Select date and time"
            />

<FormField
              label="Number6"
              name="number6_c"
              type="number"
              step="0.01"
              value={formData.number6_c}
              onChange={handleChange}
              error={errors.number6_c}
              placeholder="Enter decimal value"
            />

<FormField
              label="Number7"
              name="number7_c"
              type="email"
              value={formData.number7_c}
              onChange={handleChange}
              error={errors.number7_c}
              placeholder="Enter email address"
            />

<div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Number8</label>
              <div className="flex flex-wrap gap-2">
                {['option1', 'option2', 'option3', 'value1', 'value2', 'sample'].map(option => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleMultiSelectChange('number8_c', option)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      formData.number8_c.includes(option)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {errors.number8_c && (
                <span className="text-red-500 text-sm">{errors.number8_c}</span>
              )}
            </div>

<FormField
              label="Number9"
              name="number9_c"
              type="textarea"
              value={formData.number9_c}
              onChange={handleChange}
              error={errors.number9_c}
              placeholder="Enter multiline text for number9"
            />

<FormField
              label="Number10"
              name="number10_c"
              type="tel"
              value={formData.number10_c}
              onChange={handleChange}
              error={errors.number10_c}
              placeholder="Enter phone number"
            />

<FormField
              label="Number11"
              name="number11_c"
              type="select"
              value={formData.number11_c}
              onChange={handleChange}
              error={errors.number11_c}
            >
              <option value="">Select Number11</option>
              <option value="Option A">Option A</option>
              <option value="Option B">Option B</option>
              <option value="Option C">Option C</option>
              <option value="Option D">Option D</option>
            </FormField>

<div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Number12</label>
              <div className="flex flex-col space-y-2">
                {['Option 1', 'Option 2', 'Option 3', 'Option 4'].map(option => (
                  <label key={option} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="number12_c"
                      value={option}
                      checked={formData.number12_c === option}
                      onChange={handleChange}
                      className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary focus:ring-2"
                    />
                    <span className="text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
              {errors.number12_c && (
                <span className="text-red-500 text-sm">{errors.number12_c}</span>
              )}
            </div>

<div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Number13</label>
              <div className="flex flex-wrap gap-2">
                {['tag1', 'tag2', 'tag3', 'option1', 'option2', 'sample', 'demo', 'test'].map(option => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleMultiSelectChange('number13_c', option)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      formData.number13_c.includes(option)
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {errors.number13_c && (
                <span className="text-red-500 text-sm">{errors.number13_c}</span>
              )}
            </div>

            <FormField
              label="Number14"
              name="number14_c"
              type="number"
              value={formData.number14_c}
              onChange={handleChange}
              error={errors.number14_c}
              placeholder="Enter number14"
            />

            <FormField
              label="Number15"
              name="number15_c"
              type="number"
              value={formData.number15_c}
              onChange={handleChange}
              error={errors.number15_c}
              placeholder="Enter number15"
            />

            <FormField
              label="Number16"
              name="number16_c"
              type="number"
              value={formData.number16_c}
              onChange={handleChange}
              error={errors.number16_c}
              placeholder="Enter number16"
            />
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