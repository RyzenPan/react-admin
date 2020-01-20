// 入口js

import React from "react"
import ReactDom from "react-dom"

import App from "./App"

import storageUtils from "./utils/storageUtils";
import memoyUtils from "./utils/memoyUtils";

const user = storageUtils.getUser()
memoyUtils.user = user

ReactDom.render(<App />,document.getElementById("root"))