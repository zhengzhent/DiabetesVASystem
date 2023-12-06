document.addEventListener("DOMContentLoaded", function() {
    var toggleButton = document.getElementById("toggleButton");
    var foldableContent = document.getElementById("foldableContent");
    var t2gSettingDiv = document.querySelector('.T2G-setting');

    // 初始默认值
    var defaultT2GSettingHeight = "220px";
    var collapsedT2GSettingHeight = "30px"; // 折叠时的高度，根据需要设置

    toggleButton.addEventListener("click", function() {
        var computedStyle = window.getComputedStyle(foldableContent);

        if (computedStyle.getPropertyValue('max-height') && computedStyle.getPropertyValue('max-height') !== '0px') {
            // 折叠
            t2gSettingDiv.style.height = collapsedT2GSettingHeight;
            setTimeout(function() {
                foldableContent.style.maxHeight = '0';
            }, 0);
        } else {
            // 展开
            foldableContent.style.maxHeight = foldableContent.scrollHeight + "px";
            t2gSettingDiv.style.height = defaultT2GSettingHeight;
        }
    });
});
