import React from 'react';
import axios from 'axios';

import {
    Table, Input, Button, Icon, Tag
} from 'antd';
import Highlighter from 'react-highlight-words';


class AgentList extends React.Component {
    constructor() {
        super();
        this.state = {
            searchText: '',
            agents: [],
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/agent/')
            .then((res) => {
                this.setState({
                    agents: res.data,
                });
            });
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
    })

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({searchText: selectedKeys[0]});
    }

    handleReset = (clearFilters) => {
        clearFilters();
        this.setState({searchText: ''});
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
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            width: '10%',
            ...this.getColumnSearchProps('phone'),
        }, {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
            ...this.getColumnSearchProps('name'),
        }, {
            title: 'Assign',
            dataIndex: 'asign',
            key: 'asign',
            width: '10%',
            render: (text, record)=>record.asign ? <Tag color='#e53935'>Assigned</Tag> : <Tag color='#8bc34a'>Not Assigned</Tag>,
        }, {
            title: 'Active',
            dataIndex: 'active',
            key: 'active',
            width: '10%',
            render: (text, record)=>record.active ? <Tag color='#8bc34a'>Activated</Tag> : <Tag color='#e53935'>Deactivated</Tag>,
        }];
        return (
            <div>
                <Button icon='reload' type='primary' onClick={() => this.reloadData()}>Reload</Button>
                <Table pagination={false} columns={columns} dataSource={this.state.agents}/>
            </div>
        );
    }
}

export default AgentList;