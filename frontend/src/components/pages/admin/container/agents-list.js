import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

import {Button, Drawer, Icon, Input, Table, Tag} from 'antd';

import Highlighter from 'react-highlight-words';
import UserDetailsiew from "./user-detail-view";


class AgentList extends React.Component {
    constructor() {
        super();
        this.state = {
            searchText: '',
            agents: [],
            visible: false,
            id: '',
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
            <div className='hideforpdf' style={{padding: 8}}>
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
        filterIcon: filtered => <Icon className='hideforpdf' type="search"
                                      style={{color: filtered ? '#1890ff' : undefined}}/>,
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

    handleViewDetails(id) {
        console.log('I am from handle View Details, with id ', id);
        this.setState({
            visible: true,
            id: id,
        })
    }

    onClose = () => {
        this.setState({
            visible: false,
            id: '',
        });
    };

    handlePDF() {
        var div = "<html><head><style> .hideforpdf{display: none;}td{text-align:center;}table{border: 1px solid black;float: center;}table tr{border: 1px solid black;}table tr td{border: 1px solid black;}table tr th{border: 1px solid black;}</style></head><body>";
        div += document.getElementById('printArea').innerHTML;
        div += "</body></html>";
        var win = window.open("", "", "width=960,height=500");
        win.document.write("<center><img src='http://getd2.com/img/logo-new.png'/><h1>Agent List</h1></center><br><br>");
        win.document.write(div);
        win.document.write("<br><br><center><p>&copy All Rights Reserved By D2</p><p>Developed By D2</p></center>");
        win.print();
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
            className: 'hideforpdf',
            width: '10%',
            render: (text, record) => record.active
                ?
                <Button onClick={() => this.handleBlock(record.id)} type='danger'>Block</Button>
                :
                <Button onClick={() => this.handleActivate(record.id)} type='primary'>Activate</Button>
        }, {
            title: 'Views',
            key: 'details',
            className: 'hideforpdf',
            width: '10%',
            render: (text, record) => <Button onClick={() => this.handleViewDetails(record.id)} type='primary'>View
                Details</Button>
        }];
        return (
            <div>
                <div style={{paddingBottom: 20}}>
                    <Button htmlType='button' type='primary' icon='reload' onClick={this.handleLoad}>Reload</Button>
                    <div style={{float: 'right'}}>
                        <Button onClick={() => this.handlePDF()}>Download PDF</Button>
                    </div>
                </div>
                <div id='printArea'>
                    <Table pagination={false} columns={columns} dataSource={this.state.agents}/>
                </div>
                <Drawer
                    title="Profile Information"
                    width={900}
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <UserDetailsiew id={this.state.id} role={'agent'}/>
                </Drawer>
            </div>
        );
    }
}

export default withRouter(AgentList);