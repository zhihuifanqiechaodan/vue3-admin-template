<template>
  <div v-if="errorLogs.length > 0" class="errLog-container">
    <el-badge
      :value="errorLogs.length"
      @click="state.dialogTableVisible = true"
    >
      <el-button style="padding: 8px 10px" size="small" type="danger">
        <svg-icon name="bug" />
      </el-button>
    </el-badge>
    <el-dialog v-model="dialogTableVisible" width="80%">
      <template #header>
        <span style="padding-right: 10px">Error Log</span>
        <el-button type="primary" @click="clearAll">Clear All</el-button>
      </template>
      <el-table :data="errorLogs" border>
        <el-table-column label="Message">
          <template #default="{ row }">
            <div>
              <span class="message-title">Msg:</span>
              <el-tag type="danger">
                {{ row.err.message }}
              </el-tag>
            </div>
            <br />
            <div>
              <span class="message-title" style="padding-right: 10px"
                >Info:
              </span>
              <el-tag type="warning"> error in {{ row.info }} </el-tag>
            </div>
            <br />
            <div>
              <span class="message-title" style="padding-right: 16px"
                >Url:
              </span>
              <el-tag type="success">
                {{ row.url }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Stack">
          <template #default="{ row }">
            {{ row.err.stack }}
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, toRefs, computed } from 'vue'
import { useErrorLogStore } from '@/store/errorLog'

const state = reactive({
  dialogTableVisible: false
})

const { dialogTableVisible } = toRefs(state)

const errorLogStore = useErrorLogStore()

const errorLogs = computed(() => errorLogStore.logs)

const clearAll = () => {
  state.dialogTableVisible = false
  errorLogStore.clearErrorLog()
}
</script>

<style scoped lang="scss">
.errLog-container {
  display: flex;
  align-items: center;
  height: 100%;
  transition: background 0.3s;
  padding: 0 10px;

  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }

  .message-title {
    font-size: 16px;
    color: #333;
    font-weight: bold;
    padding-right: 8px;
  }
}
</style>
