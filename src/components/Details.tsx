import axios from 'axios';
import {AppBar, Card ,CircularProgress,RaisedButton} from 'material-ui';
import * as React from 'react';
import { Debugger } from 'ts-debug';
const Config = { isProd: false };
const debug = new Debugger(console, !Config.isProd, '[DEBUG] ');

interface ISTATE {
    productDetails : any
}
type Props = Partial<{
    match: any,
    history : any
}>

class ItemDetails extends React.Component<Props , ISTATE>{
    constructor(props: any){
        super(props)
        this.state={
            productDetails : undefined
        }
    }
    public componentDidMount (){
        axios(`https://greencommunitylaundry.herokuapp.com/api/products/${this.props.match.params._id}`)
        .then(res =>{
            this.setState({
                productDetails : res.data
            })

            debug.log(res,'test')
        })
    }
    public HomePage = () =>{
        this.props.history.push('/')
    }
    public render(){
        const {productDetails} = this.state; 
        debug.log(this.state.productDetails)
        return(
            <div>
                <AppBar title='E-Commerce Website' showMenuIconButton={false} style={{backgroundColor : 'rgb(30,30,30)',fontFamily: "'Open Sans', sans-serif"}}/>
            <div className="MainDiv">  
                {
                    productDetails ? (
                        <Card className='detailsCard'>
                            <img src={`https://greencommunitylaundry.herokuapp.com/api/Images/${productDetails.image}`} className="image"/>
                            <p>Name : <strong>{productDetails.name}</strong></p>
                            <p>Order : <strong>{productDetails.order}</strong></p>
                            <p>Price : <strong>{productDetails.price}$</strong></p>
                            <p><RaisedButton onClick={this.HomePage} label="back" backgroundColor = '#003333' labelStyle={{color : 'white'}} /></p>
                        </Card>
                    ): <CircularProgress size={100} color={'#ff0000'} style={{margin: '150px auto'}}/>
                }
            </div>
            </div>
        )
    }
}
export default ItemDetails;