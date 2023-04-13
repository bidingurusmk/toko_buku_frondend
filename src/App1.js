import React,{Component} from 'react';
import gambar from './hub.jpeg';
import './App.css';
import Alert from './Components/Alert'
import Media from './Components/Media'

class App extends Component {
  
  render(){
    return (
      <div className="App container">
        <h3 className="text-danger alert alert-success">
        saya belajar React</h3>
        <p>asyik juga</p> 
        <img src={gambar} width="400" />
        <Alert type="danger" header="belajar react">kita disini belajar react</Alert>
        <Alert type="success" header="belajar nodehs">kita disini belajar nodejs</Alert>
        <Media image="gambar1.jpeg" title="React Js" type="info">
            Framework untuk FrontEnd Development
        </Media>

      </div>
    );
  }
}

export default App;
