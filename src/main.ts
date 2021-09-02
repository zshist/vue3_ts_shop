import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import './assets/css/global.css'
import { ElMessage, ElMessageBox } from 'element-plus'

const app = createApp(App)
app.config.globalProperties.$message = ElMessage
app.config.globalProperties.$confirm = ElMessageBox.confirm
app.use(router)
app.mount('#app')

