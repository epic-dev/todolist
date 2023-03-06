import { Link } from "react-router-dom";
import { Layout } from "./shared/components";

export const PageNotFound = () => {
    return <Layout>
        <div style={{ textAlign: 'center', paddingTop: '20px', color: 'white'}}>Route not found :( <Link to={'/'}>go home</Link></div>
    </Layout>
};