import React, { Component } from "react";
class Sort extends Component {   
    onClick = (sortBy, sortValue) => {
        this.props.onSort(sortBy, sortValue);
        this.setState({
            sortBy: sortBy,
            sortValue: sortValue
        })
    }
    render() {      
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="btn-group">
                    <button
                        type="button"
                        className="btn btn-danger dropdown-toggle"
                        data-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false"
                        id="dropdownMenu1"
                    >
                    Sắp xếp
                    </button>
                    <div className="dropdown-menu">
                        <a
                            onClick={() => this.onClick('name', 1)}
                            className="dropdown-item" >Theo A-Z</a>
                        <a
                            onClick={() => this.onClick('name', -1)}
                            className="dropdown-item">Theo Z-A</a>
                        <div className="dropdown-divider"></div>
                        <a
                            onClick={() => this.onClick('status', 1)}
                            className="dropdown-item">Theo active</a>
                        <a
                            onClick={() => this.onClick('status', -1)}
                            className="dropdown-item">Theo unactive</a>
                    </div>
                </div>
            </div>
        );
    }
}
export default Sort;