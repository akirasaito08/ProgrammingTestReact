import React from 'react'

class EditForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      age: 0,
      photo: "",
      id: props.match.params.id,
      message: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  componentDidMount(){
    const urlFetch = fetch('https://simple-contact-crud.herokuapp.com/contact/'+this.state.id);

    urlFetch.then(res => res.json())
    .then(json => {
      this.setState({
        isLoaded: true,
        firstName: json.data.firstName,
        lastName: json.data.lastName,
        age: json.data.age,
        photo: json.data.photo,
      });
    });
  }

  handleInputChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

  }

  updateData(event){
    event.preventDefault();
    const updateDataApi = fetch('https://simple-contact-crud.herokuapp.com/contact/'+this.state.id, {
      method: 'PUT',
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

    updateDataApi.then(res => res.json())
    .then(json => {
        this.setState({
        message: json.message,
      });
      alert(this.state.message)
      this.props.history.push('/')
    });
  }

  render(){
    if(this.state.isLoaded){
      return(
        <div>
          <form onSubmit={this.updateData}>
            <div>
              <label>First Name</label><br/>
              <input type="text" name="firstName" onChange={this.handleInputChange} defaultValue={this.state.firstName}/>
            </div>
            <div>
              <label>Last Name</label><br/>
              <input type="text" name="lastName" onChange={this.handleInputChange} defaultValue={this.state.lastName}/>
            </div>
            <div>
              <label>Age</label><br/>
              <input type="text" name="age" onChange={this.handleInputChange} defaultValue={this.state.age}/>
            </div>
            <div>
              <label>Photo</label><br/>
              <input type="text" name="photo" onChange={this.handleInputChange} defaultValue={this.state.photo}/>
            </div>
            <button type="submit">Save</button>
          </form>
        </div>
      );
    }
    else{
      return(
        <div>Loading...</div>
      );
    }

  }
}

export default EditForm
