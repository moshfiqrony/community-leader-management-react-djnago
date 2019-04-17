import React from 'react';
import {withRouter} from "react-router-dom";
import AddNewAgent from './add-new-agent';
import axios from 'axios';
import {Button, Drawer, Icon, Input, Table, Tag} from 'antd';
import Highlighter from 'react-highlight-words';
import UserDetailsiew from './user-detail-view';
import {connect} from "react-redux";


class NewAgentChecklist extends React.Component {
    state = {
        searchText: '',
        IsVisible: false,
        data: [],
        selectedAgents: [],
        visible: false
    };

    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/api/campaignDetails/?clId=${this.props.user.id}&campaignId=${this.props.match.params.campaignId}`)
            .then(res => this.setState({
                data: res.data,
            }))
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props !== prevProps) {
            axios.get(`http://127.0.0.1:8000/api/campaignDetails/?clId=${this.props.user.id}&campaignId=${this.props.match.params.campaignId}`)
                .then(res => this.setState({
                    data: res.data,
                }))
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

    handleViewDetails(id) {
        console.log('I am from handle View Details, with id ', id);
        this.setState({
            visible: true,
            id: id,
        })
    }

    handleRemove(agentId, id) {
        console.log('I am from handle delete, with id ', id, agentId);
        axios.delete(`http://127.0.0.1:8000/api/addcampaignDetails/${id}/`)
            .then(res => {
                if (res.statusText === 'No Content') {
                    let fd2 = new FormData();
                    fd2.append('asign', false);
                    axios.patch(`http://127.0.0.1:8000/api/agent/${agentId}/`, fd2)
                        .then(res => {
                            if (res.statusText === 'OK') {
                                // alert('Agent Removed');
                                this.props.history.push(`/cl/campaignlist/${this.props.match.params.campaignId}`)
                            }
                        });

                }
            })
            .then(() => this.reloadData())

    }

    onClose = () => {
        this.setState({
            visible: false,
            id: '',
        });
    };

    reloadData() {
        console.log('i am on');
        axios.get(`http://127.0.0.1:8000/api/campaignDetails/?clId=${this.props.user.id}&campaignId=${this.props.match.params.campaignId}`)
            .then(res => this.setState({
                data: res.data,
            }))
    }

    handlePDF(clname) {
        let date = new Date();
        var div = "<html><head><style> .hideforpdf{display: none;}td{text-align:center;}table{border: 1px solid black;float: center;}table tr{border: 1px solid black;}table tr td{border: 1px solid black;}table tr th{border: 1px solid black;}</style></head><body>";
        div += document.getElementById('printArea').innerHTML;
        div += "</body></html>";
        var win = window.open("", "", "width=960,height=500");
        win.document.write("<center><img src='http://getd2.com/img/logo-new.png'/><h1>New Agent Check List For : " + this.props.surveyName + "</h1></center><br><br>");
        win.document.write("<center><h4>Community Leader: " + clname + "</h4></center><br><br>");
        win.document.write("<center><h4>Date: " + date + "</h4></center><br><br>");
        win.document.write(div);
        win.document.write("<br><br><center><p>&copy All Rights Reserved By D2</p><p>Developed By D2</p></center>");
        win.print();
    }

    render() {
        const columns = [{
            title: 'Agent ID',
            dataIndex: 'agentId.id',
            key: 'agentId.id',
            width: '5%',
            ...this.getColumnSearchProps('agentId.id'),
        }, {
            title: 'Name',
            dataIndex: 'agentId.name',
            key: 'agentId.name',
            width: '30%',
            render: (text, record) => record.agentId.active ? record.agentId.name :
                <Tag style={{backgroundColor: 'Red', color: '#fff'}}>{record.agentId.name} Blocked By HR, Contact HR
                    Now</Tag>,
            // ...this.getColumnSearchProps('agentId.name'),
        }, {
            title: 'Phone',
            dataIndex: 'agentId.phone',
            key: 'agentId.phone',
            width: '30  %',
            ...this.getColumnSearchProps('agentId.phone'),
        }, {
            title: 'Action',
            key: 'action',
            className: 'hideforpdf',
            width: '10%',
            render: (text, record) => <Button className='hoverable' onClick={() => this.handleRemove(record.agentId.id, record.id)}
                                              type='danger'>Remove</Button>
        }, {
            title: 'Views',
            key: 'details',
            className: 'hideforpdf',
            width: '10%',
            render: (text, record) => <Button className='hoverable' onClick={() => this.handleViewDetails(record.agentId.id)} type='primary'>View
                Details</Button>
        }
        ];
        return (
            <div>
                <AddNewAgent {...this.props}/>
                <div style={{paddingBottom: 20, paddingTop: 20}}>
                    <Button className='hoverable' icon='reload' type='primary' onClick={() => this.reloadData()}>Reload</Button>
                    <div style={{float: 'right'}}>
                        <Button className='hoverable' onClick={() => this.handlePDF(this.props.user.name)}>Download PDF</Button>
                    </div>
                </div>
                <div id='printArea'>
                    <Table rowKey="id" pagination={false} columns={columns} dataSource={this.state.data}/>
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

function mapStateToProps(state) {
    return {
        user: state.users,
    }
}


export default connect(mapStateToProps)(withRouter(NewAgentChecklist));
