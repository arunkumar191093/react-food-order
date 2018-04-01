import React from 'react';

class Checkout extends React.Component {
    constructor() {
        super();
        this.state = {
            orderArr: [],
            total: 0,
            successMsg: ""
        }
        this.renderOrder = this.renderOrder.bind(this);
        this.calulateTotal = this.calulateTotal.bind(this);
        this.checkoutOrder = this.checkoutOrder.bind(this);
    }
    renderOrder() {
        let orderArr = [];

        for (let key in this.props.location.data) {
            orderArr.push(<div className="order-options col-sm-12"><span class="col-sm-3">{key} : </span><span class="col-sm-5">{this.props.location.data[key]["qty"]}x&#8377;{this.props.location.data[key]["price"]}</span><span class="col-sm-2">&#8377;{this.props.location.data[key]["qty"] * this.props.location.data[key]["price"]}</span></div>);

        }

        return orderArr;
    }

    //calculate total amount for the bill
    calulateTotal() {
        let total = 0;
        for (let key in this.props.location.data) {
            total += this.props.location.data[key]["qty"] * this.props.location.data[key]["price"]
        }
        this.setState({ total });
    }

    checkoutOrder(e) {
        e.preventDefault();
        this.setState({ successMsg: "Your order has been placed successfully." })
    }

    componentWillMount() {
        console.log(this.props)
        if (!this.props.location.data || Object.keys(this.props.location.data).length == 0) {
            this.props.history.push("/");
        }
    }
    componentDidMount() {
        this.calulateTotal();

    }

    render() {
        console.log(this.props.location.data);



        return (
            <div>
                <form class="form-horizontal" onSubmit={this.checkoutOrder}>
                    <div class="col-sm-6 card"  style={{"border":"1px solid #ccc"}}>
                        <h3>Contact Details</h3>
                        <div class="hr"></div>

                        <div class="form-group">
                            <label class="control-label col-sm-3" for="name">Name:</label>
                            <div class="col-sm-6">
                                <input type="text" class="form-control" id="name" placeholder="Enter your name" name="name" required />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-sm-3" for="contactNo">Contact No:</label>
                            <div class="col-sm-6">
                                <input type="text" maxlength="10"  class="form-control" id="contactNo" placeholder="Enter contact number" name="contactNo" required />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-sm-3" for="address">Address:</label>
                            <div class="col-sm-6">
                                <textarea row="4" col="10" class="form-control" id="address" placeholder="Enter address" required></textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-sm-3" for="pin">Pin Code:</label>
                            <div class="col-sm-6">
                                <input type="text" maxlength="10" class="form-control" id="pin" placeholder="6-digit pin code" name="pin" required />
                            </div>
                        </div>
                        <div class="hr"></div>
                        <h3>Payment Details</h3>
                        <div class="hr"></div>
                        <div class="form-group">
                            <label class="control-label col-sm-3" for="card">Card Number:</label>
                            <div class="col-sm-6">
                                <input type="text" maxlength="16" class="form-control" id="card" placeholder="XXXX-XXXX-XXXX-XXXX" name="card" required />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-sm-3" for="expiry">Expiry Date/Year:</label>
                            <div class="col-sm-2">
                                <input type="text" maxlength="5" class="form-control" id="expiry" placeholder="MM/YY" name="expiry" required />
                            </div>

                            <label class="control-label col-sm-3" for="cvv">CVV:</label>
                            <div class="col-sm-2">
                                <input type="password" maxlength="3" class="form-control" id="cvv" placeholder="CVV" name="cvv" required />
                            </div>
                        </div>


                    </div>
                    <div className="col-sm-6  card" style={{"border":"1px solid #ccc"}}>
                        <h3>Order Details</h3>
                        <div class="hr"></div>
                        <div class="container-fluid">
                            {this.renderOrder()}
                        </div>
                        <div class="hr"></div>
                        <h3>Total : &nbsp;&nbsp;&nbsp;&#8377;{this.state.total}</h3>
                        <div class="form-group">
                            <div class="col-sm-offset-2 col-sm-8">
                                <button type="submit" class="btn btn-success btn-block">Checkout</button>
                            </div>
                        </div>
                        <center>
                            <div class="successMsg">{this.state.successMsg}</div>
                        </center>
                    </div>
                </form>
            </div>
        )
    }
}

export default Checkout;