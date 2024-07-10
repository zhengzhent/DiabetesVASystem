document.addEventListener('DOMContentLoaded', function () {
    // 初始化 ECharts 实例
    var myChart = echarts.init(document.getElementById('t2gform'));

// There should not be negative values in rawData
const rawData = [
[0.075,0.074,0.042,0.037,0.035,0.034],
[0.086,0.063,0.05,0.037,0.035,0.034],
[0.03,0.107,0.097,0.034,0.033,0.034],
];
const totalData = [];
for (let i = 0; i < rawData[0].length; ++i) {
let sum = 0;
for (let j = 0; j < rawData.length; ++j) {
  sum += rawData[j][i];
}
totalData.push(sum);
}
const grid = {
left: 100,
right: 100,
top: 120,
bottom: 80
};
const gridWidth = myChart.getWidth() - grid.left - grid.right;
const gridHeight = myChart.getHeight() - grid.top - grid.bottom;
const categoryWidth = gridWidth / rawData[0].length;
const barWidth = categoryWidth * 0.6;
const barPadding = (categoryWidth - barWidth) / 2;
const series = [
  {
      name: 'None',
      type: 'bar',
      stack: 'total',
      barWidth: '60%',
      itemStyle: {
          color: '#925EB0' 
      },
      label: {
          show: true,
          formatter: (params) => Math.round(params.value * 1000) / 10 + '%',
          textStyle: {
            fontSize: 25, // 调整字体大小
            color: 'white', // 设置字体颜色为白色
          }
      },
      data: rawData[0].map((d, did) =>
          totalData[did] <= 0 ? 0 : d / totalData[did]
      )
  },
  {
      name: 'Few Com',
      type: 'bar',
      stack: 'total',
      barWidth: '60%',
      itemStyle: {
          color: '#7AB656'
      },
      label: {
          show: true,
          formatter: (params) => Math.round(params.value * 1000) / 10 + '%',
          textStyle: {
            fontSize: 25, // 调整字体大小
            color: 'white', // 设置字体颜色为白色
          }
      },
      data: rawData[1].map((d, did) =>
          totalData[did] <= 0 ? 0 : d / totalData[did]
      )
  },
  {
      name: 'Numerous Com',
      type: 'bar',
      stack: 'total',
      barWidth: '60%',
      itemStyle: {
          color: '#CC7C71' // Blue
      },
      label: {
          show: true,
          formatter: (params) => Math.round(params.value * 1000) / 10 + '%',
          textStyle: {
            fontSize: 25, // 调整字体大小
            color: 'white', // 设置字体颜色为白色
          }
      },
      data: rawData[2].map((d, did) =>
          totalData[did] <= 0 ? 0 : d / totalData[did]
      )
  }
];
const color = ['#925EB0', '#7AB656', '#CC7C71'];
const elements = [];
for (let j = 1, jlen = rawData[0].length; j < jlen; ++j) {
const leftX = grid.left + categoryWidth * j - barPadding;
const rightX = leftX + barPadding * 2;
let leftY = grid.top + gridHeight;
let rightY = leftY;
for (let i = 0, len = series.length; i < len; ++i) {
  const points = [];
  const leftBarHeight = (rawData[i][j - 1] / totalData[j - 1]) * gridHeight;
  points.push([leftX, leftY]);
  points.push([leftX, leftY - leftBarHeight]);
  const rightBarHeight = (rawData[i][j] / totalData[j]) * gridHeight;
  points.push([rightX, rightY - rightBarHeight]);
  points.push([rightX, rightY]);
  points.push([leftX, leftY]);
  leftY -= leftBarHeight;
  rightY -= rightBarHeight;
  elements.push({
    type: 'polygon',
    shape: {
      points
    },
    style: {
      fill: color[i],
      opacity: 0.25
    }
  });
}
}
option = {
  title: [
    {
      text: 'Patient Category Characteristic Distribution',
      top: 0,
      left: 400,
      textStyle: {
        color: '#fff',
        fontSize: 30
      }
    }
  ],
  tooltip:{},
legend: {
  top: 60, // 可以调整这里的值来改变图例的上边距
  bottom: 20, // 可以调整这里的值来改变图例的下边距
  textStyle: {
    color: 'white', // 设置legend字体颜色为白色
    fontSize: 25
  }
},
grid,
yAxis: {
  type: 'value',
  name: 'Relative importance', // 设置Y轴名称
  nameTextStyle: {
      fontSize: 20, // 设置Y轴名称字体大小
      color: 'white' // 设置Y轴名称字体颜色为白色
  }
},
xAxis: {
  type: 'category',
   data: ['Total Cholestero', 'Age', 'Creatinine', 'BUN', '2h PPG', 'HbA1c'],
   axisLabel: {
          interval: 0, // 强制显示所有标签
          textStyle: {
            fontSize: 25 // 字体大小
          },
          color: 'white'
  }
},
series,
graphic: {
  elements
}
};

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  });