<template>
  <div class="export-excel-container">
    <div class="header">
      <div class="form-item">
        <div class="item-label">FileName：</div>
        <el-input v-model="filename" />
      </div>
      <div class="form-item">
        <div class="item-label">Cell Auto-Width：</div>
        <el-radio-group v-model="autoWidth">
          <el-radio :label="true" border>true</el-radio>
          <el-radio :label="false" border>false</el-radio>
        </el-radio-group>
      </div>
      <div class="form-item">
        <div class="item-label">Book Type:：</div>
        <el-select v-model="bookType">
          <el-option
            v-for="item in bookTypeOptions"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </div>
      <el-button
        @click="handleExportExcel"
        :loading="downloadLoading"
        type="primary"
        >Export Excel</el-button
      >
    </div>
    <div class="table-wrapper">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
      </el-table>
    </div>
  </div>
</template>

<script setup name="ExportExcel">
import { reactive, toRefs } from 'vue'

const state = reactive({
  filename: '',
  autoWidth: true,
  bookType: 'xlsx',
  bookTypeOptions: ['xlsx', 'csv', 'txt'],
  downloadLoading: false,
  tableData: [
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    },
    {
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    },
    {
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    }
  ]
})

const {
  filename,
  autoWidth,
  bookType,
  bookTypeOptions,
  downloadLoading,
  tableData
} = toRefs(state)

const handleExportExcel = () => {
  state.downloadLoading = true
  import('@/vendor/Export2Excel').then((excel) => {
    const header = ['date', 'name', 'address']
    const data = state.tableData.map((item) => {
      const arr = []
      for (const key in item) {
        arr.push(item[key])
      }
      return arr
    })
    excel.export_json_to_excel({
      header,
      data,
      filename: state.filename,
      autoWidth: state.autoWidth,
      bookType: state.bookType
    })
    state.downloadLoading = false
  })
}
</script>

<style lang="scss">
.export-excel-container {
  margin: 20px;
  background-color: #fff;
  padding: 20px;

  .header {
    display: flex;
    align-items: center;

    .form-item {
      display: flex;
      align-items: center;
      margin-right: 20px;

      .item-label {
        margin-right: 10px;
      }
    }
  }

  .table-wrapper {
    padding: 20px 0;
  }
}
</style>
