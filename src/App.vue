<template>
  <div id="app">
    <vueAuth :tree-data="treeData" :expand="true"></vueAuth>
  </div>
</template>

<script>
import vueAuth from './components/vue-authtree/VueAuthtree'

export default {
  name: 'app',
  data(){
    return {
      treeData: [
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
                            readonly: false,
                            children: [
                                {
                                    text: "数学-下册1",
                                    value: "mathematics2",
                                    name: "primary_school",
                                    checked: false,
                                    disabled: false,
                                    readonly: false,
                                    children: [
                                        {
                                            text: "数学-下册11",
                                            value: "mathematics21",
                                            name: "primary_school",
                                            checked: false,
                                            disabled: false,
                                            readonly: false
                                        },
                                        {
                                            text: "数学-下册112",
                                            value: "mathematics212",
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
                }
            ]
        }
      ],
    }
  },
  methods: {
    onChange(data,vm){
        console.log(data);
    },
    textClick(data){
        console.log(data);
    },
  },
  components: {
    vueAuth
  }
}
</script>
