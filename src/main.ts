import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import './assets/css/global.css'
import ElementPlus from 'element-plus'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import { ElMessage, ElMessageBox } from 'element-plus'

const app = createApp(App)
app.config.globalProperties.$message = ElMessage
app.config.globalProperties.$confirm = ElMessageBox.confirm
app.use(ElementPlus, { locale })
app.use(router)
app.mount('#app')

