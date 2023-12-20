$(document).ready(function() {
    // 初始化 DataTable
    var dataTable = $('#example').DataTable({
        // 在这里可以添加 DataTable 的配置选项
        "paging": true,      // 启用分页
        "ordering": true,    // 启用排序
        "searching": false    // 启用搜索
    });
    $('#example').addClass('custom-font-size');
    $.ajax({
        url: 'assets1/staticdata/information.json',  // 指定 JSON 文件路径
        dataType: 'json',
        success: function(jsonData) {
            // 清除现有的 DataTable 数据
            dataTable.clear();

            // 添加新数据到 DataTable
            jsonData.forEach(function(row) {
                dataTable.row.add([
                    row.ID,
                    row.Age,
                    row.BMI,
                    row["Family history"],
                    row.RBC,
                    row.CREA,
                    row["Degree grading"],
                ]);
            });

            // 绘制 DataTable
            dataTable.draw();
        },
        error: function(xhr, status, error) {
            console.error('Failed to load JSON file:', status, error);
        }
    });
});
