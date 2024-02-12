import MentorFeedback from "./Mentor/Feedback";
import MenteeFeedback from "./Mentee/Feedback";
import Layout from "@/components/layout/layout"
import { useSelector } from "react-redux";

const Feedback = () => {

    const role = useSelector(state => state.auth.role);

    switch (role) {
        case 'Admin':
            return (
                <Layout>
                    Admin page feedback
                </Layout>
            );
        case 'Mentor':
            return (
                <Layout>
                    <MentorFeedback/>
                </Layout>
            );
        case 'Mentee':
            return (
                <Layout>
                    
                    <MenteeFeedback/>
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

export default Feedback;
