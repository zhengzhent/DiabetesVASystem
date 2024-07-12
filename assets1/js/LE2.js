var myChart = echarts.init(document.getElementById('scatterChart'));

// 加载 CSV 文件数据
var data = [];
var categories = [];  // 存储不同的分类变量值
var patientNumbers = [];  // 存储每个人的编号

// 使用 Fetch API 获取 CSV 文件数据
fetch('/assets1/staticdata/reduced_data.csv')
    .then(response => response.text())
    .then(text => {
        data = text.trim().split('\n').map(line => line.split(',').map(item => item.trim()));
        categories = [...new Set(data.map(row => row[2]))];  // 第3列为 Comorbidities 列
        patientNumbers = data.map(row => row[3]);  // 第4列为 Patient Number 列
        categories.shift();  // 移除标题行
        renderChart();
    });

// 渲染散点图
function renderChart() {
    // 定义图表配置
    var option = {
        title: {
            text: 'Patients Distribution',
            top: 'top',
            left: 'center',
            textStyle: {
                color: '#ffffff', // 字体颜色调白
                fontSize: 25 // 字体大小调大
            }
        },
        tooltip: {
            formatter: function (params) {
                var comorbidityText;
                switch (params.data[2]) {
                    case '0':
                        comorbidityText = 'None';
                        break;
                    case '1':
                        comorbidityText = 'Complications';
                        break;
                    default:
                        comorbidityText = params.data[1];
                }
                return 'Comorbidities: ' + comorbidityText;
            },
            
        },
        legend: {
            data: ['None', 'Com'],
            textStyle: {
                color: '#ffffff',
                fontSize: 20
            }, 
        //    left: 'center',
            x:'right',
        },
        xAxis: {
            axisLine: {
                lineStyle: {
                    color: '#ffffff'
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#ffffff',
                    fontSize:'20px'
                }
            }
        },
        yAxis: {
            axisLine: {
                lineStyle: {
                    color: '#ffffff'
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#ffffff',
                    fontSize:'20px'
                }
            }
        },
        series: [{
            name: 'None',
            type: 'scatter',
            symbolSize: 15,
            data: data.filter(item => item[2] === '0').map(item => [item[0], item[1], item[2], item[3]]),
            itemStyle: {
                color: '#925EB0'
            }
        }, {
            name: 'Com',
            type: 'scatter',
            symbolSize: 15,
            data: data.filter(item => item[2] === '1').map(item => [item[0], item[1], item[2], item[3]]),
            itemStyle: {
                color: '#7AB656'
            }
        }]
    };

    // 使用刚指定的配置项和数据显示图表
    myChart.setOption(option);

    // 添加点击事件
    myChart.on('click', function (params) {
        // 获取点击的数据项
        var clickedData = params.data;
        // 获取点击的 Patient Number
        var clickedPatientNumber = clickedData[3].trim();  // 使用 trim() 方法移除两端的空白字符
        // 使用 DataTables 插件的 API 查找对应的行
        var table = $('#example').DataTable();
        
        // 查找对应的行及页码
        var foundRow = null;
        var pageIndex = -1;
        table.rows().every(function (rowIdx, tableLoop, rowLoop) {
            var rowData = this.data();  // 获取行数据
            if (rowData && rowData[0].trim() === clickedPatientNumber) {  // 假设 ID 是每行的第一列
                foundRow = this.node();
                pageIndex = this.index();  // 获取行索引
                return false;  // 结束循环
            }
            return true;  // 继续循环
        });

        // 如果找到了对应的行，则跳转到对应页并高亮显示
        if (foundRow !== null) {
            // 获取目标行的页码
            var targetPage = Math.floor(pageIndex / table.page.len());
            
            // 跳转到目标页
            table.page(targetPage).draw(false);

            // 等待跳转完成后高亮显示当前行
            setTimeout(function() {
                // 移除之前的高亮
                table.$('tr.highlight').removeClass('highlight');

                // 高亮显示当前行
                $(foundRow).addClass('highlight');
            }, 100);
        }
    });

    // 添加表格行点击事件
    $('#example tbody').on('click', 'tr', function () {
        var table = $('#example').DataTable();
        var rowData = table.row(this).data();
        var patientNumber = rowData[0].trim();  // 假设 ID 是每行的第一列

        console.log(patientNumber);

        // 查找对应的散点
        var pointIndex = -1;
        var seriesIndex = -1;

        data.forEach((item, index) => {
            if (item[3].trim() === patientNumber) {
                pointIndex = index;
                seriesIndex = item[2] === '0' ? 0 : item[2] === '1' ? 1 : 2;
            }
        });

        if (pointIndex !== -1) {
            // 触发涟漪效果
            myChart.dispatchAction({
                type: 'showTip',
                seriesIndex: seriesIndex,
                dataIndex: pointIndex
            });

            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: seriesIndex,
                dataIndex: pointIndex
            });

            // 移除其他散点的高亮
            myChart.dispatchAction({
                type: 'downplay',
                seriesIndex: seriesIndex,
                dataIndex: pointIndex
            });

            // 高亮当前散点
            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: seriesIndex,
                dataIndex: pointIndex
            });
        }
    });
}

// 添加 CSS 样式用于高亮显示
$('<style>')
    .prop('type', 'text/css')
    .html('.highlight { background-color: yellow !important; }')
    .appendTo('head');
