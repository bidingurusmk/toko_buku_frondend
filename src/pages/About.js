import React, { Component } from "react"
import Navbar from '../Components/Navbar'


class About extends Component {
   
    render() {
        return (
            <div>
                <Navbar />
                <div className="container">
                    <div className="alert alert-primary">
                        Ini adalah Halaman Tentang kami
                    </div>
                </div>
            </div>
        )
    }
}
export default About;
