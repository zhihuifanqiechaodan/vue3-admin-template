<template>
  <div class="upload-excel-container">
    <UploadExcel @uploadSuccess="uploadSuccess" />
    <el-table
      :data="tableData"
      border
      highlight-current-row
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column
        v-for="item of tableHeader"
        :key="item"
        :prop="item"
        :label="item"
      />
    </el-table>
  </div>
</template>

<script setup name="UploadExcel">
import UploadExcel from '@/components/UploadExcel/index.vue'
import { reactive, toRefs } from 'vue'

const state = reactive({
  tableData: [],
  tableHeader: []
})

const { tableData, tableHeader } = toRefs(state)

const uploadSuccess = (data) => {
  console.log(data)
  state.tableData = data.results
  state.tableHeader = data.header
}
</script>

<style lang="scss">
.upload-excel-container {
  margin: 20px;
  background-color: #fff;
  padding: 20px;
}
</style>
