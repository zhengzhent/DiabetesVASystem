var boxplotChart = echarts.init(document.getElementById('boxplotChart'));
var scatterplotChart = echarts.init(document.getElementById('scatterplotChart'));
var parsedData;
// 直接加载 CSV 文件
d3.csv('assets1/staticdata/glouse1.csv').then(function(data) {
    parsedData = parseCSV(data);

    // 使用刚指定的配置项和数据显示箱型图
    renderBoxplot(parsedData);

    // 初始显示第一天的时序散点图
    renderScatterplot(parsedData[0].date);
});

function parseCSV(data) {
    const dailyData = {};

    data.forEach(function(d) {
        const datetime = new Date(d.Date);
        const date = datetime.toISOString().split('T')[0]; // 提取日期部分
        const time = datetime.toISOString().split('T')[1].split(':').slice(0, 2).join(':'); // 提取时间部分
        const values = parseFloat(d['CGM (mg / dl)']);
        const specialEvent = d['Dietary intake'] || d['Insulin dose - s.c.'];
        if (!dailyData[date]) {
            dailyData[date] = [{ time, values,specialEvent}];
        } else {
            dailyData[date].push({ time, values,specialEvent});
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

    return groupedData;
}

function renderBoxplot(dynamicData) {
    // ECharts 箱型图配置
    var optionBoxplot = {
        title: {
            text: 'CGM Boxplot'
        },
        tooltip: {
            trigger: 'item',
            axisPointer: {
                type: 'shadow'
            }
        },
        xAxis: {
            type: 'category',
            data: dynamicData.map(function(item) {
                return item.date;
            }),
            axisLabel: {
                textStyle: {
                  fontSize: 12 // 字体大小
                },
                color: 'white'
        }
        },
        yAxis: {
            type: 'value',
            name: 'CGM (mg/dl)',
            axisLabel: {
                textStyle: {
                  fontSize: 12 // 字体大小
                },
                color: 'white'
        }
        },
        series: [{
            type: 'boxplot',
            data: dynamicData.map(function(item) {
                return [item.min, item.q1, item.median, item.q3, item.max];
            }),
            itemStyle: {
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
title: {
    text: 'CGM Changeplot'
},

xAxis: {
    type: 'category',
    data: selectedData.values.map(function(d) {
        return d.time;
    }),
    axisLabel: {
        textStyle: {
          fontSize: 12 // 字体大小
        },
        color: 'white'
}
},
yAxis: {
    type: 'value',
    name: 'CGM (mg/dl)',
    axisLabel: {
        textStyle: {
          fontSize: 12 // 字体大小
        },
        color: 'white'
}
},
tooltip: {
    trigger: 'item',
    formatter: function(params) {
        return 'Time: ' + params.name + '<br>CGM: ' + params.value[1] + '(mg / dl)' 
    }
},
series: [{
    type: 'scatter',
    data: selectedData.values.map(function(d) {
        return {
            name: d.time,
            value: [d.time, d.values],
            specialEvent: d['Dietary intake'] || d['Insulin dose - s.c.']
        };
    }),
    symbolSize: 10,
    itemStyle: {
        color: function(params) {
            const value = params.data.value[1];
            if (value > 180) {
                return '#8a84c8';
            } else if (value > 90) {
                return '#82d6c3';
            } else {
                return '#d95f02';
            }
        }
    },
    markPoint: {
symbol: 'triangle',
symbolSize: 10,
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