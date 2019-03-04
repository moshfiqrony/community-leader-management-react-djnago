import React from 'react';

const data = [{
    key: '1',
    name: 'IID Youth Survey',
},{
    key: '2',
    name: 'IID Youth Survey',
},{
    key: '3',
    name: 'IID Youth Survey',
},{
    key: '4',
    name: 'IID Youth Survey',
},{
    key: '5',
    name: 'IID Youth Survey',
}
];

class CampaignList extends React.Component {

    handleClick(id){
        console.log('campaign clicked', id)
    }

    render(){
        return(
            <div>
                <table className="centered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((campaign)=>{
                            return(<tr key={campaign.key}>
                                <td>{campaign.key}</td>
                                <td><a href='#campaign' onClick={()=>this.handleClick(campaign.key)}>{campaign.name}</a></td>
                            </tr>)
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default CampaignList;