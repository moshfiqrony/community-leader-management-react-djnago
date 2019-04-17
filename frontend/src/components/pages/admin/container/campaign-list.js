import React from 'react';
import CampaignInsert from './campaign-insert';
import axios from 'axios';
import {withRouter} from "react-router-dom";

import {Button, Divider, Icon, Input, Table, Modal} from 'antd';
import Highlighter from 'react-highlight-words';


class CampaignList extends React.Component {
    constructor(){
        super();
        this.state={
            searchText: '',
            visible: false,
            name: '',
            id: '',
            campaigns: [],
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleEditCancle = this.handleEditCancle.bind(this);
        this.handleEditInsert = this.handleEditInsert.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/campaign/')
            .then(res => {
                this.setState({
                    campaigns: res.data,
                });
            });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            axios.get('http://127.0.0.1:8000/api/campaign/')
                .then(res => {
                    this.setState({
                        campaigns: res.data,
                        visible: false,
                    });
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

    handleDelete(id) {
        axios.delete(`http://127.0.0.1:8000/api/campaign/${id}/`)
            .then(res => {
                if (res.statusText === 'No Content') {
                    alert('Deleted');
                    this.props.history.push('/admin/campaignlist/');
                } else {
                    alert('Not Deleted');
                    this.props.history.push('/admin/campaignlist/');
                }
            });
    }

    handleEdit(id, name) {
        this.setState({
            visible: true,
            name: name,
            id: id,
        });
    }
    handleEditInsert(){
        let fd = new FormData();
        fd.append('name', this.state.name);
        axios.patch(`http://127.0.0.1:8000/api/campaign/${this.state.id}/`, fd)
        .then(res => {
            if(res.statusText === 'OK' && res.data.name === this.state.name){
                this.setState({
                    visible: false,
                    name: '',
                    id: '',
                })
                this.props.history.push('/admin/campaignlist');
            }else{
                alert('Problem To Save');
            }
        })
    }
    handleEditCancle(){
        this.setState({
            visible: false,
        });
    }
    handleChange(e){
        this.setState({
            name: e.target.value,
        })
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
            width: '60%',
            ...this.getColumnSearchProps('name'),
        },
            {
                title: 'Action',
                key: 'operation',
                width: '30%',
                render: (text, record) => <div>
                    <Button className='hoverable' type='primary' onClick={() => this.handleEdit(record.id, record.name)}>Edit</Button><Divider
                    type='vertical'/>
                    <Button className='hoverable' type='danger' onClick={() => this.handleDelete(record.id)}>Delete</Button>
                </div>
            }
        ];
        return (
            <div>
                <div style={{padding: 10}}>
                    <CampaignInsert/>
                </div>
                <Table rowKey={'id'} pagination={false} columns={columns} dataSource={this.state.campaigns}/>
                <Modal
                    visible={this.state.visible}
                    okText='Save'
                    onOk={this.handleEditInsert}
                    onCancel={this.handleEditCancle}
                >
                    <h5>Edit Campaign Name</h5>
                    <input type='text' name='name' value={this.state.name} onChange={this.handleChange}/>
                </Modal>
            </div>

        );
    }
}

export default withRouter(CampaignList);
