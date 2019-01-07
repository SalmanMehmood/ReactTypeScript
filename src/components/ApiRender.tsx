import axios from 'axios';
import { AppBar, Card, CircularProgress, RaisedButton, Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui';
import { Link } from 'react-router-dom'
import { Debugger } from 'ts-debug';
const Config = { isProd: false };
const debug = new Debugger(console, !Config.isProd, '[DEBUG] ');
import * as React from 'react';


let counter: any= 0;

interface ISTATE{
  _id: any,
  addToCart: any
  amount: any,
  cart : any,
  customer_details: any,
  data: any,
  detail_Id : any,
  index:any,
  list: number[],
  quantity: number,
  togleState : boolean
}
type Props = Partial<{}>

class ApiRender extends React.Component<Props,ISTATE> {
  constructor(props:any){
    super(props)
    this.state={
      _id: '',
      addToCart: [],
      amount: '',
      cart : 0 ,
      customer_details: [],
      data: [],
      detail_Id : '',
      index:undefined,
      list : [] ,
      quantity: 1,
      togleState : true
    }
  }
  public componentDidMount(){
    this.fetchApi()
  }
  public fetchApi = ()=>{
    axios(`https://greencommunitylaundry.herokuapp.com/api/products/`)
    .then(res =>{
      debug.log(res.data)
      this.setState({
        data: res.data
      })
    })
  };

  public getValue = (val: any) => {
    if(val.target.value === '')
    {
      this.fetchApi()
    }
      this.setState({
        _id: val.target.value
      })
  }

  public getAmount = (val: any)=>{
    if(val.target.value === '')
    {
      this.fetchApi();
    }
    this.setState({
      amount: val.target.value
    })
  }

  public showVal = () =>{
    const filterdata = [];
    const check = this.state.data;
    for(const i in check){
      if(this.state._id ===  check[i]._id){
        filterdata.push(check[i])
      }
    }
    if(filterdata.length === 0){
      alert("no data found!!!!")
      this.setState({
        _id: ''
      })
    }
    else{
      this.setState({
        data: filterdata
      })
    }
  }

  public filterPrice = () => {
    const Price = [];
    const check = this.state.data;
    for(const i in check){
      if(this.state.amount <= check[i].price){
        Price.push(check[i])
      }
    }
    if(Price.length === 0)
    {
      alert("Not In Range........")
      this.setState({
        amount : ''
      })
    }
    else
    {
      this.setState({
        data : Price
      })
    }
  }

  public details = (index: any)=> {
    debug.log(this.state.data[index])
    const newArray = [];
    newArray.push(this.state.data[index]);
    this.setState({
      customer_details: newArray
    });
  } 

  public getDetails = (id : any) => {
      return this.state.data[id]._id
  }

  public addToCart = (id: any) => {
    let flag = true;
    const { addToCart } = this.state;
    for(const i in addToCart){
      if(addToCart[i]._id === this.state.data[id]._id){
        alert('Already Ready Added In Cart List!!!')
        flag = false;
      }
    }
    if(flag === true){
      this.state.data[id].quantity = 1;
      this.state.data[id].select = true; 
      addToCart.push(this.state.data[id])
      this.setState({
        cart : this.state.cart + 1
      })
    }
  }

  public minusToCard = (id: any) =>{
    let flag = true;
    const { addToCart, data } = this.state;
    this.state.data[id].select = false; 
    for(const i in addToCart){
      if(addToCart[i]._id === data[id]._id){
        addToCart.splice(i,1)
        flag = false;
        this.setState({
            cart : this.state.cart - 1
        }) 
        debug.log(this.state.addToCart)
      }
    }
    if(flag === true){
      alert('This item is not included in cart')
    }
  }
  public togleState = () =>{
    if(this.state.addToCart.length === 0){
      alert('Please Choose A Desired Product!!!!')
    }
    else{
      const { togleState } = this.state;
      this.setState({
        togleState: !togleState
      })
    }
  }

  public goToHome = ()=>{
    const { togleState } = this.state;
    this.setState({
      togleState: !togleState
    })
  }

  public getQuantity = (index: any,val: any) => {
    const { addToCart } = this.state
    this.setState({
      index : addToCart[index].quantity = val.target.value
    })
  }

  public grandTotal1 = () =>{
    const {addToCart} = this.state
    for(const i in addToCart){
      if(addToCart){
        addToCart[i].total = addToCart[i].quantity * addToCart[i].price;
      }
    }
    let a = 0;
    for(const j in addToCart){
      if(addToCart){
        a = addToCart[j].total + a
      }
    }
    return a;
  }
  
  public deleteSelectedItems = (id: any) =>{
    this.state.data[id].select = false;
    const { addToCart } = this.state;
    addToCart.splice(id , 1)
    this.setState({
      addToCart,
    })
  }

  public grandTotal = (index:any) =>{
    const { addToCart } = this.state
    const a = addToCart[index].quantity * addToCart[index].price
    return a ;
  }

  public homeScreen = () =>{
    const {data} = this.state;
    for(const i in data){
      if(data[i].select){
        data[i].select = false
      } 
    }
    alert('Thanks For Shopping Here!!!!') 
    this.setState({
      addToCart : [],
      cart : 0,
      togleState : true
    })
  }

  public showBillingList = () =>{
    const { addToCart } = this.state
    return(
        <div className='showBillContainer'>
          <AppBar title='E-Commerce Website' showMenuIconButton={false} style={{backgroundColor : 'rgb(30,30,30)',fontFamily: "'Open Sans', sans-serif"}}
            iconElementRight={<div><RaisedButton backgroundColor = '#003333' onClick={this.goToHome} label={'Go To Home'} labelStyle={{color : 'white'}} ><i className="fa fa-home addtocart"/></RaisedButton></div>}/>
          <Table>
          <TableHeader displaySelectAll={false} >
            <TableRow>   
              <TableHeaderColumn><strong>S.No</strong></TableHeaderColumn>
              <TableHeaderColumn><strong>Product Image</strong></TableHeaderColumn>
              <TableHeaderColumn><strong>Price</strong></TableHeaderColumn>
              <TableHeaderColumn><strong>Quantity</strong></TableHeaderColumn>
              <TableHeaderColumn><strong>Remove</strong></TableHeaderColumn>
              <TableHeaderColumn><strong>Total</strong></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} stripedRows={true} >
            {addToCart.map((data: any,index: any)=>{
              return(
                <TableRow key={index}>
                  <TableRowColumn>{ index+1 }</TableRowColumn>
                  <TableRowColumn><img src={  `https://greencommunitylaundry.herokuapp.com/api/Images/${data.image}` } className='cartImage'/></TableRowColumn>
                  <TableRowColumn>{ `$${data.price}` }</TableRowColumn>
                  <TableRowColumn><input type="number" onChange={ this.getQuantity.bind(this,index) } value={ data.quantity }/></TableRowColumn>
                  <TableRowColumn><button id='remove' onClick={ this.deleteSelectedItems.bind(this,index)} >Remove</button></TableRowColumn>
                  <TableRowColumn>{ `$${this.grandTotal(index).toFixed(2)}`  }</TableRowColumn>
                </TableRow>
              )
            })}
          </TableBody>
          </Table>
          <h3>Grand Total : {`$${this.grandTotal1().toFixed(2)}`}</h3>
          <h3><button className='checkOutBtn' onClick={this.homeScreen}><i className="fa fa-check"/>Check Out</button></h3>
        </div>
    )
  }

  public showItems = () =>{
    const { data } = this.state;
    return(
      <div className='MainDiv'>
      <AppBar title='E-Commerce Website' showMenuIconButton={false} style={{backgroundColor : 'rgb(30,30,30)',fontFamily: "'Open Sans', sans-serif"}}
      iconElementRight={ <div><RaisedButton backgroundColor = '#003333' label={''+this.state.cart} labelStyle={{color : 'white'}} onClick={this.togleState}><i className="fa fa-shopping-cart addtocart"/></RaisedButton></div> }/>
      {
          data.length!==0 ? data.map((mapdata: any , index: any)=>{
        if(counter>=4){
          counter=0
        }
        counter = counter+1
        return(
          <Card className={ `cardStyle${counter}` } key={ index }>
            <img className="image" src={`https://greencommunitylaundry.herokuapp.com/api/Images/${mapdata.image}`}/>
            <p>{ mapdata.name }</p>
            <p>Price : <strong>{ mapdata.price }$</strong></p>
            <p><Link to={`details/${ this.getDetails(index)}` }><RaisedButton onClick={this.getDetails.bind(this,index)} backgroundColor = '#003333' labelStyle={{color : 'white'}} label='Details'/></Link></p>
            { this.state.data[index].select ? <button className="icon_btn_check" onClick={ this.addToCart.bind(this,index) }><i className="fa fa-check"/></button> : <button className="icon_btn" onClick={ this.addToCart.bind(this,index) }><i className="fa fa-plus"/></button>}
            <button className="icon_btn" onClick={ this.minusToCard.bind(this,index) }><i className="fa fa-minus"/></button>  
          </Card>
        )
      }) : <CircularProgress size={ 100 } color={ '#ff0000' } style={ {margin: '160px auto'} }/>
      }
  </div>
    )
  }

  public render() {
      const {togleState} = this.state;
    return (
      <section>
        { togleState ? this.showItems() : this.showBillingList() }
      </section>
    );
  }
}

export default ApiRender;
