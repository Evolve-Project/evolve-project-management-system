import DashboardAdmin from "@/components/Admin/Dashboard";
import DashboardMentee from "@/components/Mentee/Dashboard";
import DashboardMentor from "@/components/Mentor/Dashboard";
import Layout from "@/components/layout/layout"
import { useSelector } from "react-redux";

const Dashboard = () => {

    const role = useSelector(state => state.auth.role);

    switch (role) {
        case 'admin':
            return (
                <Layout>
                    <DashboardAdmin />
                </Layout>
            );
        case 'mentor':
            return (
                <Layout>
                    <DashboardMentor />
                </Layout>
            );
        case 'mentee':
            return (
                <Layout>
                    <DashboardMentee />
                </Layout>
            );
        default:
            return (
                <Layout>
                    <div>Error: Unknown role</div>
                </Layout>
            );
    }

}

export default Dashboard
