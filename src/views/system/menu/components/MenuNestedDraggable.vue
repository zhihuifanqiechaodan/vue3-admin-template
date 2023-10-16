<template>
  <draggable
    @end="onDragEndCallback"
    :disabled="!props.enabled"
    :move="onMoveCallback"
    :list="props.list"
    :group="{ name: 'g1' }"
    item-key="id"
    ghost-class="ghost"
    class="dragArea"
    :class="{ dragArea_open: props.enabled }"
  >
    <template #item="{ element }">
      <div class="drag-item">
        <div class="drag-item-menu">
          <div class="menu-item">标题：{{ element.title }}</div>
          <div class="menu-item">图标： <SvgIcon :name="element.icon" /></div>
          <div class="menu-item">路径：{{ element.path }}</div>
          <div class="menu-item">
            类型：
            <el-tag :type="typeEnum[element.type].type">{{
              typeEnum[element.type].label
            }}</el-tag>
          </div>
          <div class="menu-item">
            状态：
            <el-tag v-if="element.hidden" type="danger">隐藏</el-tag>
            <el-tag v-else type="success">显示</el-tag>
          </div>
          <div class="menu-item">
            <el-button @click="onDragItemEdit(element)" type="primary"
              >编辑</el-button
            >
          </div>
        </div>
        <MenuNestedDraggable
          v-if="element.type === 0"
          :list="element.children"
          :disabled="!props.enabled"
        />
      </div>
    </template>
  </draggable>
</template>

<script setup>
import draggable from 'vuedraggable'
import { defaultLayoutRoute } from '@/router/index'
import { inject } from 'vue'

const typeEnum = {
  0: {
    type: 'danger',
    label: '菜单目录'
  },
  1: {
    type: 'success',
    label: '菜单'
  }
}

const props = defineProps(['list', 'enabled'])

const onMoveCallback = (evt) => {
  if (evt.draggedContext.element.type === 0) {
    if (evt.relatedContext.element?.type === 2) {
      return false
    } else {
      if (
        evt.draggedContext.element.layout === defaultLayoutRoute.layout &&
        !evt.relatedContext.element
      ) {
        return false
      }

      if (
        evt.draggedContext.element.layout === defaultLayoutRoute.layout &&
        evt.relatedContext.element?.parentId !== 0
      ) {
        return false
      }
    }
  }
  if (evt.draggedContext.element.type === 1) {
    if (evt.relatedContext.element?.type === 2) {
      return false
    }
  }
  if (evt.draggedContext.element.type === 2) {
    if (
      evt.draggedContext.element.parentId !==
      evt.relatedContext.element?.parentId
    ) {
      return false
    }
  }
}

const updateMenuParentId = inject('updateMenuParentId')

const onDragEndCallback = () => {
  updateMenuParentId()
}

const handleMenuEdit = inject('handleMenuEdit')

const onDragItemEdit = (element) => {
  handleMenuEdit(element)
}
</script>

<style lang="scss" scoped>
.dragArea {
  outline: 1px dashed !important;
  min-height: 100px;
  padding: 20px;
  box-sizing: border-box;

  &.dragArea_open {
    .drag-item {
      cursor: move;

      &:hover {
        background-color: #c8ebfb;
      }
    }
  }

  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }

  .drag-item {
    .drag-item-menu {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px;

      .menu-item {
        flex: 1;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
