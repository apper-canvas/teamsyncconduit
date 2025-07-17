import Badge from "@/components/atoms/Badge";

const StatusBadge = ({ status }) => {
  const statusConfig = {
    active: { variant: "success", text: "Active" },
    inactive: { variant: "warning", text: "Inactive" },
    terminated: { variant: "danger", text: "Terminated" },
    present: { variant: "success", text: "Present" },
    absent: { variant: "danger", text: "Absent" },
    late: { variant: "warning", text: "Late" },
    leave: { variant: "info", text: "On Leave" }
  };

  const config = statusConfig[status] || statusConfig.active;

  return <Badge variant={config.variant}>{config.text}</Badge>;
};

export default StatusBadge;