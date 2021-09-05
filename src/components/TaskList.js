import React, { Component } from 'react';
import TaskItem from './TaskItem';
class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1//tất cả -1, ẩn :0, kích hoạt 1
        }
    } 
    onChange=(event)=>{
        var target=event.target;
        var name = target.name
        var value = target.value        
        this.setState({
            [name]:value
        },()=>{
            this.props.onFilter(this.state.filterName,this.state.filterStatus);
        });
        
    }
    render() {
        var { tasks } = this.props;
        var {filterName,filterStatus}=this.state;
        var elementTasks = tasks.map((task, index) => {
            return <TaskItem
                key={task.id}
                index={index}
                task={task}
                onUpdateStatus={this.props.onUpdateStatus}//chạy thẳng lên trên phương thức của cha luôn
                onDeleteItem={this.props.onDeleteItem}
                onUpdate={this.props.onUpdate}
            />
        })
        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên</th>
                        <th>Trạng Thái</th>
                        <th>Hành động</th>
                    </tr>
                    <tr>
                        <th></th>
                        <th>
                        <input
                         className="form-control" 
                         name="filterName" 
                         value={filterName} 
                        onChange={this.onChange}
                         /></th>
                        <th>
                        <select 
                        className="form-control"
                        name="filterStatus"
                        value={filterStatus}
                        onChange={this.onChange}
                        >
                            <option value={-1}>Tất cả</option>
                            <option value={0}>Ẩn</option>
                            <option value={1}>Hiện</option>
                        </select></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {elementTasks}
                </tbody>
            </table>
        );
    }
}
export default TaskList;