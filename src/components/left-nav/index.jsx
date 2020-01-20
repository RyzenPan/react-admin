import React, { Component } from 'react'
import { Menu, Icon } from 'antd';

import memuList from "../../config/memuConfig"

import "./index.less"
import { Link, withRouter } from 'react-router-dom';
const { SubMenu } = Menu;

class LeftNav extends Component {
    getMenuNodes = (memuList) => {
        // eslint-disable-next-line array-callback-return
        return memuList.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                const path = this.props.location.pathname
                const CItem = item.children.find(cItem =>{
                    return cItem.key === path
                })
                
                if(CItem) {
                    this.openKey = item.key
                }
                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }
        })
    }
    
    componentWillMount(){
        this.menuNodes = this.getMenuNodes(memuList)
    }

    render () {
        const path = this.props.location.pathname
        const openKey = this.openKey
        
        return (
            <div className="left-nav">
                <header>Ryzen Soft System</header>
                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={path}
                    defaultOpenKeys={[openKey]}
                // inlineCollapsed={this.state.collapsed}
                >
                    {this.menuNodes}
                </Menu>
            </div>
        )
    }
}

export default withRouter(LeftNav)