import React from 'react';
import axios from 'axios';
import {withRouter} from "react-router-dom";
import UserDetailsiew from './user-detail-view';

import {Button, Drawer, Form, Icon, Input, Select, Table, Tag} from 'antd';

import Highlighter from 'react-highlight-words';


const {Option} = Select;

class CLListContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            searchText: '',
            agents: [],
            shouldLoad: false,
            visible: false,
            id: '',
            dists: [],
        }
        // this.handleLoad = this.handleLoad.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/cldetails/')
            .then(res => this.setState({
                agents: res.data,
            }));
        axios.get('http://127.0.0.1:8000/api/districts/')
            .then(res => this.setState({
                dists: res.data,
            }));
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
            axios.get('http://127.0.0.1:8000/api/districts/')
                .then(res => this.setState({
                    dists: res.data,
                }));
        }
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
                    className='hoverable'
                    size="small"
                    style={{width: 90, marginRight: 8}}
                >
                    Search
                </Button>
                <Button
                    onClick={() => this.handleReset(clearFilters)}
                    size="small"
                    className='hoverable'
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

    handleBlock(id) {
        console.log('I am from handle click', id);
        let fd = new FormData();
        fd.append('active', false);
        axios.patch(`http://127.0.0.1:8000/api/cl/${id}/`, fd)
            .then(res => {
                if (res.statusText === 'OK') {
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
                if (res.statusText === 'OK') {
                    this.setState({
                        shouldLoad: true,
                    })
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


    reloadData() {
        console.log('i am on');
        axios.get('http://127.0.0.1:8000/api/cl/')
            .then(res => this.setState({
                agents: res.data
            }))
    }

    handleChange(district) {
        if (district !== 'all') {
            axios.get(`http://127.0.0.1:8000/api/cldetails/?district=${district}`)
                .then(res => this.setState({
                    agents: res.data,
                }));
        } else {
            axios.get(`http://127.0.0.1:8000/api/cldetails/`)
                .then(res => this.setState({
                    agents: res.data,
                }));
        }
    }


    handlePDF() {
        var div = "<html><head><style> .hideforpdf{display: none;}td{text-align:center;}table{border: 1px solid black;float: center;}table tr{border: 1px solid black;}table tr td{border: 1px solid black;}table tr th{border: 1px solid black;}</style></head><body>";
        div += document.getElementById('printArea').innerHTML;
        div += "</body></html>";
        var win = window.open("", "", "width=960,height=500");
        win.document.write("<center><img src='http://getd2.com/img/logo-new.png'/><h1>Community Leader List</h1></center><br><br>");
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
                <Tag color='#e53935'>Deactivated</Tag>
        }, {
            title: 'Action',
            key: 'operation',
            className: 'hideforpdf',
            width: '10%',
            render: (text, record) => record.active
                ?
                <Button className='hoverable' onClick={() => this.handleBlock(record.id)} type='danger'>Block</Button>
                :
                <Button className='hoverable' onClick={() => this.handleActivate(record.id)} type='primary'>Activate</Button>
        }, {
            title: 'Views',
            className: 'hideforpdf',
            key: 'details',
            width: '10%',
            render: (text, record) => <Button className='hoverable' onClick={() => this.handleViewDetails(record.id)} type='primary'>View
                Details</Button>
        }];
        return (
            <div>
                <div style={{paddingBottom: 20}}>
                    <Button className='hoverable' icon='reload' type='primary' onClick={() => this.reloadData()}>Reload</Button>
                    <div style={{float: 'right'}}>
                        <Button className='hoverable' onClick={() => this.handlePDF()}>Download PDF</Button>
                    </div>
                </div>
                <Form style={{width: 300}}>
                    <Form.Item>
                        <Select placeholder='Select District' onChange={this.handleChange}>
                            <Option key={'all'} value={'all'}>All</Option>
                            {this.state.dists.map(dist => {
                                return (<Option key={dist.id} value={dist.id}>{dist.name}</Option>)
                            })}
                        </Select>
                    </Form.Item>
                </Form>
                <div id='printArea'>
                    <Table rowKey={'id'} pagination={false} columns={columns} dataSource={this.state.agents}/>
                </div>
                <Drawer
                    title="Profile Information"
                    width={900}
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <UserDetailsiew id={this.state.id} role={'cl'}/>
                </Drawer>
            </div>
        );
    }
}

export default withRouter(CLListContainer);