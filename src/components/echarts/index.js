import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

//这里 echart 的样式和一些配置为固定写法的样板代码，可以先定义好，只是其中的数据需要动态传递。
const axisOption = {
    // 图例文字颜色
    textStyle: {
      color: "#333",
    },
    // 提示框
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category", // 类目轴
      data: [],
      axisLine: {
        lineStyle: {
          color: "#17b3a3",
        },
      },
      axisLabel: {
        interval: 0,
        color: "#333",
      },
    },
    yAxis: [
      {
        type: "value",
        axisLine: {
          lineStyle: {
            color: "#17b3a3",
          },
        },
      },
    ],
    color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
    series: [],
  }
  
  const normalOption = {
    tooltip: {
      trigger: "item",
    },
    color: [
      "#0f78f4",
      "#dd536b",
      "#9462e5",
      "#a6a6a6",
      "#e1bb22",
      "#39c362",
      "#3ed1cf",
    ],
    series: [],
  }

  const Echarts = ({ style, chartData, isAxisChart = true }) => {
    const echartRef = useRef()
    const echartObj  = useRef(null)
    useEffect(() => {
      let options
      if (!echartObj.current) {
        //通过 useRef 动态获取需要的 dom 对象，然后通过 echarts.init() 方法实例化 echart 对象，都在官网中有实例
        echartObj.current = echarts.init(echartRef.current)
      }
      /*
      这里仅通过一个 boolean 值判断是饼状图还是柱状图或者折线图(两个的 option 结构类似，只是 series 中的 type 不同)可能有点 hardcode，
      没法应对更多图表类型的通用情况，可以想想有没有更好的办法判断当前的 chartData 应该使用什么图表
      */
      if (isAxisChart) {
        axisOption.xAxis.data = chartData.xData
        axisOption.series = chartData.series
        options = axisOption
      } else {
        normalOption.series = chartData.series
        options = normalOption
      }
      // setOption 也是 echart 设置 option 的固定写法，官网实例有
      echartObj.current.setOption(options)
    }, [chartData])// useEffect 的 [] 参数表示根据什么值的变化来重新执行前面的代码。例如这里表示每当 chartData 发生变化，则重新配置 chart
    return (
      // echart 必须要求给 dom 设置 style，主要是高度，不清楚为什么不会自动设定。
      <div style={style} ref={echartRef}></div>
    )
  }
  
  export default Echarts