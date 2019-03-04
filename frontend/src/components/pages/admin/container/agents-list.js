import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

import {Button, Icon, Input, Table, Tag} from 'antd';

import Highlighter from 'react-highlight-words';


class AgentList extends React.Component {
    constructor() {
        super();
        this.state = {
            searchText: '',
            agents: [],
        };
        this.handleLoad = this.handleLoad.bind(this);
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/agent/')
            .then(res => this.setState({
                agents: res.data,
            }));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            axios.get('http://127.0.0.1:8000/api/agent/')
                .then(res => this.setState({
                    agents: res.data,
                }));
        }
        console.log('I am from Component did update');
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

    handleLoad() {
        axios.get('http://127.0.0.1:8000/api/agent/')
            .then(res => {
                this.setState({
                    agents: res.data,
                })
            })
    };

    handleBlock(id) {
        console.log('I am from handle click', id);
        let fd = new FormData();
        fd.append('active', false);
        axios.patch(`http://127.0.0.1:8000/api/agent/${id}/`, fd)
            .then(res => {
                if (res.statusText === 'OK') {
                    this.props.history.push('/admin/agentslist');
                }
            });
    }

    handleActivate(id) {
        console.log('I am from handle activate', id);
        let fd = new FormData();
        fd.append('active', true);
        axios.patch(`http://127.0.0.1:8000/api/agent/${id}/`, fd)
            .then(res => {
                if (res.statusText === 'OK') {
                    this.props.history.push('/admin/agentslist');
                }
            });
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
            ...this.getColumnSearchProps('name'),
        }, {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            width: '10%',
            ...this.getColumnSearchProps('phone'),
        }, {
            title: 'Active',
            dataIndex: 'active',
            key: 'active',
            width: '5%',
            render: (text, record) => record.active ? <Tag color='#8bc34a'>Activated</Tag> :
                <Tag color='#e53935'>Deactivated</Tag>,
        }, {
            title: 'Assigned',
            dataIndex: 'asign',
            key: 'asign',
            width: '5%',
            render: (text, record) => record.asign ? <Tag color='#8bc34a'>Assigned</Tag> :
                <Tag color='#e53935'>Not Assigned</Tag>,
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
                <Button htmlType='button' type='primary' icon='reload' onClick={this.handleLoad}>Reload</Button>
                <Table pagination={false} columns={columns} dataSource={this.state.agents}/>
            </div>
        );
    }
}

export default withRouter(AgentList);