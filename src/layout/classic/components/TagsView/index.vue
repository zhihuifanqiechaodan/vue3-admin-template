<template>
    <div ref="refTagsViewContainer" class="tags-view-container">
        <scroll-pane ref="refScrollPane" class="tags-view-wrapper" @scroll="handleScroll" :refTag="refTag">
            <router-link v-for="tag in visitedViews" ref="refTag" :key="tag.path" :class="isActive(tag) ? 'active' : ''"
                :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }" tag="span" class="tags-view-item"
                @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''" @contextmenu.prevent="openMenu(tag, $event)">
                <span class="tags-title">{{ tag.title }}</span>
                <svg-icon v-if="!isAffix(tag)" name="close" class="el-icon-close"
                    @click.prevent.stop="closeSelectedTag(tag)" />
            </router-link>
        </scroll-pane>
        <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
            <li @click="refreshSelectedTag(selectedTag)">Refresh</li>
            <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
                Close
            </li>
            <li @click="closeOthersTags">Close Others</li>
            <li @click="closeAllTags(selectedTag)">Close All</li>
        </ul>
    </div>
</template>
    
<script setup>
import ScrollPane from "./ScrollPane.vue";
import path from "path-browserify";
import { computed, nextTick, onMounted, reactive, toRefs, watch } from "vue";
import { usePermissionStore } from "@/store/permission";
import { useTagsViewStore } from "@/store/tagsView";
import { useRoute, useRouter } from "vue-router";

const state = reactive({
    visible: false,
    top: 0,
    left: 0,
    selectedTag: {},
    affixTags: [],
    refTag: null,
    refScrollPane: null,
    refTagsViewContainer: null,
});

const { visible, top, left, selectedTag, refTag, refScrollPane, refTagsViewContainer } =
    toRefs(state);

const router = useRouter();
const route = useRoute();
const tagsViewStore = useTagsViewStore();
const permissionStore = usePermissionStore();

const visitedViews = computed(() => tagsViewStore.visitedViews);
const routes = computed(() => permissionStore.routes);

watch(() => route.path, () => {
    addTags();
    moveToCurrentTag();
});
watch(
    () => state.visible,
    (newValue) => {
        if (newValue) {
            document.body.addEventListener("click", closeMenu);
        } else {
            document.body.removeEventListener("click", closeMenu);
        }
    }
);

const isActive = (tag) => {
    return tag.path === route.path;
};

const isAffix = (tag) => {
    return tag.meta && tag.meta.affix;
};

const filterAffixTags = (routeList, basePath = "/") => {
    let tags = [];
    routeList.forEach((routeItem) => {
        if (routeItem.meta && routeItem.meta.affix) {
            const tagPath = path.resolve(basePath, routeItem.path);
            tags.push({
                fullPath: tagPath,
                path: tagPath,
                name: routeItem.name,
                meta: { ...routeItem.meta },
            });
        }
        if (routeItem.children) {
            const tempTags = filterAffixTags(routeItem.children, routeItem.path);
            if (tempTags.length >= 1) {
                tags = [...tags, ...tempTags];
            }
        }
    });
    return tags;
};

const initTags = () => {
    state.affixTags = filterAffixTags(routes.value);
    for (const tag of state.affixTags) {
        // Must have tag name
        if (tag.name) {
            tagsViewStore.addView(tag);
        }
    }
};

const addTags = () => {
    const { name } = route;
    if (name) {
        tagsViewStore.addView(route);
    }
    return false;
};

const moveToCurrentTag = () => {
    nextTick(() => {
        for (const tag of refTag.value) {
            if (tag.to.path === route.path) {
                refScrollPane.value.moveToTarget(tag);
                // when query is different then update
                if (tag.to.fullPath !== route.fullPath) {
                    tagsViewStore.updateVisitedView(route);
                }
                break;
            }
        }
    });
};

const refreshSelectedTag = (view) => {
    tagsViewStore.delCachedView(view).then(() => {
        const { fullPath } = view;
        nextTick(() => {
            router.replace({
                path: "/redirect" + fullPath,
            });
        });
    });
};

const closeSelectedTag = (view) => {
    tagsViewStore.delView(view).then(({ visitedViews }) => {
        if (isActive(view)) {
            toLastView(visitedViews, view);
        }
    });
};

const closeOthersTags = () => {
    router.push(selectedTag);
    tagsViewStore.delOthersViews(selectedTag).then(() => {
        moveToCurrentTag();
    });
};

const closeAllTags = (view) => {
    tagsViewStore.delAllViews().then(({ visitedViews }) => {
        if (state.affixTags.some((tag) => tag.path === view.path)) {
            return;
        }
        toLastView(visitedViews, view);
    });
};

const toLastView = (visitedViews, view) => {
    const latestView = visitedViews.slice(-1)[0];
    if (latestView) {
        router.push(latestView.fullPath);
    } else {
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if (view.name === "Dashboard") {
            // to reload home page
            router.replace({ path: "/redirect" + view.fullPath });
        } else {
            router.push("/");
        }
    }
};

const openMenu = (tag, e) => {
    const menuMinWidth = 105;
    const offsetLeft = refTagsViewContainer.value.getBoundingClientRect().left; // container margin left
    const offsetWidth = refTagsViewContainer.value.offsetWidth; // container width
    const maxLeft = offsetWidth - menuMinWidth; // left boundary
    const currentLeft = e.clientX - offsetLeft + 15; // 15: margin right

    if (currentLeft > maxLeft) {
        state.left = maxLeft;
    } else {
        state.left = currentLeft;
    }

    state.top = e.clientY;
    state.visible = true;
    state.selectedTag = tag;
};

const closeMenu = () => {
    state.visible = false;
};

const handleScroll = () => {
    closeMenu();
};

onMounted(() => {
    initTags();
    addTags();
});
</script>

<style lang="scss" scoped>
.tags-view-container {
    height: 40px;
    width: 100%;
    background: #fff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
    box-sizing: border-box;

    .tags-view-wrapper {
        .tags-view-item {
            display: inline-block;
            position: relative;
            cursor: pointer;
            height: 26px;
            line-height: 26px;
            border: 1px solid #d8dce5;
            color: #495060;
            background: #fff;
            padding: 0 10px;
            font-size: 12px;
            margin-left: 5px;

            &:first-of-type {
                margin-left: 15px;
            }

            &:last-of-type {
                margin-right: 15px;
            }

            &.active {
                background-color: #42b983;
                color: #fff;
                border-color: #42b983;

                &::before {
                    content: "";
                    background: #fff;
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    position: relative;
                    margin-right: 2px;
                }
            }

            .tags-title {
                padding: 0 5px;
            }

            .el-icon-close {
                vertical-align: middle;
                border-radius: 50%;
                text-align: center;
                transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
                transform-origin: 100% 50%;
                font-size: 12px;

                &:before {
                    transform: scale(0.6);
                    display: inline-block;
                    vertical-align: -3px;
                }

                &:hover {
                    background-color: #b4bccc;
                    color: #fff;
                }
            }
        }
    }

    .contextmenu {
        margin: 0;
        background: #fff;
        z-index: 3000;
        position: absolute;
        list-style-type: none;
        padding: 5px 0;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 400;
        color: #333;
        box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

        li {
            margin: 0;
            padding: 7px 16px;
            cursor: pointer;

            &:hover {
                background: #eee;
            }
        }
    }
}
</style>