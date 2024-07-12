import pandas as pd

# 假设数据已从图片中读取并存储在一个CSV文件中
file_path = 'D:\\DiabetesVASystem\\assets1\\staticdata\\Feature_Bar.csv'  # 替换为实际的文件路径

# 读取数据
df = pd.read_csv(file_path)

# 要进行归一化的特征列
columns_to_normalize = ['Importance']

# 定义归一化函数
def min_max_normalize(series, min_val=0, max_val=1):
    return (series - series.min()) / (series.max() - series.min()) * (max_val - min_val) + min_val

# 对每一列进行归一化
for col in columns_to_normalize:
    df[col] = min_max_normalize(df[col])

# 保存归一化后的数据到新文件
output_file_path = 'D:\\DiabetesVASystem\\assets1\\staticdata\\normalized_FeatureBar.csv'  # 替换为你想要保存的文件路径
df.to_csv(output_file_path, index=False)

print("归一化后的数据已保存到", output_file_path)


        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // 创建比例尺
    const angleSlice = Math.PI * 2 / data.length;
    const rScale = d3.scaleLinear()
        .range([0, radius])
        .domain([0, 0.5]); // 调整比例尺的最大值以增大多边形的面积

    // 创建六边形背景层次
    const levels = 5;
    const colors = ["#f2f2f2", "#e6e6e6", "#cccccc", "#b3b3b3", "#999999"];
    for (let i = levels; i > 0; i--) {
        const levelFactor = radius * (i / levels);
        const points = data.map((d, j) => {
            const x = levelFactor * Math.cos(angleSlice * j - Math.PI / 2);
            const y = levelFactor * Math.sin(angleSlice * j - Math.PI / 2);
            return [x, y];
        });

        svg.append("polygon")
            .attr("points", points.map(d => d.join(",")).join(" "))
            .attr("fill", colors[i - 1])
            .attr("stroke", "none")
            .attr("opacity", 0.3);
    }

    // 绘制轴
    const axisGrid = svg.append("g").attr("class", "axisWrapper");

    const axis = axisGrid.selectAll(".axis")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "axis");

    axis.append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", (d, i) => rScale(0.5) * Math.cos(angleSlice * i - Math.PI / 2))
        .attr("y2", (d, i) => rScale(0.5) * Math.sin(angleSlice * i - Math.PI / 2))
        .attr("class", "line")
        .style("stroke", "grey")
        .style("stroke-width", "2px");

    // 添加指标标签
    axis.append("text")
        .attr("class", "legend")
        .style("font-size", "15px")
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .attr("x", (d, i) => rScale(0.6) * Math.cos(angleSlice * i - Math.PI / 2)) // 调整标签位置
        .attr("y", (d, i) => rScale(0.6) * Math.sin(angleSlice * i - Math.PI / 2)) // 调整标签位置
        .attr("fill", "white")
        .text(d => d.axis);

    // 绘制雷达图区域
    const radarLine = d3.lineRadial()
        .radius(d => rScale(d.value))
        .angle((d, i) => i * angleSlice);

    const radarWrapper = svg.append("g").attr("class", "radarWrapper");

    radarWrapper.append("path")
        .datum(data)
        .attr("class", "radarArea")
        .attr("d", radarLine)
        .style("fill", "rgba(0, 150, 200, 0.5)")
        .style("stroke", "rgba(0, 150, 200, 0.7)")
        .style("stroke-width", 2);

    // 添加顶点小圆，其半径表示数值大小
    radarWrapper.selectAll(".radarCircle")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "radarCircle")
        .attr("r", d => rScale(d.value) * 0.09) // 小圆的半径根据数值大小比例缩放
        .attr("cx", (d, i) => rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
        .attr("cy", (d, i) => rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2));


    // 添加数值标签
    radarWrapper.selectAll(".radarValue")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "radarValue")
        .attr("x", (d, i) => rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
        .attr("y", (d, i) => rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2) - 10)
        .attr("text-anchor", "middle")
        .style("font-size", "15px")
        .text(d => d.value.toFixed(4));
}