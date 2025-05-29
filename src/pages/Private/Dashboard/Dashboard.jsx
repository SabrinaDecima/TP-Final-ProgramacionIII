import MemberDashboardContent from './MemberDashboardContent';
import SuperAdminDashboardContent from './SuperAdminDashboardContent';
import AdminDashboardContent from './AdminDashboardContent';

const Dashboard = ({ role }) => {
  return (
    <div>
      {role === 'member' && <MemberDashboardContent />}
      {role === 'admin' && <AdminDashboardContent />}
      {role === 'superadmin' && <SuperAdminDashboardContent />}
    </div>
  );
};

export default Dashboard;
