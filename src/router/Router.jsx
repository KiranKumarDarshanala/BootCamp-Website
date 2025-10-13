import { createBrowserRouter } from "react-router-dom"
import Registration from "../component/Registration"
import DisplayBootCamps from "../component/DisplayBootCamps"
import AddBootCamp from "../component/CreateBootCamp"
import DisplayCources from "../component/DisplayCources"
import AddCources from "../component/CreateCources"
import Login from "../component/Login"
import UnknownLink from "../component/UnknownLink"
import App from "../App"
import EditBootCamp from "../component/EditBootCamp"
import EditCource from "../component/EditCource"
import CreateCources from "../component/CreateCources"
import Layout from "../component/Layout"
import CourseProfile from "../component/CourseProfile"
import UserProfile from "../component/UserProfile"
import PrivateRoute from "../helper/PrivateRoute"
import BootCampProfile from "../component/BootCampProfile"

let routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element:<Login />, 
            },
            {
                path: "/register",
                element: <Registration />,

            },
            {
                path: "/layout",
                element: <Layout />,
                children: [
                    {
                        index:true,
                        element: <DisplayBootCamps />
                    },
                    {
                        path: "/layout/addBootCamp",
                        element: <PrivateRoute>
                            <AddBootCamp />
                        </PrivateRoute>
                    },
                    {
                        path: "/layout/displayCources",
                        element: <DisplayCources />
                    },
                    {
                        path: "/layout/addCources",
                        element: <PrivateRoute>
                            <CreateCources />
                        </PrivateRoute>
                    },
                    {
                        path: "/layout/editBootCamp",
                        element: <PrivateRoute>
                            <EditBootCamp/>
                        </PrivateRoute>
                    },
                    {
                        path: "/layout/editCource",
                        element: <PrivateRoute>
                            <EditCource />
                        </PrivateRoute>
                    },
                    {
                        path: "/layout/displayCources/courseProfile",
                        element: <CourseProfile />
                    },
                    {
                        path: "/layout/Profile",
                        element: <UserProfile />
                    },
                ]
            },
            {
                path: "*",
                element: <UnknownLink />
            },
        ]
    },

])

export default routes;