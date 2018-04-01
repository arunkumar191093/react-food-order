import React from "react";
import { Link } from 'react-router-dom';
import Nav from './Nav';
import $ from 'jquery';

class Admin extends React.Component {
    constructor() {
        super();
        this.state = {
            menuData: []

        }
        this.onPriceUpdate = this.onPriceUpdate.bind(this);
        this.onInputChange = this.onInputChange.bind(this);

    }

    onInputChange(name,e){
        let copyData = [];
        for(let key in this.state.menuData){
            if(this.state.menuData[key]["name"] == name){
                this.state.menuData[key]["price"] = e.target.value;
            }
            copyData.push(this.state.menuData[key]);
        }
        console.log(copyData)
         this.setState({
             menuData:copyData
         })
    }

    //updating the json file from where the list is being fetched
    onPriceUpdate() {
        var data = JSON.stringify(this.state.menuData)
        
        $.post("http://localhost:8081/updatePrice",data,function(data,status){
            alert(data);
        });
        
      

    }

    //fetching list of items
    componentDidMount() {
        fetch("http://localhost:8081/getList").then(res => {
            return res.json()
        }).then(json => {
            console.log("menu",json);
            this.setState({
                menuData: json
            })
        });

    }


    render() {
        let _this = this;
        const menuOptions = this.state.menuData.map(function (data) {
            return (
                <div class="col-md-4" key={data.name}>
                    <div class="card ">
                        <img src={data.imageUrl} alt={data.name} className="card-imgs" />
                        <hr style={{ "margin-top": "0px" }} />
                        <center>
                            <h4><b>{data.name}</b></h4>
                            <div class="form-group container-fluid" style={{"padding":"10px"}}>
                            <label class="control-label col-sm-3" for="price">Price:</label>
                            <div class="col-sm-6">
                                <input type="text" maxlength="10" value={data.price} onChange={(e) => {_this.onInputChange(data.name,e)}}
                                class="form-control" id="price" placeholder="Enter price" name="price" />
                            </div>
                        </div>
                        </center>
                    </div>

                </div>
            )

        })


        return (
            <div>
                <div class="container">
                    <div className="row heading-row">
                        <span className="heading">Fred's Admin Portal</span>
                        <button class="btn btn-primary checkout-btn" style={{ "float": "right" }} onClick={_this.onPriceUpdate}>Update Price</button>
                    </div>
                    <div className="row">{menuOptions}</div>
                </div>
            </div>
        )
    }
}


export default Admin;