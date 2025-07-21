import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import DepartmentGrid from "@/components/organisms/DepartmentGrid";
import DepartmentModal from "@/components/organisms/DepartmentModal";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import departmentService from "@/services/api/departmentService";
import employeeService from "@/services/api/employeeService";
const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadDepartments();
    loadEmployees();
  }, []);

  const loadDepartments = async () => {
    setLoading(true);
    setError("");
    
    try {
      const data = await departmentService.getAll();
      setDepartments(data);
    } catch (err) {
      setError("Failed to load departments");
    } finally {
      setLoading(false);
    }
  };

  const loadEmployees = async () => {
    try {
      const data = await employeeService.getAll();
      setEmployees(data);
    } catch (err) {
      console.error("Failed to load employees:", err);
    }
  };

const handleAddDepartment = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSuccess = () => {
    loadDepartments();
  };

  const handleEditDepartment = (department) => {
    toast.info("Edit Department feature coming soon!");
  };

  const handleDeleteDepartment = async (department) => {
    if (window.confirm(`Are you sure you want to delete the ${department.name} department?`)) {
      try {
        await departmentService.delete(department.Id);
        toast.success("Department deleted successfully");
        loadDepartments();
      } catch (error) {
        toast.error("Failed to delete department");
      }
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadDepartments} />;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold gradient-text">Departments</h1>
          <p className="text-gray-600 mt-1">Organize your team structure</p>
        </div>
        <Button onClick={handleAddDepartment} className="w-full sm:w-auto">
          <ApperIcon name="Building" size={16} className="mr-2" />
          Add Department
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {departments.length > 0 ? (
          <DepartmentGrid
            departments={departments}
            employees={employees}
            onEdit={handleEditDepartment}
            onDelete={handleDeleteDepartment}
          />
        ) : (
          <Empty
            title="No departments found"
            message="Create your first department to organize your team structure."
            actionLabel="Add Department"
            onAction={handleAddDepartment}
            icon="Building"
          />
)}
      </motion.div>

      <DepartmentModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
};

export default Departments;