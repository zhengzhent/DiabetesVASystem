var chartDom = document.getElementById('Feature-Bar');
var myChart = echarts.init(chartDom);   
var option;

option = {
    title: {
        text: 'Top Feature',
        top: 'top',
        left: 'center',
        textStyle: {
            color: '#ffffff', // 字体颜色调白
            fontSize: 25 // 字体大小调大
        }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        show: false
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
        min:0,
        max:1,
        axisLabel: {
            textStyle: {
                color: '#ffffff', // 标签字体颜色调白
                fontSize: 20 // 标签字体大小调大
            }
        }
    },
    yAxis: {
        type: 'category',
        data: ['BMI','Glycated Albumin','Age', '2h Postprandial C-peptide','Total Cholesterol','HbA1c', 'Triglyceride','Uric Acid'],
        axisLabel: {
            textStyle: {
                color: '#ffffff', // 标签字体颜色调白
                fontSize: 20 // 标签字体大小调大
            }
        }
    },
    series: [
        {
            name: 'Feature',
            type: 'bar',
            data: [0.3240, 0.3956,0.4790, 0.4839, 0.4957, 0.6055, 0.7186, 1]
        }
    ]
};

option && myChart.setOption(option);
