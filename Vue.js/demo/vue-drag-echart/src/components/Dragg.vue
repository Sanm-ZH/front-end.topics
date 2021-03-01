<template>
  <div>
    <!--使用draggable组件-->
    <div class="itxst">
      <div class="col">
        <div class="title">可视化</div>
        <draggable
          v-model="arr1"
          group="site"
          animation="300"
          dragClass="dragClass"
          ghostClass="ghostClass"
          chosenClass="chosenClass"
          @start="onStart"
          @end="onEnd"
        >
          <transition-group>
            <div
              class="item"
              v-for="item in arr1"
              :key="item.id"
            >{{item.name}}</div>
          </transition-group>
        </draggable>
      </div>
      <div class="col">
        <div class="title">值轴/X</div>
        <draggable
          v-model="arr2"
          group="site"
          animation="100"
          dragClass="dragClass"
          ghostClass="ghostClass"
          chosenClass="chosenClass"
          @start="onStart"
          @end="onEnd"
        >
          <transition-group>
            <div
              class="item"
              v-for="item in arr2"
              :key="item.id"
            >{{item.name}}</div>
          </transition-group>
        </draggable>
      </div>

      <!-- y轴 -->
      <div class="col">
        <div class="title">值轴/Y</div>
        <draggable
          v-model="arr3"
          group="site"
          animation="100"
          dragClass="dragClass"
          ghostClass="ghostClass"
          chosenClass="chosenClass"
          @start="onStart"
          @end="onEnd"
        >
          <transition-group>
            <div
              class="item"
              v-for="item in arr3"
              :key="item.id"
              style="display:flex;"
            >
              <div style="flex:1;border:1px solid orange;">{{item.name}}</div>
              <div style="flex:1;border:1px solid orange;">
                <el-select
                  v-model="value"
                  placeholder="条形图"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <div style="flex:1;border:1px solid orange;">
                <span style="margin-top:20px;">
                  <colorPicker
                    v-model="color"
                    :index="item.value"
                  />
                </span>
                <span>颜色</span>
              </div>
            </div>
          </transition-group>
        </draggable>
      </div>
    </div>
    <div
      id="main"
      style="width:100%;height:180px;margin-top:200px;"
    ></div>
  </div>
</template>

<script>
//导入draggable组件
import draggable from 'vuedraggable'
import * as echarts from 'echarts';
export default {
  //注册draggable组件
  components: {
    draggable,
    echarts
  },
  data () {
    return {
      drag: false,
      color: '#ff0000',
      arr1: [
        {
          id: 1,
          name: '邮件营销',
          type: 'line',
          stack: '总量',
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          id: 2,
          name: '联盟广告',
          type: 'line',
          stack: '总量',
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          id: 3,
          name: '视频广告',
          type: 'line',
          stack: '总量',
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          id: 4,
          name: '直接访问',
          type: 'bar',
          stack: '总量',
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          id: 5,
          name: '搜索引擎',
          type: 'bar',
          stack: '总量',
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        },
        { id: 6, name: 'x轴债券趋势图', arrData: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'] },

      ],
      arr2: [
      ],
      arr3: [],
      legendData: [],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    };
  },
  mounted () {
    // this.dragEchart()
  },
  methods: {
    dragEchart () {
      if (this.arr2.length == 1 && this.arr3.length > 0) {
        this.legendData = []
        for (let item of this.arr3) {
          this.legendData.push(item.name)
        }
        this.echartDate()
      }
    },
    echartDate () {
      var chartDom = document.getElementById('main');
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: '折线图'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: this.legendData || []
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.arr2[0].arrData || []
        },
        yAxis: {
          type: 'value'
        },
        series: this.arr3 || []
      };

      option && myChart.setOption(option);
    },
    //开始拖拽事件
    onStart () {
      this.drag = true;
    },
    //拖拽结束事件
    onEnd () {
      this.dragEchart()
      this.drag = false;
    },
  },
};
</script>

<style scoped>
/*被拖拽对象的样式*/
/*定义要拖拽元素的样式*/
.ghostClass {
  background-color: blue !important;
}

.chosenClass {
  background-color: red !important;
  opacity: 1 !important;
}

.dragClass {
  background-color: blueviolet !important;
  opacity: 1 !important;
  box-shadow: none !important;
  outline: none !important;
  background-image: none !important;
}

.itxst {
  margin: 10px;
  height: 100px;
}

.title {
  padding: 6px 12px;
}

.col {
  width: 25%;
  flex: 1;
  padding: 10px;
  border: solid 1px #eee;
  border-radius: 5px;
  float: left;
}

.col + .col {
  margin-left: 10px;
}

.item {
  padding: 6px 12px;
  margin: 0px 10px 0px 10px;
  border: solid 1px #eee;
  background-color: #f1f1f1;
}

.item:hover {
  background-color: #fdfdfd;
  cursor: move;
}

.item + .item {
  border-top: none;
  margin-top: 6px;
}
</style>