import React from 'react';
import AddNewAgent from './add-new-agent';
import axios from 'axios';
import {Button, Icon, Input, Table,} from 'antd';
import Highlighter from 'react-highlight-words';


class NewAgentChecklist extends React.Component {
    state = {
        searchText: '',
        IsVisible: false,
        data: [],
        selectedAgents: [],
    };

    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/api/campaignDetails/?clId=1&campaignId=${this.props.match.params.campaignId}`)
            .then(res => this.setState({
                data: res.data,

            }))
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

    render() {
        const columns = [{
            title: 'ID',
            dataIndex: 'agentId.id',
            key: 'agentId.id',
            width: '5%',
            ...this.getColumnSearchProps('agentId.id'),
        }, {
            title: 'Name',
            dataIndex: 'agentId.name',
            key: 'agentId.name',
            width: '30%',
            ...this.getColumnSearchProps('agentId.name'),
        }, {
            title: 'Phone',
            dataIndex: 'agentId.phone',
            key: 'agentId.phone',
            width: '30  %',
            ...this.getColumnSearchProps('agentId.phone'),
        },
        ];
        return (
            <div>
                <div style={{padding: 10}}>
                    <AddNewAgent/>
                </div>
                <Table rowKey="id" pagination={{pageSize: 5}} columns={columns} dataSource={this.state.data}/>
            </div>

        );
    }
}

export default NewAgentChecklist;
