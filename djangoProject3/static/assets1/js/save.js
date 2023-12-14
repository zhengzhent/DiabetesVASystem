        $(document).ready(function() {
            // Save 按钮点击事件

            $('#saveButton').on('click', function() {
                var parameters = document.getElementById('foldableContent').value;
                // 在这里调用后端模型训练的逻辑
                $.ajax({
                    type: 'POST',
                    url: 'train_model/',  // 根据你的实际路径调整
                    contentType: 'application/json;charset=UTF-8',
                    data: JSON.stringify({
                        'parameters': parameters
                    }),
                    success: function(response) {
                        // 使用 window.alert 显示训练完成的提示
                        window.alert(response.result);
                    },
                    error: function(error) {
                        console.log('Error saving parameters:', error);
                    }
                });
            });
        });
