import React from 'react'
import HomeContent from './HomePart/HomeContent'
import { Link } from 'react-router-dom'

class Home extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      data: [],
    };
  }

  componentDidMount(){
    const urlFetch = fetch('https://simple-contact-crud.herokuapp.com/contact');

    urlFetch.then(res => res.json())
    .then(json => {
      this.setState({
        isLoaded: true,
        data: json.data,
      });
    });
  }

  render(){
    if(!this.state.isLoaded){
      return(
        <div>Loading...</div>
      );
    }else{
      return(

        <div>
          <Link to='/AddData'>
            <button>Create Data</button>
          </Link>
          <HomeContent data={this.state.data} />
        </div>
      );
    }
  }
}

export default Home
