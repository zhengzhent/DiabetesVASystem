// 加载 CSV 数据
d3.csv("assets1/staticdata/normalized_PatientLineData.csv").then(function(data) {
    // 将 CSV 数据转换为 ECharts 所需的格式
    var chartData = data.map(function(d) {
        return [
            parseFloat(d.HbA1c),
            parseFloat(d.Triglyceride),
            parseFloat(d["Uric Acid"]),
            parseFloat(d["Total Cholesterol"]),
            parseFloat(d["C-peptide"]),
            parseFloat(d["Age"]),
            parseFloat(d.Comorbidities)
        ];
    });

    var dimensions = ['HbA1c', 'Triglyceride', 'Uric Acid', 'Total Cholesterol', 'C-peptide', 'Age'];
    var barHeights = [400, 280, 240, 200, 192, 184]; 
    var option = {
        // title: [
        //     {
        //       text: 'Parallel coordinate MPINF',
        //       top: 0,
        //       left: 300,
        //       textStyle: {
        //         color: '#fff',
        //         fontSize:30
        //       }
        //     }
        //   ],
        tooltip: {
            formatter: function (params) {
                var tooltipContent = 'Patient Number: ' + data[params.dataIndex]['Patient Number'] + '<br/>';
                for (var i = 0; i < params.data.value.length; i++) {
                    tooltipContent += dimensions[i] + ': ' + params.data.value[i] + '<br/>';
                }
                return tooltipContent;
            }
        },
        parallelAxis: [
            {dim: 0, name: dimensions[0], 
                axisLabel: {fontSize: 30, color: '#ffffff'}, 
                axisLine: {lineStyle: {color: '#ffffff'}},
                nameTextStyle: {fontSize: 25, color: '#ffffff'} // 调整名字大小为 16px
            },
            {dim: 1, name: dimensions[1], 
                axisLabel: {fontSize: 30, color: '#ffffff'}, 
                axisLine: {lineStyle: {color: '#ffffff'}},
                nameTextStyle: {fontSize: 25, color: '#ffffff'} // 调整名字大小为 16px
            },
            {dim: 2, name: dimensions[2], 
                axisLabel: {fontSize: 30, color: '#ffffff'}, 
                axisLine: {lineStyle: {color: '#ffffff'}},
                nameTextStyle: {fontSize: 25, color: '#ffffff'} // 调整名字大小为 16px
            },
            {dim: 3, name: dimensions[3], 
                axisLabel: {fontSize: 30, color: '#ffffff'}, 
                axisLine: {lineStyle: {color: '#ffffff'}},
                nameTextStyle: {fontSize: 25, color: '#ffffff'} // 调整名字大小为 16px
            },
            {dim: 4, name: dimensions[4], 
                axisLabel: {fontSize: 30, color: '#ffffff'}, 
                axisLine: {lineStyle: {color: '#ffffff'}},
                nameTextStyle: {fontSize: 25, color: '#ffffff'} // 调整名字大小为 16px
            },
            {dim: 5, name: dimensions[5], 
                axisLabel: {fontSize: 30, color: '#ffffff'}, 
                axisLine: {lineStyle: {color: '#ffffff'}},
                nameTextStyle: {fontSize: 25, color: '#ffffff'} // 调整名字大小为 16px
            }
        ],
        parallelAxisDefault: {
            type: 'value',
            nameLocation: 'end',
            nameGap: 20,
            axisLine: {lineStyle: {color: '#ffffff'}},
            axisLabel: {
                show: true,
                color: '#ffffff', // 标签颜色
                fontSize: 10,     // 标签字体大小
                formatter: function (value) {
                    return value; // 可以使用自定义格式化函数
                }
            }
        },
        parallel: {
            top: '10%',
            bottom: '10%',
            parallelAxisDefault: {
                type: 'value',
                nameLocation: 'end',
                nameGap: 20
            }
        },
        legend: {
            data: ['None', 'Comorbidities'],
            textStyle: {
                color: '#ffffff',
                fontSize: 20
            }, 
        //    left: 'center',
            x:'right',
            y:'bottom',
            right:'100px'
        },
        series: [
            {
                name: 'Parallel Coordinates',
                type: 'parallel',
                lineStyle: {
                    width: 4,
                    opacity: 0.2,
                    smooth: true
                },
                data: chartData.map(function(item) {
                    var color;
                    if (item[6] === 0) {
                        color = '#925EB0'; // Green for Comorbidities 0
                    } else if (item[6] === 1) {
                        color = '#7AB656'; // Red for Comorbidities 1
                    } else {
                        color = '#CC7C71'; // Blue for Comorbidities 2
                    }
                    return {
                        value: item.slice(0, -1),
                        lineStyle: {color: color}
                    };
                }),
                emphasis: {
                    lineStyle: {
                        width: 6
                    }
                }
            },
            {
                name: 'None',
                type: 'parallel',
                lineStyle: {
                    width: 4,
                    color: '#925EB0',
                    type: 'dashed',
                    opacity: 0.9
                },
                data: [
                    calculateMeanForComorbidities(chartData, 0, dimensions.length)
                ],
                emphasis: {
                    lineStyle: {
                        width: 4,
                        opacity: 0.9
                    }
                }
            },
            {
                name: 'Comorbidities',
                type: 'parallel',
                lineStyle: {
                    width: 4,
                    color: '#7AB656',
                    type: 'dashed',
                    opacity: 0.9
                },
                data: [
                    calculateMeanForComorbidities(chartData, 1, dimensions.length)
                ],
                emphasis: {
                    lineStyle: {
                        width: 4
                    }
                }
            },
            {
                name: 'Mean Line for Comorbidities 2',
                type: 'parallel',
                lineStyle: {
                    width: 4,
                    color: '#CC7C71',
                    type: 'dashed',
                    opacity: 0.9
                },
                data: [
                    calculateMeanForComorbidities(chartData, 2, dimensions.length)
                ],
                emphasis: {
                    lineStyle: {
                        width: 4,
                        opacity: 1
                    }
                }
            }
        ],
        graphic: barHeights.map((height, index) => ({
            type: 'rect',
            shape: {
                x: index * 295 + 75,
                y: 630 - height,
                width: 20,
                height: height
            },
            style: {
                fill: 'rgba(204,132, 34, 1)'
            }
        }))
    };

    var myChart = echarts.init(document.getElementById('parallel-container'));
    myChart.setOption(option);
    var table = $('#example').DataTable();
    // 获取表格行点击事件
    $('#example tbody').on('click', 'tr', function() {
        // 获取被点击行的数据
        const rowData = table.row(this).data();
        
        // 假设表格中的 ID 列的列索引为 0
        const patientId = rowData[0];
        
        highlightPatient(patientId, myChart, data);
    });
});

function calculateMeanForComorbidities(data, comorbidities, dimensions) {
    var sums = new Array(dimensions).fill(0);
    var count = 0;

    for (var i = 0; i < data.length; i++) {
        if (data[i][dimensions] === comorbidities) {
            for (var j = 0; j < dimensions; j++) {
                sums[j] += data[i][j];
            }
            count++;
        }
    }

    var means = sums.map(function(sum) {
        return sum / count;
    });

    return means;
}

function highlightPatient(patientId, myChart, data) {
    const option = myChart.getOption();
    
    // 找到平行坐标图数据中对应的项目索引
    const dataIndex = data.findIndex(d => d['Patient Number'] === patientId);
    console.log(dataIndex)
    if (dataIndex !== -1) {
        const originalColor = option.series[0].data[dataIndex].lineStyle.color;
        option.series[0].data.forEach((d, i) => {
            const color = i === dataIndex ? originalColor : d.lineStyle.color;
            d.lineStyle = {
                opacity: i === dataIndex ? 0.8 : 0.2,
                color: color,
                width: i === dataIndex ? 6 : 2
            }
        });
        myChart.setOption(option);
    }
}