import React, { Component } from 'react'
import { Modal } from 'antd';
import memoyUtils from "../../utils/memoyUtils.js"
import storageUtils from "../../utils/storageUtils.js"
import { formateDate } from '../../utils/dateUtils'
import { reqWeather } from "../../api"
import memuList from "../../config/memuConfig.js"


import "./index.less"
import { withRouter } from 'react-router-dom'

class Header extends Component {

    state = {
        nowTime: '',
        dayPictureUrl: '',
        weather: ''
    }

    getNowTime = () => {
        const nowTime = formateDate(new Date())
        this.setState({ nowTime })
    }

    componentDidMount () {
        this.intervalID = setInterval(() => {
            this.getNowTime()
        }, 1000);
        this.getWeather()
    }

    getTitleName = () => {
        const path = this.props.location.pathname
        let title
        memuList.forEach(item => {
            if (item.key === path) {
                title = item.title
            } else if (item.children) {
                item.children.forEach(item2 => {
                    if (item2.key === path) {
                        title = item2.title
                    }
                })
            }
        })
        return title
    }

    getWeather = async () => {
        const { dayPictureUrl, weather } = await reqWeather('广州')
        this.setState({
            dayPictureUrl,
            weather
        })
    }

    render () {
        const username = memoyUtils.user.username
        const nowTime = this.state.nowTime
        const { dayPictureUrl, weather } = this.state
        const title = this.getTitleName()
        return (
            <div className="header">
                <div className="headerTop">
                    <span className="username">欢迎, {username}</span>
                    <a href="javascritp:;" onClick={this.logout}>退出</a>
                </div>
                <div className="headerBottom">
                    <div className="headerBottom-left">{title}</div>
                    <div className="headerBottom-right">
                        <span>{nowTime}</span>
                        <img src={dayPictureUrl} alt="" />
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }

    logout= ()=> {
        const { confirm } = Modal;
        confirm({
            title: '确定要退出吗？',
            onOk: ()=> {
                // 删除所有用户数据
                memoyUtils.user = {}
                storageUtils.removeUser()
                // 跳转到登录页面
                this.props.history.replace('/login')
                clearInterval(this.intervalID)
            }
        });

    }
}

export default withRouter(Header)