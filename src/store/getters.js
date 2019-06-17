const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    themeColor: state => state.app.themeColor,
    menuIndex: state => state.app.menuIndex, // 侧边栏选中
    menuMap: state => state.app.menuMap, // 侧边栏数据
    userInfo: state => state.user.userInfo, // 侧边栏数据
}
export default getters
