import axios from 'axios'
const Modelbuku = (token)=> {
    let data={
        buku:[]
    }
    axios.get("http://localhost:8000/book/getbook",token)
    .then(res=>{
        data.buku=res.data.buku
    })
    return data
}
export default Modelbuku