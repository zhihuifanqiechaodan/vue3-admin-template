<template>
  <div class="app-container">
    <div class="form-wrapper">
      <div class="form-item">
        <div class="form-item-label">创建时间：</div>
        <el-date-picker
          v-model="shijian"
          format="YYYY-MM-DD hh:mm:ss"
          type="date"
          placeholder="Pick a day"
        />
        <el-checkbox v-model="fixedShijian" label="固定" border />
      </div>
      <div class="form-item">
        <div class="form-item-label">所在仓库：</div>
        <el-select v-model="cangku" filterable placeholder="请选择仓库">
          <el-option
            v-for="item in cangkuList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="form-item">
        <div class="form-item-label">重量：</div>
        <el-input v-model="zhongliang" placeholder="请输入重量" />
        <el-checkbox v-model="fixedZhongliang" label="固定" border />
      </div>
      <div class="form-item">
        <div class="form-item-label">识别码：</div>
        <el-select v-model="shibiema" placeholder="请选择仓库">
          <el-option
            v-for="item in shibiemaList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="form-item">
        <div class="form-item-label">入库码：</div>
        <el-input v-model="rukuma" placeholder="请输入重量" />
      </div>
      <div class="form-item">
        <div class="form-item-label">美国境内单号：</div>
        <el-input v-model="meiguojingneidanhao" placeholder="请输入重量" />
      </div>
      <div class="form-item">
        <div class="form-item-label">备注(选填)：</div>
        <el-input v-model="beizhu" placeholder="前台客服留言" />
      </div>
    </div>
    <el-table :data="goodsList" style="width: 100%">
      <el-table-column label="SKU">
        <template #default="{ row, $index }">
          <el-input
            v-model="row.sku"
            @keyup.enter="handleSkuEnter(row, $index)"
            :id="$index + '_sku'"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="品牌">
        <template #default="{ row, $index }">
          <el-input
            v-model="row.brand"
            @keyup.enter="handleBrandEnter(row)"
            :id="$index + '_brand'"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="货号">
        <template #default="{ row, $index }">
          <el-input
            v-model="row.no"
            @keyup.enter="handleNoEnter(row)"
            :id="$index + '_no'"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="品名">
        <template #default="{ row, $index }">
          <el-input
            v-model="row.title"
            @keyup.enter="handleTitleEnter(row)"
            :id="$index + '_title'"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="规格">
        <template #default="{ row, $index }">
          <el-input
            v-model="row.spec"
            @keyup.enter="handleSpecEnter(row)"
            :id="$index + '_spec'"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="品类">
        <template #default="{ row }">
          <el-input v-model="row.category"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="原产地">
        <template #default="{ row }">
          <el-input v-model="row.source_area"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="价格">
        <template #default="{ row }">
          <el-input v-model="row.price"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="倍数">
        <template #default="{ row }">
          <el-input v-model="row.bs"></el-input>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default>
          <el-button type="primary">保存</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup name="WarehouseAdd">
import { reactive, toRefs, nextTick } from 'vue'

const state = reactive({
  shijian: new Date().getTime(),
  fixedShijian: false,
  cangku: '',
  cangkuList: [
    {
      value: 'Option1',
      label: 'Option1'
    },
    {
      value: 'Option2',
      label: 'Option2'
    },
    {
      value: 'Option3',
      label: 'Option3'
    }
  ],
  zhongliang: '',
  fixedZhongliang: false,
  shibiema: '',
  shibiemaList: [
    {
      value: 'Option1',
      label: 'Option1'
    },
    {
      value: 'Option2',
      label: 'Option2'
    },
    {
      value: 'Option3',
      label: 'Option3'
    }
  ],
  rukuma: '',
  meiguojingneidanhao: '',
  beizhu: '',
  goodsList: [
    {
      sku: '',
      brand: '',
      no: '',
      title: '',
      spec: '',
      category: '',
      source_area: '',
      price: '',
      bs: ''
    }
  ],
  refList: []
})

const {
  shijian,
  fixedShijian,
  cangku,
  cangkuList,
  zhongliang,
  fixedZhongliang,
  shibiema,
  shibiemaList,
  rukuma,
  meiguojingneidanhao,
  beizhu,
  goodsList
} = toRefs(state)

const handleAutoFoucs = () => {
  for (let i = 0; i < state.goodsList.length; i++) {
    const item = state.goodsList[i]
    if (!item.sku) {
      document.getElementById(`${i}_sku`).focus()
      break
    } else if (!item.brand) {
      document.getElementById(`${i}_brand`).focus()
      break
    } else if (!item.no) {
      document.getElementById(`${i}_no`).focus()
      break
    } else if (!item.title) {
      document.getElementById(`${i}_title`).focus()
      break
    } else if (!item.spec) {
      document.getElementById(`${i}_spec`).focus()
      break
    }
  }
}

const handleSkuEnter = (row, index) => {
  // 调用接口，当前sku存在，使用接口返回数据赋值，自动创建下一个item
  // 模拟成功
  if (row.sku === '2') {
    state.goodsList[index] = {
      id: 10665,
      sku: '2',
      brand: '2',
      no: '2',
      title: '2',
      spec: '2',
      category: '2',
      source_area: '',
      images: ''
    }
    state.goodsList.push({
      sku: '',
      brand: '',
      no: '',
      title: '',
      spec: '',
      category: '',
      source_area: '',
      price: '',
      bs: ''
    })
    nextTick(() => {
      handleAutoFoucs()
    })
    // 语音提示当前下标
  } else {
    // 语音提示该sku不存在
    if (row.sku) {
      handleAutoFoucs()
    }
  }

  // sku不存在
}
const handleBrandEnter = (row) => {
  row.brand && handleAutoFoucs()
}
const handleNoEnter = (row) => {
  row.no && handleAutoFoucs()
}
const handleTitleEnter = (row) => {
  row.title && handleAutoFoucs()
}
const handleSpecEnter = (row) => {
  row.spec && handleAutoFoucs()
}
</script>

<style lang="scss">
.app-container {
  padding: 20px;

  .form-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    .el-input {
      width: 200px;
    }

    .el-checkbox {
      margin-left: 10px;
    }

    .form-item-label {
      width: 100px;
      text-align: right;
    }
  }
}
</style>
