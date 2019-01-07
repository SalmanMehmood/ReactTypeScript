import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import ApiRender from './components/ApiRender';
import ItemDetails from './components/Details'
// import { Debugger } from 'ts-debug';
// const Config = { isProd: false };
// const debug = new Debugger(console, !Config.isProd, '[DEBUG] ');


type Props = Partial<{}>

class App extends React.Component<Props> {

  public render() {
    return (
      <Router>
        <div>
          <Route exact={true} path='/' component={ApiRender}/>
          <Route path='/details/:_id' component={ItemDetails}/>
        </div>
      </Router>
    );
  }
}

export default App;













        {/* <input type="text" onChange={this.getValue} value={this.state._id} placeholder="Search By Uid....."/>
        <input type="submit" value="Search" onClick={this.showVal}/>
        <input type="text" onChange={this.getAmount} value={this.state.amount}  placeholder="Minimum Price Range....."/>
        <input type="submit" className="filter" value="Filter" onClick={this.filterPrice}/><br/><br/>
        <Table>
          <TableHeader displaySelectAll={false} >
            <TableRow>   
              <TableHeaderColumn><strong>Product ID</strong></TableHeaderColumn>
              <TableHeaderColumn><strong>Customer Name</strong></TableHeaderColumn>
              <TableHeaderColumn><strong>Price</strong></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} stripedRows={true} >
            {this.state.data.map((data: any,index: any)=>{
              return(
                <TableRow key={index}>
                  <TableRowColumn><p onClick={this.details.bind(this,index)}>{data._id}</p></TableRowColumn>
                  <TableRowColumn>{data.name}</TableRowColumn>
                  <TableRowColumn>{data.price}</TableRowColumn>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>

        <div className="Details_Box">
            <h3 className="App">Customer Detail's</h3>
            {this.state.customer_details.map((data: any,index: any)=>{
              return(
                <ul key={index}>
                  <li>{data._id}  </li>
                  <li> {data.name}</li>
                  <li>{data.price}</li>
                  <li><img src={`https://greencommunitylaundry.herokuapp.com/api/Images/${data.image}`}/></li>
                </ul>
              )
            })}
        </div> */}