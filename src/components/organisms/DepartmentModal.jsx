import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import ApperIcon from "@/components/ApperIcon";
import departmentService from "@/services/api/departmentService";

const DepartmentModal = ({ isOpen, onClose, onSuccess }) => {
const [formData, setFormData] = useState({
    Name: "",
    description_c: "",
    head_id_c: "",
    member_count_c: 0,
    Tags: "",
    Owner: "",
    date1_c: ""
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "member_count_c" ? parseInt(value) || 0 : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.Name.trim()) {
      newErrors.Name = "Department name is required";
    }
    
    if (formData.head_id_c && isNaN(parseInt(formData.head_id_c))) {
      newErrors.head_id_c = "Head ID must be a valid number";
    }
    
    if (formData.member_count_c < 0) {
      newErrors.member_count_c = "Member count cannot be negative";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
try {
      const departmentData = {
        Name: formData.Name,
        description_c: formData.description_c,
        head_id_c: formData.head_id_c ? parseInt(formData.head_id_c) : null,
        member_count_c: formData.member_count_c,
        Tags: formData.Tags,
        Owner: formData.Owner,
        date1_c: formData.date1_c
      };
      await departmentService.create(departmentData);
      toast.success("Department created successfully!");
      
      // Reset form
setFormData({
        Name: "",
        description_c: "",
        head_id_c: "",
        member_count_c: 0,
        Tags: "",
        Owner: "",
        date1_c: ""
      });
      
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.message || "Failed to create department");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
setFormData({
        Name: "",
        description_c: "",
        head_id_c: "",
        member_count_c: 0,
        Tags: "",
        Owner: "",
        date1_c: ""
      });
      setErrors({});
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Add Department</h2>
            <button
              onClick={handleClose}
              disabled={loading}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ApperIcon name="X" size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="Name">Department Name *</Label>
              <Input
                id="Name"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                className={errors.Name ? "border-red-500" : ""}
                disabled={loading}
                placeholder="Enter department name"
              />
              {errors.Name && (
                <p className="text-red-500 text-sm mt-1">{errors.Name}</p>
              )}
            </div>

            <div>
              <Label htmlFor="description_c">Description</Label>
              <textarea
                id="description_c"
                name="description_c"
                value={formData.description_c}
                onChange={handleChange}
                disabled={loading}
                placeholder="Enter department description"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <Label htmlFor="head_id_c">Head ID</Label>
              <Input
                id="head_id_c"
                name="head_id_c"
                type="number"
                value={formData.head_id_c}
                onChange={handleChange}
                className={errors.head_id_c ? "border-red-500" : ""}
                disabled={loading}
                placeholder="Enter head employee ID"
              />
              {errors.head_id_c && (
                <p className="text-red-500 text-sm mt-1">{errors.head_id_c}</p>
              )}
            </div>

            <div>
              <Label htmlFor="member_count_c">Member Count</Label>
              <Input
                id="member_count_c"
                name="member_count_c"
                type="number"
                value={formData.member_count_c}
                onChange={handleChange}
                className={errors.member_count_c ? "border-red-500" : ""}
                disabled={loading}
                placeholder="Enter member count"
                min="0"
              />
              {errors.member_count_c && (
                <p className="text-red-500 text-sm mt-1">{errors.member_count_c}</p>
              )}
            </div>

            <div>
              <Label htmlFor="Tags">Tags</Label>
              <Input
                id="Tags"
                name="Tags"
                value={formData.Tags}
                onChange={handleChange}
                disabled={loading}
                placeholder="Enter tags (comma separated)"
              />
            </div>

            <div>
              <Label htmlFor="Owner">Owner</Label>
              <Input
                id="Owner"
                name="Owner"
                value={formData.Owner}
                onChange={handleChange}
                disabled={loading}
                placeholder="Enter owner"
              />
</div>

            <div>
              <Label htmlFor="date1_c">Date1</Label>
              <Input
                id="date1_c"
                name="date1_c"
                type="date"
                value={formData.date1_c}
                onChange={handleChange}
                disabled={loading}
                className="w-full"
              />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="min-w-[100px]"
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </div>
                ) : (
                  "Create Department"
                )}
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default DepartmentModal;