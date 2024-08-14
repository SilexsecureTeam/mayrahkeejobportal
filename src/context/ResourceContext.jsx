import { createContext, useContext, useEffect, useState } from "react";
// import { getItemByPost, getItemFunc, getTimeTable } from "../components/utils/getApi";
import { AuthContext } from "./AuthContex";
import { getItemFunc, getUpdatedUser } from "../utils/getApi";

export const ResourceContext = createContext();

function ResourceContextProvider({ children }) {

    const { authDetails } = useContext(AuthContext);
    const token = authDetails?.token ? authDetails.token : null;
    const userId = authDetails?.user?.id;
    const [widgetOpen, setWidgetOpen] = useState({
        backgroundColor: "rgba(0, 0, 0, 0.15)",
        display: "block"
    })
    const [checker, setChecker] = useState(true);
    const [errorMesage, setErrorMessage] = useState('');

    const [meetingTitle, setMeetingTitle] = useState('');

    const [getCandidate, setGetCandidate] = useState({
        data: null,
        isDataNeeded: false,
    });

    const [getAllJobs, setGetAllJobs] = useState({
        data: null,
        isDataNeeded: false,
    });

    const [getAllApplications, setGetAllApplications] = useState({
        data: null,
        isDataNeeded: false,
    });



    //Users Resource useEffect
    useEffect(() => {
        setErrorMessage('');
        if (getCandidate.isDataNeeded) {
            const endPoint = `/candidate/getCandidate/${userId}`
            const dataArray = "candidateAuth"
            getUpdatedUser(token, setGetCandidate, setErrorMessage, endPoint, dataArray, setChecker)
        }
    }, [getCandidate.isDataNeeded]);

    // Get All Jobs
    useEffect(() => {
        setErrorMessage('');
        if (getAllJobs.isDataNeeded) {
            const endPoint = "/job";
            const dataArray = null;
            getItemFunc(token, setGetAllJobs, setErrorMessage, endPoint, dataArray)
        }
    }, [getAllJobs.isDataNeeded]);

    // Get All Application
    useEffect(() => {
        setErrorMessage('');
        if (getAllApplications.isDataNeeded) {
            const endPoint = `/getUserApply/${userId}`;
            const dataArray = "job_application"
            getItemFunc(token, setGetAllApplications, setErrorMessage, endPoint, dataArray)
        }
    }, [getAllApplications.isDataNeeded]);



    return (
        <ResourceContext.Provider
            value={{
                checker,
                setChecker,
                errorMesage,
                meetingTitle,
                setMeetingTitle,
                getCandidate,
                setGetCandidate,
                getAllJobs,
                setGetAllJobs,
                getAllApplications,
                setGetAllApplications,
            }}
        >
            {children}
        </ResourceContext.Provider>
    )
}

export default ResourceContextProvider
