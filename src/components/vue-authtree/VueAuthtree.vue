<template>
  <div class="yn-authtree">
    <ul class="yn-authtree-list" :id="id">
      <vueAuthtreeNode
        v-for="(item,index) in treeData"
        :key="index"
        :item-data="item"
        :expand="expand"
        :onexpand="onexpand"
        :expandLevel="expandLevel"
        :onchange="onchange"
        :onTextClick="onTextClick"
        :auth-tree-id="id"></vueAuthtreeNode>
    </ul>
  </div>
</template>

<script>
  import vueAuthtreeNode from "./VueAuthtreeNode"
  export default {
    name: "VueAuthtree",
    props:{
      /*
        权限树数据
        treeData => [
          {
            text: "小学", // 显示的文字
            value: "primarySchool", // checkbox的值
            name: "primary_school", // checkbox的name属性值
            checked: false,
            disabled: false,
            readonly: false,
            children: [
              {
                text: "语文",
                value: "language",
                name: "primary_school",
                checked: true,
                disabled: false,
                readonly: false
              },
              {
                text: "数学",
                value: "mathematics",
                name: "primary_school",
                checked: false,
                disabled: false,
                readonly: false,
                children: [
                  {
                    text: "数学-上册",
                    value: "mathematics1",
                    name: "primary_school",
                    checked: false,
                    disabled: false,
                    readonly: false
                  },
                  {
                    text: "数学-下册",
                    value: "mathematics2",
                    name: "primary_school",
                    checked: false,
                    disabled: false,
                    readonly: false
                  }
                ]
              }
            ]
          }
        ]
        */
      treeData: {
        type: Array,
        default(){
          return [];
        }
      },
      // 是否默认展开
      expand: {
        type: Boolean,
        default: false
      },
      // 默认展开层级，超过该层级则不展开（此参数只在expand为true时有效）
      expandLevel: {
        type: Number,
        default: -1
      },
      // 节点展开事件
      onexpand: {
        type: Function,
        default: null
      },
      // 节点change事件
      onchange: {
        type: Function,
        default: null
      },
      // 节点文字点击事件
      onTextClick: {
        type: Function,
        default: null
      }
    },
    data(){
      return {
				version: "1.0.0",
       id: "ynAuthTree_" + new Date().getTime() + "_" + Math.random().toString(32).substr(2)
      }
    },
    methods: {
      /**
       * 获取所有选中的节点
        * @param excludeDisabled 是否排除禁用项
       * @param excludeReadonly 是否排除只读项
       * @returns {Array}
       */
      getCheckedNodes(excludeDisabled, excludeReadonly){
        excludeDisabled = !!excludeDisabled;
        excludeReadonly = !!excludeReadonly;
        let checkedNodes = [];
        this.tiledData.forEach(item => {
          if(item.checked){
            if(!excludeDisabled && !excludeReadonly){
              checkedNodes.push(item);
            }else if(excludeDisabled && !excludeReadonly){
              if(!item.disabled){
                checkedNodes.push(item);
              }
            }else if(!excludeDisabled && excludeReadonly){
              if(!item.readonly){
                checkedNodes.push(item);
              }
            }
          }
        });
        return checkedNodes;
      },
      /**
       * 获取所有选中节点的值
       * @param excludeDisabled 是否排除禁用项
       * @param excludeReadonly 是否排除只读项
       * @returns {Array}
       */
      getCheckedValues(excludeDisabled, excludeReadonly){
        let checkedNodes = this.getCheckedNodes(excludeDisabled, excludeReadonly),
            checkedValues = [];
        checkedNodes.forEach(item => {
          checkedValues.push(item.value);
        });
        return checkedValues;
      },
      // 平铺数据
      _tiled(data){
        let arr = [];
        if(data.length == 0){
          return data;
        }
        data.forEach(item => {
          arr.push(item);
          if(item.children){
            Array.prototype.push.apply(arr, this._tiled(item.children));
          }
        });
        return arr;
      }
    },
    components: {
      vueAuthtreeNode
    },
    computed: {
      // 平铺的数据
      tiledData(){
        return this._tiled(this.treeData);
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .yn-authtree{
    overflow-x: auto;
    *{
      box-sizing: border-box;
    }
    div,dl,dt,dd,ul,ol,li{
      margin:0;
      padding:0;
    }
  }
</style>

