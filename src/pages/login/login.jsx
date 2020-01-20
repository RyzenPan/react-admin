import React, { Component } from 'react'
import { Form, Icon, Input, Button ,message} from 'antd';

import './login.less'

import {reqLogin} from "../../api"
import storageUtils from "../../utils/storageUtils"

import memoryUtils from "../../utils/memoyUtils"
import { Redirect } from 'react-router-dom';

class Login extends Component {
    render () {
        const { getFieldDecorator } = this.props.form;
        // const form = this.props.form
        
        const user = memoryUtils.user
        if(user && user._id) {
            return <Redirect to="/" />
        }
        return (
            <div className="login">
                <header className="login-header">
                    <h2>Ryzen后台管理系统</h2>
                </header>
                <section className="login-content">
                    <h3>用户登录</h3>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {
                                getFieldDecorator('username', {
                                    rules: [
                                        { required: true, message: '用户名必须填写!' },
                                        { min: 4, message: '用户名为4到16位!' },
                                        { max: 16, message: '用户名为4到16位!' },
                                        { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含数字大小英文和下划线_' }
                                    ],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="用户名"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('password', {})(
                                    <Input
                                        prefix={<Icon type="password" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="密码"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }

    handleSubmit = (e) => {
        e.preventDefault()
        // const form = this.props.form
        // const values = form.getFieldsValue()
        // console.log('handleSubmit()', values)

        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const { username, password } = values
                console.log('提交登陆请求', username, password)
                const { data:res } = await reqLogin(username,password)
                if(res.status === 0) {
                    message.success("登录成功")
                    this.props.history.replace('/')
                    // 存储到store中，保持登录
                    storageUtils.saveUser(res.data)
                } else {
                    message.error(res.msg)
                }
                
            } else {
                console.log(err)
            }
        })
    }
}


// 包装整个组件，使得props获取到form
const WrapLogin = Form.create()(Login)
export default WrapLogin