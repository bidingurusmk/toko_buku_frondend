import { useState } from 'react'
import axios from 'axios'
import { Toast } from 'bootstrap'
import {useNavigate} from 'react-router-dom'
export default function Login() {
    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")
    let [message, setMessage] = useState("")
    let navigate = useNavigate()
    let prosesLogin = (event) => {
        event.preventDefault()
        let dataLogin = {
            username: username,
            password: password
        }
        console.log(dataLogin)
        axios.post("http://localhost:8000/auth", dataLogin)
            .then(response => {
                if (response.data.login_status == true) {
                    showToast('Sukses login')
                    localStorage.setItem("token",response.data.token)
                    setTimeout(()=>{
                        navigate('/',{replace:true})
                    },2000)
                } else {
                    showToast('Gagal login, username dan password salah')
                }
                console.log(response)
            })
    }
    let showToast = (message) => {
        let myToast = new Toast(
            document.getElementById(`myToast`),
            {
                autohide: true
            }
        )
        /** perintah utk mengisi state 'message' */
        setMessage(message)
        /** show Toast */
        myToast.show()
    }
    return (
        <div>
            {/* start component Toast */}
            <div className="position-fixed top-0 end-0 p-3"
                style={{ zIndex: 11 }}>
                <div className="toast bg-light" id="myToast">
                    <div className="toast-header bg-info text-white">
                        <strong>Message</strong>
                    </div>
                    <div className="toast-body">
                        {message}
                    </div>
                </div>
            </div>
            {/* end component Toast */}
            <div className="vw-100 vh-100 d-flex justify-content-center align-items-center">
                <div className="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <form onSubmit={prosesLogin}>
                                <h3 className="text-center">Toko Buku</h3>
                                username:
                                <input type="text" name="username" onChange={event => setUsername(event.target.value)} className="form-control mb-2" />

                                password:
                                <input type="password" name="password" onChange={event => setPassword(event.target.value)} className="form-control mb-4" />
                                <button className="btn btn-success">LOGIN</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}