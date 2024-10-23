import { createSlice } from "@reduxjs/toolkit";

const tabSlice =  createSlice({
    name:'tab',
    initialState:{
        isCollapse:false,
        tabList:[{
            path:'/',
            name:'home',
            label:'首页'
        }]
    },
    reducers:{
        collapseMenu:state=>{
            state.isCollapse =! state.isCollapse
        },
        setTabList:(state,{payload:val})=>{
            if(val.name!=='home'){
                //如果已存在 tab 则不需要 push
               if(!state.tabList.some(item=>item.name === val.name)){
                state.tabList.push(val)
               }
            }
        }
    }
})

export const { collapseMenu,setTabList } = tabSlice.actions
export default tabSlice.reducer
