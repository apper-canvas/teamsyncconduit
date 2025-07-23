import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import AttendanceGrid from "@/components/organisms/AttendanceGrid";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import attendanceService from "@/services/api/attendanceService";
import employeeService from "@/services/api/employeeService";
const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAttendance();
    loadEmployees();
  }, []);

  const loadAttendance = async () => {
    setLoading(true);
    setError("");
    
    try {
      const data = await attendanceService.getAll();
      setAttendance(data);
    } catch (err) {
      setError("Failed to load attendance data");
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

  const handleClockIn = () => {
    toast.info("Clock In feature coming soon!");
  };

  const handleGenerateReport = () => {
    toast.info("Generate Report feature coming soon!");
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadAttendance} />;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold gradient-text">Attendance</h1>
          <p className="text-gray-600 mt-1">Track employee attendance and hours</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={handleGenerateReport} className="w-full sm:w-auto">
            <ApperIcon name="FileText" size={16} className="mr-2" />
            Generate Report
          </Button>
          <Button onClick={handleClockIn} className="w-full sm:w-auto">
            <ApperIcon name="Clock" size={16} className="mr-2" />
            Clock In
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {attendance.length > 0 ? (
          <AttendanceGrid
            attendance={attendance}
            employees={employees}
          />
        ) : (
          <Empty
            title="No attendance records found"
            message="Start tracking attendance by having employees clock in."
            actionLabel="Clock In"
            onAction={handleClockIn}
            icon="Clock"
          />
        )}
      </motion.div>
    </div>
  );
};

export default Attendance;