import React from 'react'

class AddForm extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      age: 0,
      photo: "",
    };
    this.addData = this.addData.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

    // alert(name+" "+value)

  }

  addData(event){

    event.preventDefault();
    const addDataApi = fetch('https://simple-contact-crud.herokuapp.com/contact', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        age: Number(this.state.age),
        photo: this.state.photo,
      })
    });

    addDataApi.then(res => res.json())
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
      <div>
        <form onSubmit={this.addData}>
          <div>
            <label>First Name</label><br/>
            <input type="text" name="firstName" onChange={this.handleInputChange}/>
          </div>
          <div>
            <label>Last Name</label><br/>
            <input type="text" name="lastName" onChange={this.handleInputChange}/>
          </div>
          <div>
            <label>Age</label><br/>
            <input type="text" name="age" onChange={this.handleInputChange}/>
          </div>
          <div>
            <label>Photo</label><br/>
            <input type="text" name="photo" onChange={this.handleInputChange}/>
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }
}

export default AddForm
