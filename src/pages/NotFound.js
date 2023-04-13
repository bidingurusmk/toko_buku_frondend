import React, {Component} from "react"
import Navbar from '../Components/Navbar'
class NotFound extends Component{
    render(){
        return(
            <div>
                <Navbar />
            <div className="container">
                <div className="alert alert-success">
                   notfound
                </div>
            </div>
            </div>
        )
    }
}
export default NotFound;
