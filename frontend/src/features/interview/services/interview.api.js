import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials:true
})

export const generateInterviewReport = ({jobDescription , selfDescription , resumeFile})=>{
    const formData = new formData()
    formData.append("jobDescription" , jobDescription)
    formData.append("selfDescription" , selfDescription)
    formData.append("resume" , resumeFile);
    const response =  api.post("/api/interview/" , formData,{
        headers:{
            "Content-Type" : 'multipart/form-data'
        }
    })
    return response.data

}



export const getInterviewReportById = (interviewId)=>{
    const response = api.get(`/api/interview/report/${interviewId}`)
    return reponse.data;
}


export const getAllInterview = ()=>{
    const response = api.get('/api/interview');
    return response.data
}