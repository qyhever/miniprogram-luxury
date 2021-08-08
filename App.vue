<script>
export default {
  onLaunch () {
    console.log('App onLaunch')
    // 小程序自动更新
    if (uni.canIUse('getUpdateManager')) {
      const updateManager = uni.getUpdateManager()
      updateManager.onCheckForUpdate(res => {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          updateManager.onUpdateReady(() => {
            uni.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: res => {
                // res: {errMsg: "showModal: ok", cancel: false, confirm: true}
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(() => {
            // 新的版本下载失败
            uni.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
            })
          })
        }
      })
    }
  },
  onShow () {
    console.log('App Show')
  },
  onHide () {
    console.log('App Hide')
  }
}
</script>

<style lang="scss">
/*每个页面公共css */
@import "uview-ui/index.scss";

page {
  background-color: $color-bg;
}
</style>
