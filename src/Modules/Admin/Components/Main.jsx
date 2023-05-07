import { Route, Routes } from "react-router-dom";
import OverviewDashboard from "./OverviewDashboard";
import StaffsDashboard from "./StaffsDashboard";
import { useState } from "react";

const data = {
  firstName: "yona",
  lastName: "add",
  email: "asda@sdasd",
  password: "**********"
}

function Main({setNotifications, notifications}) {
  return (
    <div>
        <Routes>
            <Route path='/' element={<OverviewDashboard />}></Route>
            <Route path='/officers' element={<StaffsDashboard setNotifications={setNotifications} notifications={notifications}/>}></Route>
        </Routes>
    </div>
  );
}
export default Main;