import { boot } from 'quasar/wrappers'
import i18n from '@/locale'

export default boot(({ app }) => {
  // Set i18n instance on app
  app.use(i18n);
});
