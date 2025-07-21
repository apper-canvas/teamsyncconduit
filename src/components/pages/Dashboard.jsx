import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import StatCard from "@/components/molecules/StatCard";
import EmployeeTable from "@/components/organisms/EmployeeTable";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import employeeService from "@/services/api/employeeService";
import departmentService from "@/services/api/departmentService";
import { attendanceService } from "@/services/api/attendanceService";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    setError("");
    
    try {
      const [employeeData, departmentData, attendanceData] = await Promise.all([
        employeeService.getAll(),
        departmentService.getAll(),
        attendanceService.getAll()
      ]);
      
      setEmployees(employeeData);
      setDepartments(departmentData);
      setAttendance(attendanceData);
    } catch (err) {
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const getAttendanceStats = () => {
const today = new Date().toISOString().split("T")[0];
    const todayAttendance = attendance.filter(record => record.date_c === today);
    
    const totalEmployees = employees.length;
    const presentToday = todayAttendance.filter(record => record.status_c === "present").length;
    const absentToday = todayAttendance.filter(record => record.status_c === "absent").length;
    const lateToday = todayAttendance.filter(record => record.status_c === "late").length;
    
    const attendanceRate = totalEmployees > 0 ? ((presentToday / totalEmployees) * 100).toFixed(1) : 0;
    
    return {
      totalEmployees,
      presentToday,
      absentToday,
      lateToday,
      attendanceRate
    };
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadDashboardData} />;

const stats = getAttendanceStats();
  const activeEmployees = employees.filter(emp => emp.status_c === "active").length;
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold gradient-text">Dashboard</h1>
          <p className="text-gray-600 mt-1">Overview of your team and attendance</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <StatCard
          title="Total Employees"
          value={employees.length}
          icon="Users"
          trend="up"
          trendValue={`${activeEmployees} active`}
        />
        
        <StatCard
          title="Present Today"
          value={stats.presentToday}
          icon="UserCheck"
          trend="up"
          trendValue={`${stats.attendanceRate}% rate`}
        />
        
        <StatCard
          title="Departments"
          value={departments.length}
          icon="Building"
          trend="up"
          trendValue="All active"
        />
        
        <StatCard
          title="Attendance Rate"
          value={`${stats.attendanceRate}%`}
          icon="Clock"
          trend={stats.attendanceRate > 80 ? "up" : "down"}
          trendValue="Today"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {employees.length > 0 ? (
          <EmployeeTable
            employees={employees.slice(0, 10)}
            departments={departments}
            onEdit={() => {}}
            onRefresh={loadDashboardData}
          />
        ) : (
          <Empty
            title="No employees found"
            message="Start by adding your first employee to the system."
            actionLabel="Add Employee"
            onAction={() => {}}
            icon="UserPlus"
          />
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;