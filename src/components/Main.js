import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import AddForm from './AddForm'
import EditForm from './EditForm'

class Main extends React.Component{
  render(){
    return(
      <main>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/AddData' component={AddForm}/>
          <Route exact path='/EditData/:id' component={EditForm}/>
        </Switch>
      </main>
    );
  }
}

export default Main
