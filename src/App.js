import React, { Component } from 'react';
import TaskForm from './components/TaskForm';
import './App.css';
import Control from './components/Control';
import TaskList from './components/TaskList';
import randomstring from 'randomstring';
import {findIndex,filter} from 'lodash';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],//id unique, name, status
            isDisplayForm: false,
            taskEditing: null,
            filter: {
                name: '',
                status: -1
            },
            keyword: '',
            sort: {
                by: 'name', value: 1
            }
        }
    }
    componentWillMount() {
        if (localStorage && localStorage.getItem('tasks')) {
            this.setState({
                tasks: JSON.parse(localStorage.getItem('tasks'))
            })
        }
    }
    onToggleForm = () => {
        if (this.state.isDisplayForm && this.state.taskEditing) {
            this.setState({
                isDisplayForm: true,
                taskEditing: null
            });
        } else {
            this.setState({
                isDisplayForm: !this.state.isDisplayForm,
                taskEditing: null
            });
        }

    }
    onCloseForm = () => {
        console.log("close form")
        this.setState({
            isDisplayForm: false, taskEditing: null
        })
    }
    onSubmit = (data) => {
        let { tasks } = this.state;
        if (data.id) {
            let index = this.findIndex(data.id)
            if (index !== -1) {
                let task = tasks[index];
                task.name = data.name;
                task.status = data.status;
            }

        } else {
            data.id = randomstring.generate(16);
            tasks.push(data);
        }
        this.setState({
            tasks: tasks
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    onUpdateStatus = (id) => {
        console.log(id)
        var { tasks } = this.state;
        //let index = this.findIndex(id);
        //sử dụng lodash
        let index = findIndex(tasks, (task) => task.id === id)
        if (index !== -1) {
            tasks[index].status = !tasks[index].status
            this.setState({ tasks: tasks })
            localStorage.setItem('tasks', JSON.stringify(tasks))
        }
    }
    findIndex = (id) => {
        var { tasks } = this.state;
        var r = -1;
        tasks.forEach((task, index) => {
            if (task.id === id) {
                r = index;
            }
        });
        return r;
    }
    onDeleteItem = (id) => {
        var { tasks } = this.state;
        console.log(id)
        let index = this.findIndex(id);
        if (index !== -1) {
            tasks.splice(index, 1)
            this.setState({ tasks: tasks })
            localStorage.setItem('tasks', JSON.stringify(tasks))
        }
        this.onCloseForm();
    }
    onUpdate = (id) => {
        var { tasks } = this.state;
        console.log(id)
        let index = this.findIndex(id);
        this.setState({
            taskEditing: tasks[index], isDisplayForm: true
        }, () => {
            console.log("set taskediting thành công")
        });

    }
    onFilter = (filterName, filterStatus) => {
        this.setState({
            filter: {
                name: filterName, status: filterStatus
            }
        }, () => {
            console.log(this.state.filter)
        })
    }
    onSearch = (keyword) => {
        this.setState({
            keyword: keyword
        },
            () => console.log(this.state.keyword)
        )
    }
    onSort = (sortBy, sortValue) => {
        this.setState({
            sort: {
                by: sortBy, value: sortValue
            }
        }, () => console.log(this.state.sort))
    }
    render() {
        var { tasks, isDisplayForm, taskEditing, filter, keyword, sort } = this.state;
        if (filter) {
            if (filter.name) {
                //sử dụng js thuần
                /* tasks = tasks.filter((task) => {
                    return task.name.toLowerCase().indexOf(filter.name) !== -1;
                }); */
                //sử dụng lodash
                tasks = filter(tasks,(task) => {
                    return task.name.toLowerCase().indexOf(filter.name) !== -1;
                });
            }
            tasks = tasks.filter((task) => {
                if (filter.status == -1) {
                    return task;
                } else if (filter.status == 0) {
                    return task.status === false;
                } else {
                    return task.status === true
                }
            });
        }
        if (keyword) {
            tasks = tasks.filter((task) => task.name.toLowerCase().indexOf(keyword) !== -1)
        }
        if (sort.by === 'name') {
            tasks.sort((a, b) => {
                if (a.name > b.name) return sort.value;
                else if (a.name < b.name) return -sort.value;
                else return 0
            });
        } else {
            tasks.sort((a, b) => {
                if (a.status > b.status) return -sort.value;
                else if (a.status < b.status) return sort.value;
                else return 0
            });
        }
        var elementTaskForm = isDisplayForm ? <TaskForm
            taskEditing={taskEditing}
            onSubmit={this.onSubmit}
            onCloseForm={this.onCloseForm} /> : '';
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản lý công việc</h1>
                </div>
                <div className="row">
                    {elementTaskForm}
                    <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                        <button type="submit" className="btn btn-primary" onClick={this.onToggleForm}>
                            <span className="fa fa-plus mr-1"></span>Thêm công việc
                        </button>
                        <Control
                            onSearch={this.onSearch}
                            onSort={this.onSort}
                        />
                        <div className="row mt-3">
                            <TaskList
                                tasks={tasks}
                                onUpdateStatus={this.onUpdateStatus}
                                onUpdate={this.onUpdate}
                                onDeleteItem={this.onDeleteItem}
                                onFilter={this.onFilter}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
