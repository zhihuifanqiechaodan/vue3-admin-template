<template>
  <el-table :data="props.tableData" table-layout="auto" row-key="id" border>
    <el-table-column :label="$t('menuPage.table.name')" fixed="left">
      <template #default="scope">
        <span class="title">{{ scope.row.title }}</span>
      </template>
    </el-table-column>
    <el-table-column :label="$t('menuPage.table.icon')" align="center">
      <template #default="scope">
        <SvgIcon v-if="scope.row.icon" :name="scope.row.icon" class="icon" />
      </template>
    </el-table-column>
    <el-table-column
      :label="$t('menuPage.table.type')"
      width="100"
      align="center"
    >
      <template #default="scope">
        {{ typeEnum[scope.row.type].label }}
      </template>
    </el-table-column>
    <el-table-column prop="path" :label="$t('menuPage.table.path')" />
    <el-table-column
      :label="$t('menuPage.table.auth')"
      width="100"
      align="center"
    >
      <template #default="scope">
        <el-tag v-if="scope.row.auth" type="success">是</el-tag>
        <el-tag v-else type="info">否</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      :label="$t('menuPage.table.cache')"
      width="100"
      align="center"
    >
      <template #default="scope">
        <el-tag v-if="scope.row.cache" type="success">是</el-tag>
        <el-tag v-else type="info">否</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      :label="$t('menuPage.table.status')"
      width="100"
      align="center"
    >
      <template #default="scope">
        <el-tag v-if="scope.row.hidden" type="info">隐藏</el-tag>
        <el-tag v-else type="success">显示</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      :label="$t('menuPage.table.operations')"
      align="center"
    >
      <template #default="scope">
        <el-button
          v-if="scope.row.type !== 2"
          @click="emits('handleMenuEdit', scope.row)"
          type="primary"
          link
          >编辑</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
const props = defineProps(['tableData'])

const emits = defineEmits(['handleMenuEdit'])

const typeEnum = {
  0: {
    type: 'warning',
    label: '目录'
  },
  1: {
    type: 'success',
    label: '菜单'
  },
  2: {
    type: 'danger',
    label: '按钮'
  }
}
</script>

<style lang="scss" scoped></style>
