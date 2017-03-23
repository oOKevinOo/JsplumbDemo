# myJsplumb
encapsulation the open source-JsPlumb for project
依赖JSPlumb Jquery bootstrap等开源工具实现对组件的托拉拽，实现基本样式如下：
![Aaron Swartz](https://github.com/oOKevinOo/myJsplumb/raw/master/myJSPlump/pic/sampleStyle.png)  
实现功能：
1.支持自定义左侧控件定制
2.控件之间锚点，连线样式与数量控制
3.右侧属性栏可自定义元素样式，可指定每个属性的初始方法与修改值后回调函数，现在实现的元素样式有：
  一：输入框
  二：选择框
  三：多连级连动选择框
  ![Aaron Swartz](https://github.com/oOKevinOo/myJsplumb/raw/master/myJSPlump/pic/doubleSelect.png)  
  四：弹出按钮
  ![Aaron Swartz](https://github.com/oOKevinOo/myJsplumb/raw/master/myJSPlump/pic/popupFrame.png)  
  五：隐藏输入框
4.血缘继承：一般用于隐藏框，继承上一组件的输出字段

设计思路：
1.类设计
  一：JSPlumlHelper
      JSPlumb工具类，主要实现JSPlumb的基本操作（连线，添加锚点，删除连线等）
  二：nodeContainer
      用于保存与维护taskNode节点，内部用map来做存储
  三：PointFactory
      用来创建taskNode的锚点
  四：nodeFactory
      用来创建taskNode实例
      
 类图示例
  ![Aaron Swartz](https://github.com/oOKevinOo/myJsplumb/raw/master/myJSPlump/pic/classInfo.png)  
  
 用例示例
  ![Aaron Swartz](https://github.com/oOKevinOo/myJsplumb/raw/master/myJSPlump/pic/use%20case.png)  
