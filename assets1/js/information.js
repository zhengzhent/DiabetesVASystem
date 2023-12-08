$(document).ready(function() {
    // 初始化 DataTable
    var dataTable = $('#example').DataTable({
        // 在这里可以添加 DataTable 的配置选项
        "paging": true,      // 启用分页
        "ordering": true,    // 启用排序
        "searching": true    // 启用搜索
    });

    // 假设你的 JSON 数据，这里只是一个示例
    var jsonData = [
        { "Name": "John Doe", "Position": "Developer", "Office": "New York", "Age": 30, "Start date": "2022-01-01", "Salary": "$80,000" },
        { "Name": "John Doe", "Position": "Developer", "Office": "New York", "Age": 30, "Start date": "2022-01-01", "Salary": "$80,000" },
        { "Name": "John Doe", "Position": "Developer", "Office": "New York", "Age": 30, "Start date": "2022-01-01", "Salary": "$80,000" },
        { "Name": "John Doe", "Position": "Developer", "Office": "New York", "Age": 30, "Start date": "2022-01-01", "Salary": "$80,000" },
        { "Name": "John Doe", "Position": "Developer", "Office": "New York", "Age": 30, "Start date": "2022-01-01", "Salary": "$80,000" },
        { "Name": "John Doe", "Position": "Developer", "Office": "New York", "Age": 30, "Start date": "2022-01-01", "Salary": "$80,000" },
        { "Name": "John Doe", "Position": "Developer", "Office": "New York", "Age": 30, "Start date": "2022-01-01", "Salary": "$80,000" },
        { "Name": "John Doe", "Position": "Developer", "Office": "New York", "Age": 30, "Start date": "2022-01-01", "Salary": "$80,000" },
        { "Name": "John Doe", "Position": "Developer", "Office": "New York", "Age": 30, "Start date": "2022-01-01", "Salary": "$80,000" },
        { "Name": "John Doe", "Position": "Developer", "Office": "New York", "Age": 30, "Start date": "2022-01-01", "Salary": "$80,000" },
        { "Name": "John Doe", "Position": "Developer", "Office": "New York", "Age": 30, "Start date": "2022-01-01", "Salary": "$80,000" },
        { "Name": "John Doe", "Position": "Developer", "Office": "New York", "Age": 30, "Start date": "2022-01-01", "Salary": "$80,000" },
        { "Name": "John Doe", "Position": "Developer", "Office": "New York", "Age": 30, "Start date": "2022-01-01", "Salary": "$80,000" },
        { "Name": "John Doe", "Position": "Developer", "Office": "New York", "Age": 30, "Start date": "2022-01-01", "Salary": "$80,000" },
        // 其他数据行...
    ];
    
    // 清除现有的 DataTable 数据
    dataTable.clear();

    // 添加新数据到 DataTable
    jsonData.forEach(function(row) {
        dataTable.row.add([
            row.Name,
            row.Position,
            row.Office,
            row.Age,
            row["Start date"],
            row.Salary
        ]);
    });

    // 绘制 DataTable
    dataTable.draw();
});
