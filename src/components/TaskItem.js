import React, { Component } from 'react';
class TaskItem extends Component{
    onUpdateStatus=()=>{
        //console.log(this.props.task.id)
        this.props.onUpdateStatus(this.props.task.id);
    }
    onDeleteItem=()=>{
        this.props.onDeleteItem(this.props.task.id);
    }
    onUpdate=()=>{
        this.props.onUpdate(this.props.task.id);
    }
    render(){
        var{index,task}=this.props
        return (
            <tr>
            <td>{index+1}</td>
            <td>{task.name}</td>
            <td className="text-center">
                <a 
                className={task.status?"text-success":"text-danger"}
                onClick={this.onUpdateStatus}
                >
                {task.status?"Kích hoạt":"Ẩn"}
                </a>
               
            </td>
            <td className="text-center d-flex justify-content-center">
                <button onClick={this.onUpdate} className="btn btn-warning mr-3" type="button">
                    <span className="fs fa-pencil mr-1"></span>Sửa
                </button>
                <button onClick={this.onDeleteItem} className="btn btn-danger" type="button">
                    <span className="fa fa-trash mr-1"></span>Xóa
                </button>
            </td>
        </tr>
        );
    }
}
export default TaskItem;