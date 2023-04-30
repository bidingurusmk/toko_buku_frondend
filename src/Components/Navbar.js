import {useState,useEffect} from "react"
import {Link, useNavigate} from "react-router-dom"
import axios from 'axios'


function Navbar () 
    {
        const navigate = useNavigate();
        const [user,setUser]=useState([]);
        const token = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        };
        const getDataUser=()=>{
            axios.get("http://localhost:8000/auth/getuserdata",token)
            .then(response=>{
                setUser(response.data.data)
            })
            .catch(err=>{
    
            })
        }
        useEffect(() => {
            if(localStorage.getItem('token')==null){
                navigate('/login', { replace: true })
            }
            getDataUser()
        }, [])
        let logout=()=>{
            localStorage.removeItem("token")
            setTimeout(()=>{
                navigate("/login",{replace:true})
            },1000)
        }
        return(
            <div className="navbar navbar-expand-lg bg-primary navbar-light">
                <a className="navbar-brand" href="#">
                    Single Page Application
                </a>

                {/* show and hide menu */}
                <button className="navbar-toggler" data-toggle="collapse"
                data-target="#menu">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* menu */}
                <div id="menu" className="navbar-collapse collpase">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className="nav-link">
                                About Us
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin" className="nav-link">
                                Admin
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/gallery" className="nav-link">
                                Gallery
                            </Link>
                        </li>
                        {user.role=="petugas"&&(
                            <>
                                <li className="nav-item">
                                    <Link to="/buku" className="nav-link">
                                        Buku
                                    </Link>
                                </li>
                            </>
                        )}
                        {user.role=="admin"&&(
                            <>
                                <li className="nav-item">
                                    <Link to="/transaksi" className="nav-link">
                                        Transaksi
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/laporan" className="nav-link">
                                        Laporan
                                    </Link>
                                </li>
                            </>
                        )}
                        
                        <li className="nav-item">
                            <Link onClick={logout} className="nav-link">
                                Logout
                            </Link>
                        </li>
                    </ul>
                    <span class="navbar-text alert alert-success" style={{padding:'5px',margin:'4px'}}>
                    {user.nama_admin}
                    </span>
                </div>
            </div>
        )
    }
export default Navbar;
