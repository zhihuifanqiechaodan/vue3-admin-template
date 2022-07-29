<template>
    <div class="navbar">
        <div class="left-menu">
            <hamburger id="hamburger-container" class="hamburger-container" />
            <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
        </div>
        <div class="right-menu">
            <search id="header-search" class="right-menu-item" />

            <error-log class="errLog-container right-menu-item " />

            <screenfull id="screenfull" class="right-menu-item " />

            <el-tooltip content="Global Size" effect="dark" placement="bottom">
                <size-select id="size-select" class="right-menu-item " />
            </el-tooltip>


            <el-dropdown class="avatar-container right-menu-item " trigger="click">
                <div class="avatar-wrapper">
                    <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar">
                    <i class="el-icon-caret-bottom" />
                </div>
                <el-dropdown-menu slot="dropdown">
                    <router-link to="/profile/index">
                        <el-dropdown-item>Profile</el-dropdown-item>
                    </router-link>
                    <router-link to="/">
                        <el-dropdown-item>Dashboard</el-dropdown-item>
                    </router-link>
                    <a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">
                        <el-dropdown-item>Github</el-dropdown-item>
                    </a>
                    <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
                        <el-dropdown-item>Docs</el-dropdown-item>
                    </a>
                    <el-dropdown-item divided @click.native="logout">
                        <span style="display:block;">Log Out</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
    
<script setup >
import { computed } from 'vue'
import Hamburger from './Hamburger.vue'
import Breadcrumb from './Breadcrumb.vue'
import Search from './Search.vue'
import ErrorLog from './ErrorLog.vue'
import Screenfull from './Screenfull.vue'
import SizeSelect from './SizeSelect.vue'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const avatar = computed(() => userStore.userInfo.avatar)


</script>

<style lang="scss" scoped>
.navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
    box-sizing: border-box;

    .left-menu {
        display: flex;
        align-items: center;

        .hamburger-container {
            cursor: pointer;
            transition: background .3s;
            -webkit-tap-highlight-color: transparent;

            &:hover {
                background: rgba(0, 0, 0, .025)
            }
        }

        .breadcrumb-container {
            float: left;
        }
    }

    .right-menu {
        display: flex;
        align-items: center;
        justify-content: flex-end;

        .right-menu-item {
            padding: 0 10px;
            color: #5a5e66;
            cursor: pointer;
            transition: background .3s;

            &:hover {
                background: rgba(0, 0, 0, .025)
            }
        }

        .avatar-container {
            margin-right: 30px;

            .avatar-wrapper {
                margin-top: 5px;
                position: relative;

                .user-avatar {
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                }

                .el-icon-caret-bottom {
                    cursor: pointer;
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>
