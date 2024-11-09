import { useDispatch } from "react-redux";
import { addIncompleteCourses } from "../src/redux/courseSlice";
import { addUserInfo } from "../src/redux/userSlice";

function useGetUserInfo() {
    let dispatch = useDispatch();

    let handleUserInfo = async()=>{
        
        let res = await fetch("http://localhost:3000/api/courses");
        let student= await fetch("http://localhost:3000/api/auth/");
        let incompleteCourses =await  res.json();
        let studentData = await student.json();
        console.log(incompleteCourses.incompleteCourses);
        dispatch(addIncompleteCourses(incompleteCourses.incompleteCourses));
        dispatch(addUserInfo(studentData));

    }

    return handleUserInfo;
}

export default useGetUserInfo