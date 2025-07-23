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
    name1_c: "",
    name2_c: false,
checkbox1_c: false,
    boolean1_c: "",
    boolean2_c: false,
    date1_c: "",
    decimal1_c: 0,
    decimal2_c: "",
    multilinetext1_c: "",
name11_c: 0,
    autonumber1_c: "",
    sample1_c: 0,
    sample2_c: 0,
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
        name1_c: employee.name1_c || "",
        name2_c: employee.name2_c || false,
checkbox1_c: employee.checkbox1_c || false,
        boolean1_c: employee.boolean1_c || "",
        boolean2_c: employee.boolean2_c || false,
        date1_c: employee.date1_c || "",
        decimal1_c: employee.decimal1_c || 0,
        decimal2_c: employee.decimal2_c || "",
        multilinetext1_c: employee.multilinetext1_c || "",
name11_c: employee.name11_c || 0,
        autonumber1_c: employee.autonumber1_c || "",
        sample1_c: parseInt(employee.sample1_c) || 0,
        sample2_c: parseInt(employee.sample2_c) || 0,
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
    if (formData.date1_c && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.date1_c)) {
      newErrors.date1_c = "Please enter a valid email address";
    }
    
setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
try {
// Format data properly for database submission according to field types
const submitData = {
        ...formData,
        // Email fields - send null instead of empty string for validation
        email_c: formData.email_c && formData.email_c.includes('@') ? formData.email_c : null,
        // Date fields - ensure proper ISO format (YYYY-MM-DD) 
        hire_date_c: formData.hire_date_c || null,
        name1_c: formData.name1_c || null, // Date type field
boolean1_c: formData.boolean1_c || null, // This is actually a Date field type
        // Email fields - date1_c is Email type, send as string
date1_c: formData.date1_c || null,
        // Decimal fields - convert to proper decimal format
        decimal1_c: formData.decimal1_c ? parseInt(formData.decimal1_c) || null : null,
        decimal2_c: formData.decimal2_c ? parseFloat(formData.decimal2_c) || null : null,
        // Number fields - convert to proper integer format
        sample1_c: formData.sample1_c ? parseInt(formData.sample1_c) || null : null,
        sample2_c: formData.sample2_c ? parseInt(formData.sample2_c) || null : null,
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
      name1_c: "",
      name2_c: false,
checkbox1_c: false,
      boolean1_c: "",
      boolean2_c: false,
      date1_c: "",
      decimal1_c: 0,
      decimal2_c: "",
multilinetext1_c: "",
      name11_c: 0,
      autonumber1_c: "",
      sample1_c: 0,
      sample2_c: 0,
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
              {departments.map((dept, index) => (
                <option key={dept.Id || `dept-${index}`} value={dept.Id}>{dept.Name}</option>
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
<FormField
              label="Checkbox1"
              name="checkbox1_c"
              type="checkbox"
              checked={formData.checkbox1_c}
              onChange={handleChange}
              error={errors.checkbox1_c}
            />

<FormField
              label="Boolean1"
              name="boolean1_c"
              type="date"
              value={formData.boolean1_c}
              onChange={handleChange}
              error={errors.boolean1_c}
            />

<FormField
              label="Name2"
              name="name2_c"
              type="checkbox"
              checked={formData.name2_c}
              onChange={handleChange}
              error={errors.name2_c}
            />

            <FormField
              label="Boolean2"
              name="boolean2_c"
              type="checkbox"
              checked={formData.boolean2_c}
              onChange={handleChange}
              error={errors.boolean2_c}
            />

<FormField
              label="Date1"
              name="date1_c"
type="email"
              value={formData.date1_c}
              onChange={handleChange}
              error={errors.date1_c}
              placeholder="Enter email address"
            />

<div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Rating
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, decimal1_c: star }))}
                    className="transition-colors hover:scale-110 transform"
                  >
                    <ApperIcon
                      name="Star"
                      size={24}
                      className={`${
                        star <= formData.decimal1_c
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300 hover:text-yellow-200"
                      }`}
                    />
                  </button>
                ))}
                <span className="text-sm text-gray-600 ml-3">
                  {formData.decimal1_c}/5
                </span>
              </div>
              {errors.decimal1_c && (
                <p className="text-sm text-red-600">{errors.decimal1_c}</p>
              )}
            </div>

            <FormField
              label="Decimal2"
              name="decimal2_c"
              type="number"
              step="0.01"
              value={formData.decimal2_c}
              onChange={handleChange}
              error={errors.decimal2_c}
placeholder="Enter decimal value"
/>

            <FormField
              label="Name1"
              name="name1_c"
              type="date"
              value={formData.name1_c}
              onChange={handleChange}
              error={errors.name1_c}
            />

<FormField
              label="Multilinetext1"
              name="multilinetext1_c"
              type="text"
              value={formData.multilinetext1_c}
              onChange={handleChange}
              error={errors.multilinetext1_c}
              placeholder="Enter text"
            />

<FormField
              label="Name11"
              name="name11_c"
              type="number"
              value={formData.name11_c}
              onChange={handleChange}
              error={errors.name11_c}
              placeholder="Enter numeric value"
            />

<FormField
              label="Autonumber1"
              name="autonumber1_c"
              type="date"
              value={formData.autonumber1_c}
              onChange={handleChange}
              error={errors.autonumber1_c}
            />

<FormField
              label="Sample1"
              name="sample1_c"
              value={formData.sample1_c}
              onChange={handleChange}
              error={errors.sample1_c}
              placeholder="Enter sample1 value"
            />

<FormField
              label="Sample2"
              name="sample2_c"
              type="number"
              value={formData.sample2_c}
              onChange={handleChange}
              error={errors.sample2_c}
              placeholder="Enter numeric value"
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