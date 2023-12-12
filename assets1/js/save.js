    // 保存按钮点击事件
function saveParameters() {
        var parameters = document.getElementById('foldableContent').value;

        // 将参数发送到后端
        $.ajax({
            type: 'POST',
            url: '/train_model/',  // 根据你的实际路径调整
            data: {
                'parameters': parameters
            },
            success: function(response) {
                // 使用 window.alert 显示训练完成的提示
                window.alert(response.result);
            },
            error: function(error) {
                console.log('Error saving parameters:', error);
            }
        });
}