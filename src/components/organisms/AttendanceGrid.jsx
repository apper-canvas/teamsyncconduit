import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import StatusBadge from "@/components/molecules/StatusBadge";
import ApperIcon from "@/components/ApperIcon";
import { format } from "date-fns";

const AttendanceGrid = ({ attendance, employees }) => {
  const getEmployeeName = (employeeId) => {
    const employee = employees.find(emp => emp.Id === employeeId);
    return employee ? `${employee.firstName} ${employee.lastName}` : "Unknown Employee";
  };

  const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    return format(new Date(timeString), "h:mm a");
  };

  return (
    <Card className="bg-gradient-to-br from-white to-gray-50">
      <CardHeader>
        <CardTitle className="flex items-center">
          <ApperIcon name="Clock" size={20} className="mr-2" />
          Daily Attendance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Employee</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Clock In</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Clock Out</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Hours</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((record, index) => {
                const clockInTime = new Date(record.clockIn);
                const clockOutTime = record.clockOut ? new Date(record.clockOut) : null;
                const hoursWorked = clockOutTime ? 
                  ((clockOutTime - clockInTime) / (1000 * 60 * 60)).toFixed(1) : 
                  "In Progress";

                return (
                  <tr
                    key={record.Id}
                    className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent transition-all duration-200"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                          <ApperIcon name="User" size={14} className="text-white" />
                        </div>
                        <span className="font-medium text-gray-900">
                          {getEmployeeName(record.employeeId)}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-900">
                        {format(new Date(record.date), "MMM dd, yyyy")}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-900">{formatTime(record.clockIn)}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-900">{formatTime(record.clockOut)}</span>
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={record.status} />
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-900 font-medium">
                        {hoursWorked === "In Progress" ? hoursWorked : `${hoursWorked}h`}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceGrid;