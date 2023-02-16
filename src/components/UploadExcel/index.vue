<template>
  <input
    ref="refInput"
    class="excel-upload-input"
    type="file"
    accept=".xlsx, .xls"
    @change="handleClick"
  />
  <div
    class="drop"
    @drop="handleDrop"
    @dragover="handleDragover"
    @dragenter="handleDragover"
  >
    Drop excel file here or
    <el-button
      :loading="loading"
      style="margin-left: 16px"
      type="primary"
      @click="handleUpload"
    >
      Browse
    </el-button>
  </div>
</template>

<script setup>
import { read, utils } from 'xlsx'
import { ElMessage } from 'element-plus'
import { reactive, toRefs } from 'vue'

const emits = defineEmits(['uploadSuccess'])
const props = defineProps({
  size: {
    type: Number,
    default: 5
  }
})

const state = reactive({
  loading: false,
  refInput: null
})

const { loading, refInput } = toRefs(state)

const getHeaderRow = (sheet) => {
  const headers = []
  const range = utils.decode_range(sheet['!ref'])
  let C
  const R = range.s.r
  /* start in the first row */
  for (C = range.s.c; C <= range.e.c; ++C) {
    /* walk every column in the range */
    const cell = sheet[utils.encode_cell({ c: C, r: R })]
    /* find the cell in the first row */
    let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
    if (cell && cell.t) hdr = utils.format_cell(cell)
    headers.push(hdr)
  }
  return headers
}

const readerData = (rawFile) => {
  state.loading = true
  const reader = new FileReader()
  reader.onload = (e) => {
    const data = e.target.result
    const workbook = read(data, { type: 'array' })
    const firstSheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[firstSheetName]
    const header = getHeaderRow(worksheet)
    const results = utils.sheet_to_json(worksheet)
    emits('uploadSuccess', { header, results })
    state.loading = false
  }
  reader.readAsArrayBuffer(rawFile)
}

const beforeUpload = (rawFile) => {
  if (rawFile.size / 1024 / 1024 < props.size) return true
  ElMessage.warning(
    `Please do not upload files larger than ${props.size}m in size.`
  )
  return false
}

const upload = (rawFile) => {
  state.refInput.value = null // fix can't select the same excel
  if (beforeUpload(rawFile)) readerData(rawFile)
}

const handleClick = (e) => {
  const files = e.target.files
  const rawFile = files[0] // only use files[0]
  if (!rawFile) return
  upload(rawFile)
}

const isExcel = (file) => {
  return /\.(xlsx|xls|csv)$/.test(file.name)
}

const handleDrop = (e) => {
  e.stopPropagation()
  e.preventDefault()
  if (state.loading) return
  const files = e.dataTransfer.files
  if (files.length !== 1)
    return ElMessage.error('Only support uploading one file!')
  const rawFile = files[0] // only use files[0]

  if (!isExcel(rawFile))
    return ElMessage.error(
      'Only supports upload .xlsx, .xls, .csv suffix files'
    )
  upload(rawFile)
}

const handleDragover = (e) => {
  e.stopPropagation()
  e.preventDefault()
  e.dataTransfer.dropEffect = 'copy'
}

const handleUpload = () => {
  state.refInput.click()
}
</script>

<style lang="scss">
.excel-upload-input {
  display: none;
  z-index: -9999;
}
.drop {
  border: 2px dashed #bbb;
  width: 600px;
  height: 160px;
  line-height: 160px;
  margin: 0 auto;
  font-size: 24px;
  border-radius: 5px;
  text-align: center;
  color: #bbb;
  position: relative;
}
</style>
