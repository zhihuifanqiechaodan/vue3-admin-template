<template>
  <div class="app-container">
    <div>{{ famliyList }}</div>
    <el-radio-group v-model="radio">
      <el-radio v-for="item in filterType" :label="item"
        >类型{{ item }}</el-radio
      >
    </el-radio-group>

    <div v-for="item in filterFamily">{{ item.name }}</div>
  </div>
</template>

<script setup>
import { computed } from "@vue/reactivity";
import { reactive, toRefs } from "vue";
const state = reactive({
  famliyList: [
    { type: 1, name: "mather", sex: 1 },
    { type: 2, name: "father", sex: 2 },
    { type: 3, name: "brother", sex: 2 },
    { type: 1, name: "妈妈", sex: 1 },
    { type: 2, name: "爸爸", sex: 2 },
    { type: 3, name: "兄弟", sex: 2 },
    { type: 4, name: "女儿", sex: 1 },
    { type: 5, name: "表兄1", sex: 2 },
    { type: 5, name: "表兄2", sex: 2 },
    { type: 5, name: "表兄3", sex: 2 },
    { type: 5, name: "表兄4", sex: 2 },
    { type: 5, name: "表兄5", sex: 2 },
  ],
  radio: 0,
});

const { radio, famliyList } = toRefs(state);

const filterType = computed(() => {
  const arr = [];
  state.famliyList.forEach((item) => {
    if (!arr.find((a) => a === item.type)) {
      arr.push(item.type);
    }
  });
  return arr;
});

const filterFamily = computed(() => {
  return state.famliyList.filter((item) => item.type === state.radio);
});
</script>

<style>
.app-container {
  margin: 20px;
}
</style>
