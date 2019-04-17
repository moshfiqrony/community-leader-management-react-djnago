import React from 'react';
import {Button, Drawer, Icon, Input, Table, Card} from 'antd';
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

    hrs24() {
        let cnt = 0;
        this.state.agents.map(record => {
            if (((new Date()) - (new Date(record._submission_time + '+0000'))) / 1000 < 3600 * 24) {
                cnt++;
            }
        });
        return cnt;
        console.log('I am called24');
    }

    avgSubmission() {

        let tmp1 = 0;
        this.state.agents.map(record => {
            let dur = ((new Date(record.end + '00').getTime() - new Date(record.start + '00').getTime()));
            tmp1 += dur;
        });

        {
        let dur;
        let tmp;
        let ar;
        let d, h, m, s;
        tmp1 = tmp1/this.state.agents.length;
        if (tmp1 / 1000 / 60 > 60) {
            // we got minute
            if (tmp1 / 1000 / 60 / 60 > 24) {
                d = parseInt((tmp1/1000/60/60/24).toString())
                h = parseInt(((tmp1/1000/60/60)%24).toString());
                m = parseInt(((tmp1/1000/60)%60).toString());
                s = parseInt(((tmp1/1000)%60).toString());
                dur = d + 'd ' + h + 'h ' + m + 'm '+ s + 's ';
            } else {
                h = parseInt((tmp1/1000/60/60).toString());
                m = parseInt(((tmp1/1000/60)%60).toString());
                s = parseInt(((tmp1/1000)%60).toString());
                dur = h + 'h ' + m + 'm '+ s + 's ';
            }
        } else {
                m = parseInt(((tmp1/1000/60)%60).toString());
                s = parseInt(((tmp1/1000)%60).toString());
                dur = m + 'm '+ s + 's ';
        }
        return dur;
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

    handleDuration(time) {
        let dur;
        let tmp;
        let ar;
        let d, h, m, s;
        if (time / 1000 / 60 > 60) {
            // we got minute
            if (time / 1000 / 60 / 60 > 24) {
                d = parseInt((time/1000/60/60/24).toString())
                h = parseInt(((time/1000/60/60)%24).toString());
                m = parseInt(((time/1000/60)%60).toString());
                s = parseInt(((time/1000)%60).toString());
                dur = d + 'd ' + h + 'h ' + m + 'm '+ s + 's ';
            } else {
                h = parseInt((time/1000/60/60).toString());
                m = parseInt(((time/1000/60)%60).toString());
                s = parseInt(((time/1000)%60).toString());
                dur = h + 'h ' + m + 'm '+ s + 's ';
            }
        } else {
                m = parseInt(((time/1000/60)%60).toString());
                s = parseInt(((time/1000)%60).toString());
                dur = m + 'm '+ s + 's ';
        }
        return dur;
    }


    render() {
        const columns = [
            {
                title: 'Survey Location',
                dataIndex: '_xform_id_string',
                key: '_xform_id_string',
                width: '10%',
                ...this.getColumnSearchProps('_xform_id_string'),
            },

            {
                title: 'Submitted by',
                dataIndex: '_submitted_by',
                key: '_submitted_by',
                width: '10%',
                ...this.getColumnSearchProps('_submitted_by'),
            },
            {
                title: 'Start',
                dataIndex: 'start',
                key: 'start',
                width: '25%',
                render: (text, record) =>
                    <div>{(new Date(record.start + '00')).toLocaleString('en-US', {
                        timeZone: 'Asia/Dhaka',
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    })}</div>
                // ...this.getColumnSearchProps('start'),
            },
            {
                title: 'End',
                dataIndex: 'end',
                key: 'end',
                width: '25%',
                // ...this.getColumnSearchProps('end'),
                render: (text, record) =>
                    <div>{(new Date(record.end + '00')).toLocaleString('en-US', {
                        timeZone: 'Asia/Dhaka',
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    })}</div>,
            },
            {
                title: 'Duration',
                key: 'duration',
                width: '8%',
                render: (text, record) => this.handleDuration(((new Date(record.end + '00').getTime() - new Date(record.start + '00').getTime()))),
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
                    <p>{(new Date(record._submission_time + '+0000')).toLocaleString('en-US', {
                        timeZone: 'Asia/Dhaka',
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    })}</p>
            }
        ];

        return (
            <div>
                <div style={{padding: '0px 10px 0px 10px', overflow: 'auto'}}>
                            <div style={{width: '1200', margin: '0 auto', overflow: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <div style={{float: 'left', width: 300, margin: 10}}>
                                    <Card
                                        hoverable
                                        title={'Total Submissions'}
                                        headStyle={{
                                            backgroundColor: '#f7f7f7',
                                            color: '#3F4654',
                                            border: '1px',
                                            borderRadius: 5,
                                            textAlign: 'center'
                                        }}
                                        style={{
                                            backgroundColor: '#f7f7f7',
                                            width: 300,
                                            color: '#3F4654',
                                            border: '1px',
                                            borderRadius: 5, textAlign: 'center',
                                        }}
                                    >
                                        <h1 style={{
                                            fontSize: 50,
                                            margin: 0,
                                            marginTop: -24
                                        }}>{this.state.agents.length}</h1>
                                    </Card>
                                </div>
                                <div style={{float: 'left', width: 'auto', margin: 10}}>
                                    <Card
                                        hoverable
                                        title={'Average Duration of Submissions'}
                                        headStyle={{
                                            backgroundColor: '#f7f7f7',
                                            color: '#3F4654',
                                            border: '1px',
                                            borderRadius: 5,
                                            textAlign: 'center'
                                        }}
                                        style={{
                                            backgroundColor: '#f7f7f7',
                                            width: 'auto',
                                            color: '#3F4654',
                                            border: '1px',
                                            borderRadius: 5,
                                            textAlign: 'center'
                                        }}
                                    >
                                        <h1 style={{
                                            fontSize: 50,
                                            margin: 0,
                                            marginTop: -24
                                        }}>{this.avgSubmission()}</h1>
                                    </Card>
                                </div>
                                <div style={{float: 'left', width: 300, margin: 10}}>
                                    <Card
                                        hoverable
                                        title={'Submissions in Last 24 Hours'}
                                        headStyle={{
                                            backgroundColor: '#f7f7f7',
                                            color: '#3F4654',
                                            border: '1px',
                                            borderRadius: 5,
                                            textAlign: 'center'
                                        }}
                                        style={{
                                            backgroundColor: '#f7f7f7',
                                            width: 300,
                                            color: '#3F4654',
                                            border: '1px',
                                            borderRadius: 5,
                                            textAlign: 'center',
                                        }}
                                    >
                                        <h1 style={{fontSize: 50, margin: 0, marginTop: -24}}>{this.hrs24()}</h1>
                                    </Card>
                                </div>
                            </div>

                            {/*<h3>Total Submissions : {this.state.agents.length}</h3>*/}
                            {/*<h3>Average Duration of Survey : {this.avgSubmission()}</h3>*/}
                            {/*<h3>Submissions in Last 24 Hours: {this.hrs24()}</h3>*/}
                            {/*<div style={{float: 'right', marginTop: 115}}>*/}
                            {/*{this.state.UpdatedData.length !== 0 ?*/}
                            {/*<CSVLink data={this.state.UpdatedData}><p style={{backgroundColor: '#40a9ff', color: '#fff',width: 107,display: 'block', border: '1px solid', borderRadius: 5, padding: 7, float: 'right', marginTop: '-2px'}}>Download CSV</p></CSVLink> : null}*/}
                            {/*</div>*/}
                        </div>
                        {/*eslint-disable*/}
                        <div style={{display: 'flex',justifyContent: 'flex-end', margin: 10}}>
                            <Button
                            htmlType='button'
                            type='primary'
                            onClick={this.handleLoad}
                        >
                            <Icon type="sync" spin={this.state.visibleLoading} />Refresh
                        </Button>
                        </div>
                <Table
                    rowKey={'meta/instanceID'}
                    style={{cursor: 'pointer'}}
                    expandRowByClick={true}
                    onRowClick={record => this.setState({
                        singleRecord: record,
                        visible: true
                    })}
                    pagination={{pageSize: 20}}
                    columns={columns}
                    dataSource={this.state.agents}/>
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
