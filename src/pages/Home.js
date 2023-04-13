import React, {Component} from "react"
import Navbar from '../Components/Navbar'
class Home extends Component{
    render(){
        return(
            <div>
                <Navbar />
                <div className="container">
                    <div className="alert alert-success">
                        Ini adalah Halaman Home
                    </div>
                </div>
            </div> 
            
        )
    }
}
export default Home;
