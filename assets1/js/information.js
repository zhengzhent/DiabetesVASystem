$(document).ready(function() {
    // 初始化 DataTable
    let dataTable = $('#example').DataTable({
        // 在这里可以添加 DataTable 的配置选项
        "paging": true,      // 启用分页
        "ordering": true,    // 启用排序
        "searching": false    // 启用搜索
    });
    $('#example').addClass('custom-font-size');
    $.ajax({
        url: 'assets1/staticdata/shanghaiinformations.json',  // 指定 JSON 文件路径
        dataType: 'json',
        success: function(jsonData) {
            // 清除现有的 DataTable 数据
            dataTable.clear();

            // 添加新数据到 DataTable
            jsonData.forEach(function(row) {
                dataTable.row.add([
                    row["Patient Number"],
                    row.Gender,
                    row.Age,
                    row["BMI (kg\/m2)"],
                    row["Duration of diabetes (years)"],
                    row["Hypoglycemia "],
                    row["Vascular Complications"], 
                    row["Comorbidities"]
                ]);
            });

            // 绘制 DataTable
            dataTable.draw();
            
            // 添加自定义字体大小样式
            $('#example.custom-font-size').css('font-size', '18px'); // 根据需要调整字体大小
        },
        error: function(xhr, status, error) {
            console.error('Failed to load JSON file:', status, error);
        }
    });
});
