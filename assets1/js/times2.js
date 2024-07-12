
const tableBody = document.getElementById('patients-data');
var boxplotChart = echarts.init(document.getElementById('boxplotChart'));
var scatterplotChart = echarts.init(document.getElementById('scatterplotChart'));
var parsedData;
let patientsData; // 定义一个变量在全局存储病人数据

// 从JSON文件中获取病人数据
fetch('assets1/staticdata/shanghaiinformations.json')
  .then(response => response.json())
  .then(data => {
    patientsData = data; // 将数据存储在全局变量中
  });
  function parseCSV(data) {
    const dailyData = {};

    data.forEach(function(d) {
        const datetime = new Date(d.Date);
        if (!isNaN(datetime.getTime())) {
          const date = datetime.toISOString().split('T')[0]; // 提取日期部分
          const time = datetime.toISOString().split('T')[1].split(':').slice(0, 2).join(':'); // 提取时间部分
          const values = parseFloat(d['CGM (mg / dl)']);
          const specialEvent = d['Dietary intake'] || d['Insulin dose - s.c.'];
          if (!dailyData[date]) {
              dailyData[date] = [{ time, values, specialEvent }];
          } else {
              dailyData[date].push({ time, values, specialEvent });
          }
      } else {
          console.error('Invalid or empty date value');
      }

    });

    // 将每天的血糖数据整理成数组
    const groupedData = Object.keys(dailyData).map(function(date) {
        const values = dailyData[date];
        const median = d3.median(values.map(d => d.values));
        const q1 = d3.quantile(values.map(d => d.values), 0.25);
        const q3 = d3.quantile(values.map(d => d.values), 0.75);
        const min = d3.min(values.map(d => d.values));
        const max = d3.max(values.map(d => d.values));

        return { date, min, q1, median, q3, max, values };
    });
    console.log(groupedData)
    return groupedData;
}


function renderBoxplot(dynamicData) {
  // ECharts 箱型图配置
    var optionBoxplot = {
        // title: {
        //     text: 'Chronological blood glucose',
        //     top: '5px',
        //     left: 'center',
        //     textStyle: {
        //         color: '#ffffff', // 字体颜色调白
        //         fontSize: 25 // 字体大小调大
        //     }
        // },
        tooltip: {
            trigger: 'item',
            axisPointer: {
                type: 'shadow'
            }
        },
        xAxis: {
            type: 'category',
            name: 'Date',
            data: dynamicData.map(function(item) {
                return item.date;
            }),
            axisLabel: {
                formatter: function (value) {
                    // 自定义格式化函数，只显示月份和日期
                    const date = new Date(value);
                    const month = date.getMonth() + 1; // 月份从0开始，需要加1
                    const day = date.getDate();
                    return month + '-' + day;
                },
                textStyle: {
                    color: 'white',  // 设置坐标轴文字颜色为白色
                    fontSize: 25
                },
            },
            nameTextStyle:{
                color:'white',
                fontSize:20,
                location:'down'
            }
        },
        yAxis: {
            type: 'value',
            name: 'CGM (mg/dl)',
            axisLabel: {
                textStyle: {
                    color: 'white',  // 设置坐标轴文字颜色为白色
                    fontSize: 25
                }
            },
            nameTextStyle: {
                color: 'white',  // 设置坐标轴名称颜色为白色
                fontSize: 20
            }
      },
      series: [{
          type: 'boxplot',
          data: dynamicData.map(function(item) {
              return [item.min, item.q1, item.median, item.q3, item.max];
          }),
          itemStyle: {
              color: 'white',
          },
          emphasis: {
              itemStyle: {
                  color: '#FF5722',
                  borderColor: '#FF5722'
              }
          }
      }]
  };

  // 点击箱型图事件
  boxplotChart.on('click', function(params) {

      if (params.seriesType === 'boxplot') {
          // 获取点击的日期
          var clickedDate = params.name;

          // 根据点击日期渲染对应的时序散点图
          renderScatterplot(clickedDate);

      }
  });

  // 使用刚指定的配置项和数据显示箱型图。
  boxplotChart.setOption(optionBoxplot);
}

function renderScatterplot(date) {
  // 找到对应日期的数据
  var selectedData = parsedData.find(function(item) {
      return item.date === date;
  });
  // ECharts 散点图配置
  var optionScatterplot = {
      legend: {
          data: ['CGM > 180', 'CGM 70-180', 'CGM < 70'],
          textStyle: {
            color: 'white',  // 设置图例文字颜色为白色
            fontSize: 25
        }
      },
      xAxis: {
          type: 'category',
          name: 'Time',
          data: selectedData.values.map(function(d) {
              return d.time;
          }),
          axisLabel: {
            textStyle: {
                color: 'white',  // 设置坐标轴文字颜色为白色
                fontSize: 25
            }
        },
        nameTextStyle: {
            color: 'white',  // 设置坐标轴名称颜色为白色
            fontSize: 20
        }
      },
      yAxis: {
          type: 'value',
          name: 'CGM (mg/dl)',
          axisLabel: {
            textStyle: {
                color: 'white',  // 设置坐标轴文字颜色为白色
                fontSize: 25
            }
        },
        nameTextStyle: {
          color: 'white',  // 设置坐标轴名称颜色为白色
          fontSize: 20
      }
      },
      tooltip: {
          trigger: 'item',
          formatter: function(params) {
              return 'Time: ' + params.name + '<br>CGM: ' + params.value[1] + '(mg / dl)';
          }
      },
      series: [{
          name: 'CGM > 180',
          type: 'scatter',
          data: selectedData.values.filter(function(d) {
              return d.values > 180;
          }).map(function(d) {
              return {
                  name: d.time,
                  value: [d.time, d.values],
                  specialEvent: d['Dietary intake'] || d['Insulin dose - s.c.']
              };
          }),
          symbolSize: 12,
          itemStyle: {
              color: '#8a84c8' 
          },
          markPoint: {
          symbol: 'triangle',
          symbolSize: 12,
          itemStyle: {
      color: 'blue'
  },
          data: selectedData.values.filter(function(d) {
              return d.specialEvent;
          }).map(function(d) {
              return {
                  name: d.time,
                  coord: [d.time, d.values],
                  specialEvent: d.specialEvent
              };
          }),
          symbolOffset: [0, '85%'],
          tooltip: {
              formatter: function(params) {
                  return 'Time: ' + params.name + '<br>Special Event: ' + params.data.specialEvent;
              }
          }
      }
      }, {
          name: 'CGM 70-180',
          type: 'scatter',
          data: selectedData.values.filter(function(d) {
              return d.values >= 70 && d.values <= 180;
          }).map(function(d) {
              return {
                  name: d.time,
                  value: [d.time, d.values],
                  specialEvent: d['Dietary intake'] || d['Insulin dose - s.c.']
              };
          }),
          symbolSize: 12,
          itemStyle: {
              color: '#82d6c3' // Color for CGM 90-180
          },
          markPoint: {
          symbol: 'triangle',
          symbolSize: 12,
          itemStyle: {
      color: 'blue'
  },
          data: selectedData.values.filter(function(d) {
              return d.specialEvent;
          }).map(function(d) {
              return {
                  name: d.time,
                  coord: [d.time, d.values],
                  specialEvent: d.specialEvent
              };
          }),
          symbolOffset: [0, '85%'],
          tooltip: {
              formatter: function(params) {
                  return 'Time: ' + params.name + '<br>Special Event: ' + params.data.specialEvent;
              }
          },
      }
      }, {
          name: 'CGM < 70',
          type: 'scatter',
          data: selectedData.values.filter(function(d) {
              return d.values < 70;
          }).map(function(d) {
              return {
                  name: d.time,
                  value: [d.time, d.values],
                  specialEvent: d['Dietary intake'] || d['Insulin dose - s.c.']
              };
          }),
          symbolSize: 12,
          itemStyle: {
              color: '#d95f02' // Color for CGM < 90
          },
          markPoint: {
          symbol: 'triangle',
          symbolSize: 12,
          itemStyle: {
      color: 'blue'
  },
          data: selectedData.values.filter(function(d) {
              return d.specialEvent;
          }).map(function(d) {
              return {
                  name: d.time,
                  coord: [d.time, d.values],
                  specialEvent: d.specialEvent
              };
          }),
          symbolOffset: [0, '85%'],
          tooltip: {
              formatter: function(params) {
                  return 'Time: ' + params.name + '<br>Special Event: ' + params.data.specialEvent;
              }
          }
      }
      }]
  };

  // 使用刚指定的配置项和数据显示散点图。
  scatterplotChart.setOption(optionScatterplot);
}


  const dChart = (selectedPatient) => {

    d3.csv('assets1/staticdata/TimeDatas1.csv').then(data => {
      console.log(data);
      const selectedPatientData = data.filter(patient => patient["Patient Number"] === selectedPatient["Patient Number"]);


      var formattedData = selectedPatientData.map(function(d) {
        var date = new Date(d.Date);
        // 将午夜之后的时间点调整到第二天
        if (date.getHours() < 12) {
            date.setDate(date.getDate() + 1);
        }
        return {
            date: date,
            cgm: +d["CGM (mg / dl)"]
            // 其他数据处理，根据需要添加
        };
    });
    formattedData.sort(function(a, b) {
      return a.date - b.date;
  });

  parsedData = parseCSV(selectedPatientData);

  renderBoxplot(parsedData);

  // 初始显示第一天的时序散点图
  renderScatterplot(parsedData[0].date);

    });
  };
  
// 使用事件委托方式为表格添加点击事件监听器
tableBody.addEventListener('click', (event) => {
  const clickedRow = event.target.closest('tr');
  if (!clickedRow) return; // 点击的不是表格行

  const patientId = clickedRow.children[0].textContent;
  const selectedPatient = patientsData.find(patient => patient["Patient Number"] === patientId);
  console.log(selectedPatient)
  if (selectedPatient) {
      dChart(selectedPatient);
  }
});
