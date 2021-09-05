import React, { Component } from "react";
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
        }
    }
    onChange = (event) => {
        var target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        }
        //, () => { console.log(this.state.keyword) }
        )
    }
    onSearch = () => {
        //console.log(this.state.keyword)
        this.props.onSearch(this.state.keyword)
    }
    render() {
        let { keyword } = this.state;
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="input-group">
                    <input
                        name="keyword"
                        type="text"
                        className="form-control"
                        placeholder="Nhập từ khóa.."
                        value={keyword}
                        onChange={this.onChange}
                    />
                    <span className="input-group-btn ml-1">
                        <button
                            onClick={this.onSearch}
                            className="btn btn-primary"
                            type="submit">
                            <i className="fa fa-search mr-5"></i>Tìm
                        </button>
                    </span>
                </div>
            </div>
        );
    }
}
export default Search;