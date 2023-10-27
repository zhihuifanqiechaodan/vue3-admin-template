import { createI18n } from 'vue-i18n'
import settings from '@/settings'
import { getCookieItem } from '@/utils/storage'

import enUs from './en-us'
import zhCn from './zh-cn'

export const messages = {
  'en-us': enUs,
  'zh-cn': zhCn
}

const i18n = createI18n({
  legacy: false,
  locale: getCookieItem('locale', settings.locale),
  messages
})

export default i18n
