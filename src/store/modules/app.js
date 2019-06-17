import { setStorage, getStorage } from '@/utils/handleStorage'

const app = {
    state: {
        // 侧边栏
        sidebar: {
            opened: !+getStorage('sidebarStatus'), // 侧边栏是否打开
            withoutAnimation: false // 用于优化手动改变屏幕宽度的时候侧边栏的过渡效果
        },
        themeColor: getStorage('theme') || '#5CC2D0', // 主题颜色
        // 设备是桌面还是手机
        device: 'desktop',
        // 页面头部文案
        pageTitle: '',
        // 侧边栏选中
        menuIndex: getStorage('menuIndex') || 0,
        menuMap: [
            {
                'title': 'My Invitation',
                'icon': 'icon-invitation',
                'path': '/ambassador/myInvitation'
            },
            {
                'title': 'Sharing materials',
                'icon': 'icon-share',
                'path': '/ambassador/sharingMaterials'
            },
            {
                'title': 'Personal information',
                'icon': 'icon-personal',
                'path': '/ambassador/personalInformation'
            }
        ]
    },
    mutations: {
        // 切换侧边栏状态
        TOGGLE_SIDEBAR: state => {
            if (state.sidebar.opened) {
                setStorage('sidebarStatus', 1)
            } else {
                setStorage('sidebarStatus', 0)
            }
            state.sidebar.opened = !state.sidebar.opened
            state.sidebar.withoutAnimation = false
        },
        // 开启侧边栏
        OPEN_SIDEBAR: (state, withoutAnimation) => {
            setStorage('sidebarStatus', 0)
            state.sidebar.opened = true
            state.sidebar.withoutAnimation = withoutAnimation
        },
        // 关闭侧边栏
        CLOSE_SIDEBAR: (state, withoutAnimation) => {
            setStorage('sidebarStatus', 1)
            state.sidebar.opened = false
            state.sidebar.withoutAnimation = withoutAnimation
        },
        // 切换设备信息
        TOGGLE_DEVICE: (state, device) => {
            state.device = device
        },
        // 切换主题颜色
        CHANGE_THEME_COLOR (state, themeColor) {
            state.themeColor = themeColor
            setStorage('theme', themeColor)
        },
        // 侧边栏选中索引
        CHANGE_MENU_INDEX (state, menuIndex) {
            state.menuIndex = menuIndex
            setStorage('menuIndex',menuIndex )
        },
        // 设置页面头部文案
        SET_PAGE_TITLE (state, pageTitle) {
            state.pageTitle = pageTitle
        },
        // 展示侧边栏数据
        SET_MENU_MAP (state, menuMap) {
            state.menuMap = menuMap
        }
    }
}

export default app
