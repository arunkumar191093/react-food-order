import React from "react";
import { Link } from 'react-router-dom';

class Menu extends React.Component {
    constructor() {
        super();
        this.state = {
            menuData: [],
            qtyObj: {}
        }
        this.addQty = this.addQty.bind(this);
        this.subtractQty = this.subtractQty.bind(this);

    }

    //method to subtract quantity of particular food option
    subtractQty(e, data) {

        let qtyObj = { ...this.state.qtyObj }; //making  copy of the main object which is storing quantity and price of each item
        if (qtyObj[data.name] && qtyObj[data.name]["qty"]) {
            qtyObj[data.name]["qty"]--;
            qtyObj[data.name]["price"] = data.price;
        }
        else {
            qtyObj[data.name] = {}
            qtyObj[data.name]["qty"] = 0;
            qtyObj[data.name]["price"] = data.price;
        }

        if (qtyObj[data.name] && qtyObj[data.name]["qty"] == 0) {
            delete qtyObj[data.name];
        }
        this.setState({ qtyObj }, () => {
            console.log(this.state.qtyObj)

        })


    }

    //method to add quantity of particular food option
    addQty(e, data) {
        let qtyObj = { ...this.state.qtyObj };
        if (qtyObj[data.name] && qtyObj[data.name]["qty"]) {
            qtyObj[data.name]["qty"]++;
            qtyObj[data.name]["price"] = data.price;
        }
        else {
            qtyObj[data.name] = {}
            qtyObj[data.name]["qty"] = 1;
            qtyObj[data.name]["price"] = data.price;
        }
        this.setState({ qtyObj }, () => {
            console.log(this.state.qtyObj)

        })
    }


    //fetching the list from the getList api call
    componentDidMount() {
        fetch("http://localhost:8081/getList").then(res => {
            return res.json()
        }).then(json => {
            console.log(json);
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
                            <h5 class="price">Price: &#8377;{data.price}</h5>
                            <div className="qty-div" id={data.name}>Qty: <button className="glyphicon glyphicon-minus btn-minus" onClick={(e) => { _this.subtractQty(e, data) }}></button>
                                <span type="text" className="qty-box">{0 || _this.state.qtyObj[data.name] ? _this.state.qtyObj[data.name]["qty"] : 0}</span>
                                <button className="glyphicon glyphicon-plus btn-plus" onClick={(e) => { _this.addQty(e, data) }}></button></div>
                        </center>
                    </div>

                </div>
            )

        })


        return (
            <div class="container">
                <div className="row heading-row">
                    <span className="heading">Fred's Menu</span>
                    <Link to={{ pathname: "/checkout", data: this.state.qtyObj }}
                        className="btn btn-primary checkout-btn" style={{ "float": "right" }}>Checkout</Link>
                </div>
                <div className="row">{menuOptions}</div>
            </div>

        )
    }
}

export default Menu;