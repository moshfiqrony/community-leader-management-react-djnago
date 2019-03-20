import React from 'react';
import {Button, Drawer, Icon, Input, Table} from 'antd';
import Highlighter from 'react-highlight-words';
import CampaignDataDetailView from "./CampaignDataDetailView"
import data from '../../../../reducers/pabna-survey-data';


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
        this.setState({
            agents: data,
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
                title: 'Survey Location',
                dataIndex: '_xform_id_string',
                key: '_xform_id_string',
                width: '20%',
                ...this.getColumnSearchProps('_xform_id_string'),
            },

            {
                title: 'Submitted by',
                dataIndex: '_submitted_by',
                key: '_submitted_by',
                width: '20%',
                ...this.getColumnSearchProps('_submitted_by'),
            },
            {
                title: 'Start',
                dataIndex: 'start',
                key: 'start',
                width: '20%',
		render: (text, record) =>
                    <p>{(new Date(record.start+'00')).toLocaleString('en-US', {timeZone: 'Asia/Dhaka', weekday: 'short', year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'})}</p>
                // ...this.getColumnSearchProps('start'),
            },
            {
                title: 'End',
                dataIndex: 'end',
                key: 'end',
                width: '20%',
                // ...this.getColumnSearchProps('end'),
		render: (text, record) =>
                    <p>{(new Date(record.end+'00')).toLocaleString('en-US', {timeZone: 'Asia/Dhaka', weekday: 'short', year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'})}</p>,
            },
{
                title: 'Duration',
                key: 'duration',
                width: '5%',
                render: (text, record) => <p>{((new Date(record.end+'00').getTime() - new Date(record.start+'00').getTime())/1000/60).toFixed(2)} Min</p>,
            },
            {
                title: 'Submission Time',
                dataIndex: '_submission_time',
                key: '_submission_time',
                width: '25%',
                defaultSortOrder: 'descend',
                sorter: (a, b) => new Date(a._submission_time) - new Date(b._submission_time),
                // ...this.getColumnSearchProps('_submission_time'),
		render: (text, record) =>
                    <p>{(new Date(record._submission_time+'+0000')).toLocaleString('en-US', {timeZone: 'Asia/Dhaka', weekday: 'short', year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'})}</p>
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
                <div>
                    <h1>Total Submissions : {this.state.agents.length}</h1>
                </div>
                <Table rowKey={'meta/instanceID'} pagination={{pageSize: 7}} columns={columns} dataSource={this.state.agents}/>
                <Drawer
                    title={this.state.singleRecord['_submitted_by'] + " | " + new Date(this.state.singleRecord['_submission_time']).toDateString() + " | " + new Date(this.state.singleRecord['_submission_time']).toLocaleTimeString()}
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
