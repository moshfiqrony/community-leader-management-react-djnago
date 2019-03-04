import React from 'react';
import axios from 'axios';
import {withRouter} from "react-router-dom";

import {
    Table, Input, Button, Icon, Divider,Tag
} from 'antd';

import Highlighter from 'react-highlight-words';


class CLListContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            searchText: '',
            agents: [],
            shouldLoad: false,
        }
        // this.handleLoad = this.handleLoad.bind(this);
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/cldetails/')
            .then(res => this.setState({
                agents: res.data,
            }))
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.shouldLoad) {
            axios.get('http://127.0.0.1:8000/api/cldetails/')
                .then(res => this.setState({
                    agents: res.data,
                }));
            this.setState({
                shouldLoad: false,
            });
        }
    }

    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
                             setSelectedKeys, selectedKeys, confirm, clearFilters,
                         }) => (
            <div style={{padding: 8}}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{width: 188, marginBottom: 8, display: 'block'}}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{width: 90, marginRight: 8}}
                >
                    Search
                </Button>
                <Button
                    onClick={() => this.handleReset(clearFilters)}
                    size="small"
                    style={{width: 90}}
                >
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => <Icon type="search" style={{color: filtered ? '#1890ff' : undefined}}/>,
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: (text) => (
            <Highlighter
                highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />
        ),
    });

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({searchText: selectedKeys[0]});
    };

    handleReset = (clearFilters) => {
        clearFilters();
        this.setState({searchText: ''});
    };

    handleBlock(id) {
        console.log('I am from handle click', id);
        let fd = new FormData();
        fd.append('active', false);
        axios.patch(`http://127.0.0.1:8000/api/cl/${id}/`, fd)
            .then(res => {
                if(res.statusText=='OK'){
                    this.setState({
                        shouldLoad: true,
                    })
                }
            });
    }

    handleActivate(id) {
        console.log('I am from handle activate', id);
        let fd = new FormData();
        fd.append('active', true);
        axios.patch(`http://127.0.0.1:8000/api/cl/${id}/`, fd)
            .then(res => {
                if(res.statusText=='OK'){
                    this.setState({
                        shouldLoad: true,
                    })
                }
            });
    }
    reloadData(){
        console.log('i am on')
        axios.get('http://127.0.0.1:8000/api/agent/')
        .then(res => this.setState({
            agents: res.data
        }))
    }

    render() {
        const columns = [{
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '5%',
            ...this.getColumnSearchProps('id'),
        }, {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
            ...this.getColumnSearchProps('phone'),
        }, {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            width: '10%',
            ...this.getColumnSearchProps('name'),
        }, {
            title: 'Active',
            dataIndex: 'active',
            key: 'active',
            width: '5%',
            render: (text, record)=>record.active ? <Tag color='#8bc34a'>Activated</Tag> : <Tag color='#e53935'>Deactivated</Tag>
        }, {
            title: 'Action',
            key: 'operation',
            width: '30%',
            render: (text, record) => record.active
                ?
                <Button onClick={() => this.handleBlock(record.id)} type='danger'>Block</Button>
                :
                <Button onClick={() => this.handleActivate(record.id)} type='primary'>Activate</Button>
        }];
        return (
            <div>
                <Button icon='reload' type='primary' onClick={() => this.reloadData()}>Reload</Button>
                <Table pagination={false} columns={columns} dataSource={this.state.agents}/>
            </div>
        );
    }
}

export default withRouter(CLListContainer);