import { createSlice } from "@reduxjs/toolkit";

const tabSlice =  createSlice({
    name:'tab',
    initialState:{
        isCollapse:false,
        tabList:[{
            path:'/',
            name:'home',
            label:'首页'
        }],
        currentTab:{
            path:'/',
            name:'home',
            label:'首页'
        }
    },
    reducers:{
        collapseMenu:state=>{
            state.isCollapse =! state.isCollapse
        },
        setTabList:(state,{payload:val})=>{
            state.currentTab = val
                //如果已存在 tab 则不需要 push
               if(!state.tabList.some(item=>item.name === val.name)){
                state.tabList.push(val)
               }
        },
        setCurrentTab:(state,{payload:val})=>{
            state.currentTab = val
        },
        closeTab:(state,{payload:val})=>{
            const tabList = state.tabList
            const tabListLength = tabList.length
            const index = val.index
            /*解决 tabList 被删除干净后读取 currentTab.path undifind 的两种方式 
            * 1、当删除到最后一个时，填充默认值
            * 2、list 中只剩一个时，隐藏删除按钮
            */
            // if(tabListLength===1){
            //     state.tabList = [{
            //         path:'/',
            //         name:'home',
            //         label:'首页'
            //     }]
            //     state.currentTab={
            //         path:'/',
            //         name:'home',
            //         label:'首页'
            //     }
            //     return
            // }

            if(index === tabListLength-1){
                state.currentTab = tabList[tabListLength-2]
            }else{
                state.currentTab = tabList[index+1]
            }

            tabList.splice(index,1)
        }
    }
})

export const { collapseMenu,setTabList,setCurrentTab,closeTab } = tabSlice.actions
export default tabSlice.reducer
