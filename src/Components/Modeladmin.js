import axios from 'axios'
let Modeladmin=()=> {
    let token = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    };
    axios.get("http://localhost:8000/admin",token)
    .then(res=>{
        return res.data.admin
    })
}
exports= {Modeladmin}