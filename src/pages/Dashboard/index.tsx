import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import Overview from './Overview';
import Domains from './Domains';
import Orders from './Orders';
import Profile from './Profile';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/domains" element={<Domains />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </DashboardLayout>
  );
}