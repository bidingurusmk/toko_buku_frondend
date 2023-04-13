import React, {Component} from "react"
import Navbar from '../Components/Navbar'
class Contact extends Component{
    render(){
        return(
            <div>
                <Navbar />
            <div className="container">
                <div className="alert alert-warning">
                    Ini adalah Halaman Contact
                </div>
            </div>
            </div>
        )
    }
}
export default Contact;
