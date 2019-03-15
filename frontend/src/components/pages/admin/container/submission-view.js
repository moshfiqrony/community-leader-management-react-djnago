import React from 'react';
import axios from 'axios';
import {Button, Drawer, Icon, Input, Table} from 'antd';
import Highlighter from 'react-highlight-words';
import CampaignDataDetailView from "./CampaignDataDetailView"


class CampaignDataTabularView extends React.Component {
    constructor() {
        super();
        this.state = {
            searchText: '',
            agents: [],
            visible: false,
            id: '',
            singleRecord: {},
        };
    }

    componentDidMount() {
        axios.get('http://192.168.2.198:8000/api/campaigndata/')
        .then(res => this.setState({
                agents: res.data,
            }))
        .catch(err => {
            console.log(err);
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

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

    handleViewDetails(record) {
        console.log(record);
        this.setState({
            visible: true,
            singleRecord: record,
        })
    }

    onClose = () => {
        this.setState({
            singleRecord: {},
            visible: false,
            id: '',
        });
    };


    render() {
        const columns = [
            {
                title: 'UUID',
                dataIndex: 'meta/instanceID',
                key: 'meta/instanceID',
                width: '35%',
                ...this.getColumnSearchProps('meta/instanceID'),
            },
            {
                title: 'Start',
                dataIndex: 'start',
                key: 'start',
                width: '20%',
                ...this.getColumnSearchProps('start'),
            },
            {
                title: 'End',
                dataIndex: 'end',
                key: 'end',
                width: '20%',
                ...this.getColumnSearchProps('end'),
            },
            {
                title: 'Submission Time',
                dataIndex: '_submission_time',
                key: '_submission_time',
                width: '25%',
                defaultSortOrder: 'descend',
                sorter: (a, b) => new Date(a._submission_time) - new Date(b._submission_time),
                ...this.getColumnSearchProps('_submission_time'),
            }
            ,{
                title: 'Action',
                key: 'details',
                width: '10%',
                render: (text, record) => <Button type='primary' onClick={() => this.handleViewDetails(record)}>View Details</Button>
            }
        ];

        return (
            <div>
                {/* <Button htmlType='button' type='primary' icon='reload' onClick={this.handleLoad}>Reload</Button> */}
                    {/*eslint-disable*/}
                <Table rowKey={'meta/instanceID'} pagination={{pageSize: 7}} columns={columns} dataSource={this.state.agents}/>
                <Drawer
                    title={'Submission : '+this.state.singleRecord['meta/instanceID']}
                    width={700}
                    placement="right"
                    closable={true}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                <CampaignDataDetailView data={this.state.singleRecord}/>
                </Drawer>
            </div>
        );
    }
}

export default CampaignDataTabularView;