document.addEventListener("DOMContentLoaded", function () {
    var toggleButton = document.getElementById("toggleButton");
    var foldableContent = document.getElementById("foldableContent");
    var informationDiv = document.querySelector('.information');
    var toggleInformationButton = document.getElementById("toggleInformationButton");
    var t2gSettingDiv = document.querySelector('.T2G-setting');
    var t2gDiv = document.querySelector('.T2G');
    var dataTableContainer = document.getElementById('example')
    var sick = document.getElementById('sicker')
    var examplelength = document.getElementById('example_length')
    var exampleinfo = document.getElementById('example_info')
    var examplep = document.getElementById('example_paginate')
    // 初始默认值
    var defaultT2GSettingMaxHeight = 200;
    var expandedT2GSettingMaxHeight = 200;
    var defaultT2GDivHeight = 835;

    // 新添加的按钮点击事件
    toggleInformationButton.addEventListener("click", function () {
        var computedStyle = window.getComputedStyle(informationDiv);

        if (
            computedStyle.getPropertyValue('max-height') &&
            computedStyle.getPropertyValue('max-height') !== '0px'
        ) {
            // 折叠
            informationDiv.style.maxHeight = '0';

            // 隐藏 DataTable 元素
            $('#example_info').hide(); // 隐藏 "Showing 1 to 10 of 14 entries"
            $('#example_paginate').hide(); // 隐藏分页部分
            $('#example_length').hide(); 
            dataTableContainer.style.display = 'none';
        } else {
            // 展开
            informationDiv.style.maxHeight = '700px'; // 根据需要调整默认高度

            // 显示 DataTable 元素
            $('#example_info').show(); // 显示 "Showing 1 to 10 of 14 entries"
            $('#example_paginate').show(); // 显示分页部分
            $('#example_length').show(); 
            dataTableContainer.style.display = 'block';
        }
    });

    toggleButton.addEventListener("click", function () {
        var computedStyle = window.getComputedStyle(foldableContent);

        if (
            computedStyle.getPropertyValue('max-height') &&
            computedStyle.getPropertyValue('max-height') !== '0px'
        ) {
            // 折叠
            t2gSettingDiv.style.maxHeight = defaultT2GSettingMaxHeight + 'px';
            t2gDiv.style.maxHeight = defaultT2GDivHeight + 'px';
            foldableContent.style.maxHeight = '0';
        } else {
            // 展开
            foldableContent.style.maxHeight = expandedT2GSettingMaxHeight + "px";
            t2gSettingDiv.style.maxHeight = expandedT2GSettingMaxHeight + 'px';
            t2gDiv.style.maxHeight = expandedT2GDivHeight + 'px';
        }
    });
});
