import React from 'react';
import axios from 'axios';
import {withRouter} from "react-router-dom";
import {Button, Form, Layout, Select} from 'antd';
import SiderMain from "../../../sidebar/sidebar-dashboard";
import HeaderMain from "../../../header/header-main";
import FooterMain from "../../../footer/footer-main";
import {connect} from "react-redux";
import {baseurl} from '../../../config'
import {loadUsers} from "../../../../actions";
import {bindActionCreators} from "redux";


const {Option} = Select;


class RegistrationForm extends React.Component {
    constructor() {
        super();
        this.state = {
            cl: [],
        };
    }

    componentDidMount() {
        axios.get(baseurl + `/api/cl/${this.props.loggedInUser.id}/`)
            .then(res => this.setState({
                cl: res.data,
            }))
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            axios.get(baseurl + `/api/cl/${this.props.loggedInUser.id}/`)
                .then(res => this.setState({
                    cl: res.data,
                }))
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let name = e.target.name1.value;
        let gender = e.target.gender.value;
        let address = e.target.address.value;
        let mar_status = e.target.mar_status.value;
        let empl_status = e.target.empl_status.value;
        let bkash = e.target.bkash.value;
        let pic = e.target.elements.pic.files[0];
        let nid = e.target.elements.nid.files[0];
        let bid = e.target.elements.bid.files[0];
        let fd = new FormData();
        fd.append('name', name);
        fd.append('gender', gender);
        fd.append('address', address);
        fd.append('mar_status', mar_status);
        fd.append('empl_status', empl_status);
        fd.append('bkash', bkash);
        if(pic !== undefined){
           fd.append('profile_pic', pic);
        }
        if(nid !== undefined){
           fd.append('nid', nid);
        }
        if(bid !== undefined){
           fd.append('bid', bid);
        }
        axios.patch(baseurl + `/api/cl/${this.props.loggedInUser.id}/`, fd)
            .then(res => {
                if (res.statusText === 'OK') {
                    this.props.history.push('/cl/profile');
                }
            })
    };


    render() {
        const {getFieldDecorator} = this.props.form;
        const s = {
            width: '488px',
            border: '1px solid #F0F0F0',
            borderRadius: 5,
            paddingLeft: 10,
        };
        if (this.state.cl.length !== 0) {
            return (
                <div>
                    <Layout>
                        <SiderMain/>
                        <Layout style={{marginLeft: 200}}>
                            <HeaderMain data={'Profile Edit'}/>
                            <div style={{
                                margin: '24px 16px 0',
                                overflow: 'initial',
                                backgroundColor: '#fff',
                                padding: 10
                            }}>
                                <div style={{width: 500, margin: '0 auto'}}>
                                    <Form onSubmit={this.handleSubmit}>
                                        <Form.Item label="Full Name">
                                            <input
                                                style={s}
                                                required
                                                defaultValue={this.state.cl.name}
                                                name={'name1'}
                                                className={'browser-default'}/>
                                        </Form.Item>
                                        <Form.Item label="Gender">
                                            <select name={'gender'} required
                                                    defaultValue={this.state.cl.gender !== null ? this.state.cl.gender : ''}
                                                    className={'browser-default'}>
                                                {/*// eslint-disable-next-line*/}
                                                {this.state.cl.gender === null ?
                                                    <option key={0} disabled value={''}>Select a Value</option> : null}
                                                <option key={1} value={'Male'}>Male</option>
                                                <option key={2} value={'Female'}>Female</option>
                                                <option key={3} value={'3rd Gender'}>3rd Gender</option>
                                            </select>
                                        </Form.Item>
                                        <Form.Item label="Address">
                                            <input style={s}
                                                   required
                                                   name={'address'}
                                                   defaultValue={this.state.cl.address}
                                                   className={'browser-default'}/>
                                        </Form.Item>
                                        <Form.Item label="Marital Status">
                                            <select name={'mar_status'} required
                                                    defaultValue={this.state.cl.mar_status !== null ? this.state.cl.mar_status : ''}
                                                    className={'browser-default'}>
                                                {/*// eslint-disable-next-line*/}
                                                {this.state.cl.mar_status === null ?
                                                    <option key={0} disabled value={''}>Select a Value</option> : null}
                                                <option key={1} value={'Married'}>Married</option>
                                                <option key={2} value={'Unmarried'}>Unmarried</option>
                                                <option key={3} value={'Widowed'}>Widowed</option>
                                                <option key={4} value={'Separated'}>Separated</option>
                                                <option key={5} value={'Divorced'}>Divorced</option>
                                            </select>
                                        </Form.Item>
                                        <Form.Item label="Employment Status">
                                            <select name={'empl_status'} required
                                                    defaultValue={this.state.cl.empl_status !== null ? this.state.cl.empl_status : ''}
                                                    className={'browser-default'}>
                                                {/*// eslint-disable-next-line*/}
                                                {this.state.cl.empl_status === null ?
                                                    <option key={0} disabled value={''}>Select a Value</option> : null}
                                                <option key={1} value={'Student'}>Student</option>
                                                <option key={2} value={'Looking For A Job'}>Looking For A Job</option>
                                                <option key={3} value={'Part-Time Job'}>Part-Time Job</option>
                                                <option key={4} value={'Full-Time Job'}>Full-Time Job</option>
                                                <option key={5} value={'Business Person'}>Business Person</option>
                                                <option key={6} value={'Housewife'}>Housewife</option>
                                                <option key={7} value={'Others'}>Others</option>
                                            </select>
                                        </Form.Item>
                                        <Form.Item label="Bkash">
                                            <input
                                                style={s}
                                                required
                                                defaultValue={this.state.cl.bkash}
                                                name={'bkash'}
                                                className={'browser-default'}/>
                                        </Form.Item>
                                        <Form.Item label="Upload Profile Pic">
                                            <input type={'file'} name={'pic'} className={'browser-default'}/>
                                        </Form.Item>
                                        <Form.Item label="Upload NID">
                                            <input type={'file'} name={'nid'} className={'browser-default'}/>
                                        </Form.Item>
                                        <Form.Item label="Upload BID">
                                            <input type={'file'} name={'bid'} className={'browser-default'}/>
                                        </Form.Item>
                                        <Form.Item>
                                            <Button type="primary" htmlType="submit">Update</Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </div>
                            <FooterMain/>
                        </Layout>
                    </Layout>
                </div>
            );
        } else {
            return (
                <h1 className={'center'}>Loading.......</h1>
            )
        }
    }
}


const WrappedRegistrationForm = Form.create({name: 'register'})(RegistrationForm);

function mapStateToProps(state) {
    return {
        loggedInUser: state.users,
    }

}

function mapDispatchToProps(dispatch){
    return(bindActionCreators({loadUsers: loadUsers}, dispatch))
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WrappedRegistrationForm));