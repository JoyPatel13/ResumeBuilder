import { useState, createContext } from "react"

export const InterviewContext = createContext()

export const InterviewProvider = ({children}) =>{
    const [ loadinb, setLoadingS] = useState(false);
     const [report, setReport] = useState(null);

     return(
        <InterviewContext.Provider value={{loading,setLoading , report, setReport}}>
            {children}
        </InterviewContext.Provider>
     )
}