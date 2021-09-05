import React, { Component } from 'react';
class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            id:'',           
            name: "",
            status: true
        }
    }
    componentWillMount(){        
        if(this.props.taskEditing){
            this.setState({
                id:this.props.taskEditing.id,
                name:this.props.taskEditing.name,
                status:this.props.taskEditing.status,
            },()=>{
                console.log(this.state)
            })
        }
    } 
    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.taskEditing){
            this.setState({
                id:nextProps.taskEditing.id,
                name:nextProps.taskEditing.name,
                status:nextProps.taskEditing.status,
            },()=>{
                console.log(this.state)
            })
        }else if(nextProps && nextProps.taskEditing===null){
            this.setState({
                id:'', name:'',status:true
             }) 
        }
    }
    onClose = () => {
        this.props.onCloseForm();
    }
    onChange = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        });
    }
    onSubmit = (event) => {
        event.preventDefault();      
        this.props.onSubmit(this.state);
        this.setState({
            id:'', name:'',status:true
         }) 
        this.onClose();
    }
    onClear=(event)=>{
        event.preventDefault();
        this.setState({
           id:'', name:'',status:true
        })       
    }
   
    render() {
        let {id}=this.state;
        return (            
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <form onSubmit={this.onSubmit}>
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title d-flex">
                                {id?'Cập nhật công việc':'Thêm công việc'}
                                <a onClick={this.onClose} className="ml-auto">
                                    <i className="fa fa-times-circle"></i>
                                </a>
                            </h3>
                        </div>
                        <div className="card-body">

                            <div className="form-group">
                                <label>Tên:</label>
                                <input
                                    onChange={this.onChange}
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={this.state.name} />
                            </div>
                            <div className="form-group">
                                <label>Trạng thái:</label>
                                <select
                                    onChange={this.onChange}
                                    type="text"
                                    className="form-control"
                                    name="status"
                                    value={this.state.status}>
                                    <option value={true}>Kích hoạt</option>
                                    <option value={false}>Vô hiệu</option>
                                </select>
                            </div>
                        </div>
                        <div className="card-footer text-muted form-inline">
                            <div className="form-group">
                                <button type="submit" className="btn btn-warning mr-5">
                                    <span className="fa fa-plus mr-1"></span>
                                    Lưu
                                </button> <br />
                                <button onClick={this.onClear} type="submit" className="btn btn-danger">
                                    <span className="fa fa-close mr-1"></span>
                                    Hủy
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default TaskForm;
