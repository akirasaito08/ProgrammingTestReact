import React from 'react'
import Style from './../../css/style.css'
import { Link } from 'react-router-dom'

class HomeContent extends React.Component{

  constructor(props){
    super(props);
    this.deleteData = this.deleteData.bind(this);
  }

  deleteData(id, event){
    const deleteDataApi = fetch('https://simple-contact-crud.herokuapp.com/contact/'+id, {
      method: 'DELETE'
    });

    deleteDataApi.then(res => res.json())
    .then(json => {
        this.setState({
        message: json.message,
      });
      alert(this.state.message)
      this.props.history.push('/')
    });
  }

  render(){
    return(
      <table className="person">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {this.props.data.map(datas => (
            <tr>
              <td>{datas.firstName}</td>
              <td>{datas.lastName}</td>
              <td>{datas.age}</td>
              <td><img width="200" src={datas.photo}/></td>
              <td>
                <Link to={'/EditData/'+datas.id}><button>Edit</button></Link>
                <button onClick={(e) => this.deleteData(datas.id, e)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default HomeContent
