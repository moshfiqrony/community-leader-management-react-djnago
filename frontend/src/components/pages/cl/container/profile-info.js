import React from "react";

import {Col, Divider, Layout, Row,} from "antd";

const {
    Content
} = Layout;

const DescriptionItem = ({title, content}) => (
    <div
        style={{
            fontSize: 14,
            lineHeight: '22px',
            marginBottom: 7,
            color: 'rgba(0,0,0,0.65)',
        }}
    >
        <p
            style={{
                marginRight: 8,
                display: 'inline-block',
                color: 'rgba(0,0,0,0.85)',
            }}
        >
            {title}:
        </p>
        {content}
    </div>
);

const pStyle = {
    fontSize: 20,
    color: 'rgba(0,0,0,0.85)',
    lineHeight: '24px',
    display: 'block',
    marginBottom: 16,
};

class Profile extends React.Component {
    render() {
        return (
            <Content style={{margin: '24px 16px 0', overflow: 'initial'}}>
                <div style={{padding: 24, background: '#fff', textAlign: 'center', minHeight: '79vh'}}
                     className='center'>
                    <p style={pStyle}>Personal Information</p>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="Full Name" content="Lily"/>{' '}
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="Account" content="AntDesign@example.com"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="City" content="HangZhou"/>
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="Country" content="China🇨🇳"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="Birthday" content="February 2,1900"/>
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="Website" content="-"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <DescriptionItem
                                title="Message"
                                content="Make things as simple as possible but no simpler."
                            />
                        </Col>
                    </Row>
                    <Divider/>
                    <p style={pStyle}>Company</p>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="Position" content="Programmer"/>
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="Responsibilities" content="Coding"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="Department" content="AFX"/>
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="Supervisor" content={<a href='#name'>Lin</a>}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <DescriptionItem
                                title="Skills"
                                content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
                            />
                        </Col>
                    </Row>
                    <Divider/>
                    <p style={pStyle}>Contacts</p>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="Email" content="AntDesign@example.com"/>
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="Phone Number" content="+86 181 0000 0000"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <DescriptionItem
                                title="Github"
                                content={(
                                    <a href="http://github.com/ant-design/ant-design/">
                                        github.com/ant-design/ant-design/
                                    </a>
                                )}
                            />
                        </Col>
                    </Row>
                </div>
            </Content>
        )
    }
}


export default Profile;