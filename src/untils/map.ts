/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-03-08 22:00:30
 * @Description: 
 */

export default {
    init: function() {
       const w:any=window;
      const AK = "g4fMd0z1Tf3epZ8ya880D9ohjCU6SPZG"; //你的AK
      const BMap_URL = "https://api.map.baidu.com/api?v=2.0&ak=" +AK +"&s=1&callback=onBMapCallback";
      return new Promise((resolve, reject) => {
        
        // 如果已加载直接返回
        if (typeof w.BMap !== "undefined") {
          resolve(w.BMap);
          return true;
        }
        // 百度地图异步加载回调处理
        w.onBMapCallback = function() {
          resolve(w.BMap);
        };
   
        // 插入script脚本
        let scriptNode = document.createElement("script");
        // scriptNode.setAttribute(type, 'text/javascript');
        scriptNode.setAttribute("src", BMap_URL);
        document.body.appendChild(scriptNode);
      });
    }
}