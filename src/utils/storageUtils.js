// 保存登录数据到store中,自动转换成json
import store from "store"
const USER_KEY = "user_key"

export default {
    saveUser(user){
        store.set(USER_KEY,user)
    },
    
    getUser(){
        return store.get(USER_KEY) || {}
    },
    
    removeUser(){
        store.remove(USER_KEY)
    }
}