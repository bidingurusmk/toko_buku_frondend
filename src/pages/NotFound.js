import React, {Component} from "react"
import Navbar from '../Components/Navbar'
function NotFound (){
        return(
            <div>
                <Navbar />
            <div className="container">
                <div className="alert alert-success">
                   Page not found
                </div>
            </div>
            </div>
        )
    }
export default NotFound;
