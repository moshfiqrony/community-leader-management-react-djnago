import React from 'react';
import { Card } from 'antd';


class Overview extends React.Component{
    render(){
        return(
            <div>
                <h2 className='center'>Welcome to {this.props.data.data.name} Overview</h2>
                <div style={{width: 450, margin: '0 auto'}}>
                    <div style={{width: 200, float: 'left'}}>
                        <Card
                            title="Total Agents"
                            style={{ width: 200,}}
                            >
                            <h1>{this.props.data.campCnt}</h1>
                        </Card> 
                    </div>
                    <div style={{width: 200, float: 'right'}}>
                        <Card
                            title="Total Submissions"
                            style={{ width: 200,}}
                            >
                            <h1>{this.props.data.agentCnt}</h1>
                        </Card> 
                    </div>
                </div>
            </div>
        )
    }
}


export default Overview;