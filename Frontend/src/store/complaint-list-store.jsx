import { createContext, useReducer } from "react";

export const ComplaintsList = createContext({
    complaintList: [],
    addComplaint: () => { },
    deleteComplaint : () => { }, 
});

const complaintListReducer = (currComplaintList, action) => {
    let newComplaintList = currComplaintList;
    if (action.type === "DELETE_POST") {
        newComplaintList = currComplaintList.filter((complaintId) => {
            return complaintId.id !== action.payload.id;
        })
    }else if(action.type === "ADD_POST"){
        newComplaintList = [action.payload, ...currComplaintList]
    }
    return newComplaintList;
}

const ComplaintsListProvider = ({ children }) => {
    const [complaintList, dispatchpostlist] = useReducer(complaintListReducer, []);

    const addComplaint = (formData) => {
        console.log(formData);
        dispatchpostlist({
            type: "ADD_POST",
            payload:{
                ...formData,
                id: Date.now(),
            },
        });
    }

    const deleteComplaint = (postId) => {
        dispatchpostlist({
            type: "DELETE_POST",
            payload: {
                id,
            },
        });
    };

    return <ComplaintsList.Provider value={
        {
            complaintList,
            addComplaint,
            deleteComplaint,
        }
    }>{children}</ComplaintsList.Provider>
}

export default ComplaintsListProvider