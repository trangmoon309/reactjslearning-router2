import PageContent from "../components/PageContent";
import { useRouteError } from "react-router-dom";

function ErrorPage(){
    const error = useRouteError();
    return (
        <>
            <PageContent title="An Error Occur!">
                <p>{error.data.message}</p>
            </PageContent>
        </>
    )
}

export default ErrorPage;