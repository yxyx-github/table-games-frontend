import { boot } from 'quasar/wrappers'
import PrimeVue from 'primevue/config'
// import 'primevue/resources/themes/lara-light-blue/theme.css'
// import 'primeicons/primeicons.css'
import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip'
import Lara from '@/presets/lara'

export default boot(({ app }) => {
    // app.use(PrimeVue)
    app.use(PrimeVue, {
        unstyled: true,
        pt: Lara
    })
    app.use(ToastService)
    app.directive('tooltip', Tooltip)
})
