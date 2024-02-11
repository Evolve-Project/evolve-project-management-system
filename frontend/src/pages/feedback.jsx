import MentorFeedback from "./Mentor/Feedback";
import MenteeFeedback from "./Mentee/Feedback";
import Layout from "@/components/layout/layout"
import { useSelector } from "react-redux";

const Feedback = () => {

    const role = useSelector(state => state.auth.role);

    switch (role) {
        case 'admin':
            return (
                <Layout>
                    Admin page feedback
                </Layout>
            );
        case 'mentor':
            return (
                <Layout>
                    <MentorFeedback/>
                </Layout>
            );
        case 'mentee':
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
