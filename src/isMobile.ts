export default function (){
    // 获取用户代理字符串
    const userAgent = navigator.userAgent;

// 创建移动端设备的关键词列表
    const mobileKeywords = ["Mobile", "Android", "iPhone", "iPad", "Windows Phone", "BlackBerry"];

// 检查用户代理字符串中是否包含移动端设备的关键词
    const isMobile = mobileKeywords.some(function(keyword) {
        return userAgent.indexOf(keyword) !== -1;
    });
    return isMobile
}
