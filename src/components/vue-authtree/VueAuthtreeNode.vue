<template>
  <li class="authtree-node" :class="{'combination': hasChildren, 'leaf': !hasChildren, 'expanded': isExpand, 'shrink': !isExpand}">
    <div class="authtree-node-content">
      <div class="node-content-inner">
        <label class="authtree-node-checkbox" :class="{'checked': itemData.checked, 'disabled': itemData.disabled, 'readonly': itemData.readonly, 'indeterminate': indeterminate}">
          <span class="checkbox-view">
            <i class="iconfont icon-xuanzhong"></i>
            <i class="iconfont icon-hengxian"></i>
          </span>
          <input type="checkbox" class="checkbox_original" @change="checkboxChange" :name="itemData.name" :value="itemData.value" :checked="itemData.checked" :disabled="itemData.disabled" :readonly="itemData.readonly">
        </label>
        <span class="checkbox-label-text" @click.stop="textClick">{{itemData.text}}</span>
        <span class="authtree-node-btn expand-btn" @click.stop="expandNode(true)" v-if="hasChildren">
          <span class="iconfont icon-zhankai"></span>
        </span>
        <span class="authtree-node-btn shrink-btn" @click.stop="expandNode(false)" v-if="hasChildren">
          <span class="iconfont icon-shousuo1"></span>
        </span>
      </div>
    </div>
    <ul class="authtree-children" v-if="hasChildren">
      <VueAuthtreeNode
        v-for="(item,index) in itemData.children"
        :key="index"
        :item-data="item"
        :expand="expand"
        :onexpand="onexpand"
        :expandLevel="expandLevel"
        :onchange="onchange"
        :onTextClick="onTextClick"
        :auth-tree-id="authTreeId"></VueAuthtreeNode>
    </ul>
  </li>
</template>

<script>
  export default {
    name: "VueAuthtreeNode",
    props: {
      // 权限树数据
      itemData: {
        type: Object,
        default(){
          return {};
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
      },
      authTreeId: {
        type: String,
        default: ""
      }
    },
    data(){
      return {
        isExpand: this.expand || false,
        indeterminate: false
      }
    },
    methods: {
      // 展开节点
      expandNode(flag){
        // 执行展开回调事件，如果事件回调函数返回false，则不会 展开/收缩 节点，需手动展开/收缩
        if(this.onexpand && typeof this.onexpand === "function"){
          let flag = this.onexpand(this.itemData, this._expandNode);
          if(flag === false){
            return;
          }
        }
        this._expandNode(!!flag);
      },
      // 复选框change事件
      checkboxChange(e){
        let target = e.currentTarget || e.target,
            checked = target.checked,
            hasChildren = this.$children && this.$children.length > 0;
        if(this.itemData.readonly){
          return;
        }

        this.itemData.checked = checked;

        if(!checked && hasChildren){
          this.indeterminate = false;
        }
        if(hasChildren){
          // 如果当前节点有子节点，则设置子节点的值
          this.setChildValue(this, checked);
        }
        // 设置父节点的值
        this.setParentValue(this.$parent, checked);

        this.onchange && typeof this.onchange === "function" && this.onchange(this.itemData, this);
      },
      // 向下查找子节点，并设置子节点值
      setChildValue(vm, checked){
        if(!(vm.$children && vm.$children.length > 0)){
          return;
        }
        vm.$children.forEach((itemVm) => {
          itemVm.itemData.checked = checked;
          if(itemVm.$children && itemVm.$children.length){
            // 如果子节点也是父节点，并且当前checked为false，则取消当前节点的模糊状态
            if(!checked){
              itemVm.indeterminate = false;
            }
            this.setChildValue(itemVm, checked);
          }
        });
      },
      // 向上查找父节点，并设置父节点值
      setParentValue(vm, checked){
        // 如果不是树节点则不进行任何操作
        if(vm.$options.name !== "VueAuthtreeNode"){
          return;
        }

        if(checked){
          let childCheckedAll = this.childCheckedAll(vm.$children);
          vm.itemData.checked = checked;
          // 如果当前父节点下的所有子节点未全部选中，则父节点呈现模糊状态
          vm.indeterminate = !childCheckedAll && checked;
        }else{
          let childNotCheckedAll = this.childNotCheckedAll(vm.$children);
          if(childNotCheckedAll){
            vm.itemData.checked = checked;
            // 当当前父节点下的所有子节点都未选中时，此时取消父节点的模糊状态
            vm.indeterminate = false;
          }else{
            // 如果当前父节点下的所有子节点未全部选中，则父节点呈现模糊状态
            vm.indeterminate = true;
          }
        }

        this.setParentValue(vm.$parent, checked);
      },
      // 判断子节点是否全部选中
      childCheckedAll(children){
        let checkedAll = true;
        if(children.length === 0){
          return;
        }
       for(let i = 0, len = children.length; i < len; i++){
          let child = children[i];
          if(!child.itemData.checked){
            checkedAll = false;
            break;
          }else{
            if(child.$children && child.$children.length > 0){
              checkedAll = this.childCheckedAll(child.$children);
            }
          }
        }
        return checkedAll;
      },
      // 判断子节点是否全部未选中
      childNotCheckedAll(children){
        let notCheckedAll = true;
        if(children.length === 0){
          return;
        }
        let arr = [];
        this._forEachChildren(children, arr);
        //console.log(arr);
        /*
         计算子节点是否全部未选中时需要从后面往前面计算，这样就能保证在计算的时候不会出错，如果从前面往后面计算，则会造成
         子节点的checked为true，而孙节点已经为false了
         */
        for(let i = arr.length - 1; i >= 0; i--){
          if(arr[i].checked){
            notCheckedAll = false;
            break;
          }
        }
        return notCheckedAll;
      },
      // 节点文字点击事件
      textClick(){
        this.onTextClick && typeof this.onTextClick === "function" && this.onTextClick(this.itemData, this);
      },
      // 遍历子节点，并将子节点的数据添加到一个新的数组中
      _forEachChildren(children, arr){
        children.forEach(child => {
          arr.push(child.itemData);
          if(child.$children && child.$children.length > 0){
            this._forEachChildren(child.$children, arr);
          }
        });
        return arr;
      },
      _expandNode(flag){
        this.isExpand = !!flag;
        this.calWidth();
      },
      // 计算当前节点层级
      _calculateLevel(vm){
        let level = 0;
        if(vm.$options.name === "VueAuthtreeNode"){
          level++;
          level += this._calculateLevel(vm.$parent);
        }
        return level;
      },
      // 计算外层容器宽度
      calWidth(){
        this.$nextTick(() => {
          let agentTreeEle = document.getElementById(this.authTreeId),
            cloneEle = agentTreeEle.cloneNode(true),
            tempEle = document.createElement("div"),
            tempEleCss = "position: absolute;top: -9999px;opacity: 0;width: 9999px;",
            cssText = "display: inline-block;width: auto;opacity: 0;";

          tempEle.style.cssText = tempEleCss;
          cloneEle.id = "";
          cloneEle.style.cssText = cssText;
          tempEle.appendChild(cloneEle);
          document.body.appendChild(tempEle);

          let timer = setTimeout(() => {
            agentTreeEle.style.width = cloneEle.clientWidth + "px";
            document.body.removeChild(tempEle);
            clearTimeout(timer);
          }, 20);
        });
      },
    },
    computed: {
      hasChildren(){
        return this.itemData.children && this.itemData.children.length > 0;
      }
    },
    mounted(){
      // 如果是父节点，则需判断父节点的状态是否是模糊的
      if(this.hasChildren){
        let childCheckedAll = this.childCheckedAll(this.$children);
        this.indeterminate = this.itemData.checked && !childCheckedAll;
      }
      if(this.expand){
        // 如果默认是展开状态，并且当前节点的级别超过了指定级别，则让父节点隐藏子节点
        if(this.expandLevel > 0 && this._calculateLevel(this) > this.expandLevel){
          this.$parent._expandNode(false);
        }
        this.calWidth();
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "font/iconfont.css"
  @import "vue-authtree.styl"
</style>
