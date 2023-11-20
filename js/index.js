const tableBody = document.getElementById('patients-data');
const previousPageButton = document.getElementById('previous-page');
const nextPageButton = document.getElementById('next-page');
const currentPageElement = document.getElementById('current-page');
const totalPagesElement = document.getElementById('total-pages');
const searchPatientButton = document.getElementById('search-patient-button');
const patientIdInput = document.getElementById('patient-id-input');

const itemsPerPage = 7;
let currentPage = 1;
let patientsData = []; // 存储所有患者数据




const displayData = (data, page) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = data.slice(startIndex, endIndex);

    tableBody.innerHTML = '';

    pageData.forEach(patient => {
        const row = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.textContent = patient.编号;
        row.appendChild(idCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = patient.姓名;
        row.appendChild(nameCell);

        const ageCell = document.createElement('td');
        ageCell.textContent = patient.年龄;
        row.appendChild(ageCell);

        const genderCell = document.createElement('td');
        genderCell.textContent = patient.性别 === 1 ? '男' : '女';
        row.appendChild(genderCell);

        const bmi = document.createElement('td');
        bmi.textContent = patient.BMI;
        row.appendChild(bmi);

        const family = document.createElement('td')
        family.textContent = patient.家族史 === 1 ? '有' : '无';
        row.appendChild(family);

        const complication = document.createElement('td')
        complication.textContent = patient.并发症 === 1 ? '有' : '无';
        row.appendChild(complication);

        const level = document.createElement('td')
        level.textContent = patient.程度分级;
        row.appendChild(level);

        tableBody.appendChild(row);
    });
};

const loadData = () => {
    fetch('data/patients.json')
        .then(response => response.json())
        .then(data => {
            patientsData = data; // 存储所有患者数据
            const totalPages = Math.ceil(data.length / itemsPerPage);

            totalPagesElement.textContent = `第 ${totalPages} 页`;

            displayData(data, currentPage);
            updateButtonState();

            nextPageButton.addEventListener('click', () => {
                currentPage++;
                if (currentPage > totalPages) {
                    currentPage = totalPages;
                }
                displayData(data, currentPage);
                updateButtonState();
                currentPageElement.textContent = `第 ${currentPage} 页`;
            });

            previousPageButton.addEventListener('click', () => {
                currentPage--;
                if (currentPage < 1) {
                    currentPage = 1;
                }
                displayData(data, currentPage);
                updateButtonState();
                currentPageElement.textContent = `第 ${currentPage} 页`;
            });

            searchPatientButton.addEventListener('click', () => {
                const patientId = parseInt(patientIdInput.value.trim(), 10);
                if (patientId !== '') {
                    currentPage=1;
                    const matchedPatient = patientsData.find(patient => patient.编号 === patientId);
                    if (matchedPatient) {
                        displayData([matchedPatient], 1);
                        currentPage = 1;
                        currentPageElement.textContent = `第 ${currentPage} 页`;
                        updateButtonState();
                    } else {
                        alert('找不到匹配的患者！');
                    }
                } else {
                    alert('请输入患者编号！');
                }
            });
        })
        .catch(error => {
            console.error('加载数据时出错:', error);
        });
};

const updateButtonState = () => {
    if (currentPage === 1) {
        previousPageButton.classList.add('disabled');
    } else {
        previousPageButton.classList.remove('disabled');
    }

    if (currentPage === Math.ceil(patientsData.length / itemsPerPage)) {
        nextPageButton.classList.add('disabled');
    } else {
        nextPageButton.classList.remove('disabled');
    }
};

loadData();

// 格式化日期为 YYYY-MM-DD 格式
const displayThemeRiverChart = (selectedPatient) => {
    fetch('data/timedata1.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const selectedPatientData = data.filter(patient => patient.编号 === selectedPatient.编号);
            
            // 将时间数据中的日期字符串转换为 Date 对象并格式化
            const formatDate = (date) => {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
            };

            // 将时间数据中的日期字符串转换为 Date 对象并格式化
            const convertToDates = (data) => {
                return data.map(item => {
                    const newItem = { ...item };
                    newItem.日期 = formatDate(new Date(item.日期));
                    return newItem;
                });
            };

            const convertedData = convertToDates(selectedPatientData);

            const dates = convertedData.map(item => item.日期);
            const breakfastBefore = selectedPatientData.map(data => data.早餐前);
            const breakfastAfter = selectedPatientData.map(data => data.早餐后);
            const lunchBefore = selectedPatientData.map(data => data.午餐前);
            const lunchAfter = selectedPatientData.map(data => data.午餐后);
            const dinnerBefore = selectedPatientData.map(data => data.晚餐前);
            const dinnerAfter = selectedPatientData.map(data => data.晚餐后);
            const sleepBefore = selectedPatientData.map(data => data.睡前);

            const option = {
                color: ["#C58080", "#E1A4C4", "#C03C71", "#8C2487", "#503CD0", "#37A2DA","#9d96f5"],

                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'line',
                        lineStyle: {
                            color: 'rgba(255,255,0,0.8)',
                            width: 1,
                            type: 'solid'
                        }
                    },
                    position: ['90%', '50%'],
                },

                legend: {
                    top: '4%',
                    textStyle: {
                        color: '#FE80C8',
                    },
                    data: ['早餐前', '早餐后', '午餐前', '午餐后', '晚餐前', '晚餐后', '睡前']
                },

                grid: {
                    top: '5%', // Adjust this value to move the chart down
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },

                singleAxis: {
                    top: 50,
                    bottom: 90,
                    left: 100,
                    right: 100,
                    axisLine: {
                        lineStyle: {
                            color: '#5F4051'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#5F4051',
                        }
                    },
                    type: 'time',
                    axisPointer: {
                        animation: true,
                        label: {
                            show: true
                        }
                    },
                },

                series: [{
                    type: 'themeRiver',
                    label: {
                        normal: {
                            show: false,
                            position: 'left'
                        }
                    },
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 20,
                            shadowColor: 'rgba(0, 0, 0, 0.6)'
                        }
                    },
                    data: [
                        // 请根据您的数据数组进行修改
                        ...dates.map((date, index) => [date, breakfastBefore[index], '早餐前']),
                        ...dates.map((date, index) => [date, breakfastAfter[index], '早餐后']),
                        ...dates.map((date, index) => [date, lunchBefore[index], '午餐前']),
                        ...dates.map((date, index) => [date, lunchAfter[index], '午餐后']),
                        ...dates.map((date, index) => [date, dinnerBefore[index], '晚餐前']),
                        ...dates.map((date, index) => [date, dinnerAfter[index], '晚餐后']),
                        ...dates.map((date, index) => [date, sleepBefore[index], '睡前']),
                    ]
                }]
            };

            const chart1element = document.getElementById('chart1');
            var chart = echarts.init(chart1element);
            chart.setOption(option);
        })
        .catch(error => {
            console.error('加载数据时出错:', error);
        });
};


// 瀑布图的 series 数据
const createWaterfallSeries = (waterfallData) => {
  const series = [];

  waterfallData.forEach(data => {
    const [date, breakfastBefore, breakfastAfter, lunchBefore, lunchAfter, dinnerBefore, dinnerAfter, beforeSleep] = data;

    const seriesItem = {
      type: 'bar',
      name: date,
      data: [breakfastBefore, breakfastAfter, lunchBefore, lunchAfter, dinnerBefore, dinnerAfter, beforeSleep],
      stack: 'total', // 如果需要堆叠显示，可以使用相同的 stack 名称
      emphasis: {
        focus: 'series'
      },
    };

    series.push(seriesItem);
  });

  return series;
};

const displayWaterfallChart = (selectedPatient) => {
  fetch('data/Kdata.json')
    .then(response => response.json())
    .then(data => {
      const selectedPatientData = data.filter(patient => patient.编号 === selectedPatient.编号);
      const chart2element = document.getElementById('chart2');
      const chart2 = echarts.init(chart2element);

      const chartData = selectedPatientData.map(patient => [
        new Date(patient.日期).toLocaleDateString(),
        patient.早餐前,
        patient.睡前,
        patient.min_val,
        patient.max_val,
      ]);

      function calculateRSI(data) {

        const period = 11;
      
        const rsiData = [];
      
        for (let i = period; i < data.length; i++) {
      
          // 收益是当日max_val减去前一日min_val
          const gains = data[i][4] - data[i-1][3]; 
      
          // 损失是前一日min_val减去当日max_val
          const losses = data[i-1][3] - data[i][4];
      
          const avgGain = gains / period;
          const avgLoss = Math.abs(losses) / period;
      
          const RS = avgGain / avgLoss;  
          const RSI = 100 - (100 / (1 + RS));
      
          rsiData.push([data[i][0], RSI]); 
        }
      
        return rsiData;
      
      }
      

      const rsiData = calculateRSI(chartData);
    function splitData(rawData) {
        var categoryData = [];
        var values = []
        for (var i = 0; i < rawData.length; i++) {
            categoryData.push(rawData[i].splice(0, 1)[0]);
            values.push(rawData[i])
        }
        return {
            categoryData: categoryData,
            values: values
        };
    }
    
    function calculateMA(dayCount) {
        var result = [];
        for (var i = 0, len = data0.values.length; i < len; i++) {
            if (i < dayCount) {
                result.push('-');
                continue;
            }
            var sum = 0;
            for (var j = 0; j < dayCount; j++) {
                sum += data0.values[i - j][1];
            }
            result.push(sum / dayCount);
        }
        return result;
    }
    
    
    var data0 = splitData(chartData);
    console.log(data0);
    option2 = {

        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'line'
            }
        },
        legend: {
            data: ['血糖始末', `MA1`]
        },
        grid: {
            left: '10%',
            right: '10%',
            bottom: '15%'
        },
        xAxis: {
            type: 'category',
            data: data0.categoryData,
            scale: true,
            boundaryGap : false,
            axisLine: {onZero: false},
            splitLine: {show: false},
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'
        },
        yAxis: {
            scale: true,
            splitArea: {
                show: true
            }
        },

        series: [
            {
                name: '血糖始末',
                type: 'candlestick',
                data: data0.values,
                markPoint: {
                    label: {
                        normal: {
                            formatter: function (param) {
                                return param != null ? Math.round(param.value) : '';
                            }
                        }
                    },
                    data: [
                        {
                            name: 'XX标点',
                            coord: ['2013/5/31', 2300],
                            value: 2300,
                            itemStyle: {
                                normal: {color: 'rgb(41,60,85)'}
                            }
                        },
                        {
                            name: 'highest value',
                            type: 'max',
                            valueDim: 'highest'
                        },
                        {
                            name: 'lowest value',
                            type: 'min',
                            valueDim: 'lowest'
                        },
                        {
                            name: 'average value on close',
                            type: 'average',
                            valueDim: 'close'
                        }
                    ],
                    tooltip: {
                        formatter: function (param) {
                            return param.name + '<br>' + (param.data.coord || '');
                        }
                    }
                },
                markLine: {
                    symbol: ['none', 'none'],
                    data: [
                        // [
                        //     {
                        //         name: 'from lowest to highest',
                        //         type: 'min',
                        //         valueDim: 'lowest',
                        //         symbol: 'circle',
                        //         symbolSize: 10,
                        //         label: {
                        //             normal: {show: false},
                        //             emphasis: {show: false}
                        //         }
                        //     },
                        //     {
                        //         type: 'max',
                        //         valueDim: 'highest',
                        //         symbol: 'circle',
                        //         symbolSize: 10,
                        //         label: {
                        //             normal: {show: false},
                        //             emphasis: {show: false}
                        //         }
                        //     }
                        // ],
                        {
                            name: 'min line on close',
                            type: 'min',
                            valueDim: 'close'
                        },
                        {
                            name: 'max line on close',
                            type: 'max',
                            valueDim: 'close'
                        }
                    ]
                }
            },
            {
                name: 'RSI',
                type: 'line',
                data: rsiData.map(item => item[1]), // RSI数据位于每个子数组的第二个位置
                smooth: true, // 是否平滑绘制
                lineStyle: {
                  normal: {
                    width: 2, // 线条宽度
                    color: 'blue', // 曲线颜色
                  },
                },
            },
            {
                name: 'MA1',
                type: 'line',
                data: calculateMA(1),
                smooth: true,
                lineStyle: {
                    normal: {opacity: 0.5}
                }
            },
    
        ]
    };
      chart2.setOption(option2);
    })
    .catch(error => {
      console.error('加载数据时出错:', error);
    });
};



// 使用事件委托方式为表格添加点击事件监听器
tableBody.addEventListener('click', (event) => {
    const clickedRow = event.target.closest('tr');
    if (!clickedRow) return; // 点击的不是表格行
  
    const patientId = parseInt(clickedRow.children[0].textContent, 10);
    const selectedPatient = patientsData.find(patient => patient.编号 === patientId);
    if (selectedPatient) {
        displayThemeRiverChart(selectedPatient);
      displayWaterfallChart(selectedPatient);
    }
  });



