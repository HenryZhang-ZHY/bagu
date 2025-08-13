<template>
  <Menubar :model="items">
    <template #start>
      <div class="pl-16"></div>
    </template>
    <template #item="{ item }">
      <Button :icon="item.icon" :label="item.label" @click="item.action" outlined />
    </template>
    <template #end>
      <div class="pr-16">
        <Button type="button" label="模板库" icon="pi pi-shop" :badge="templateLibraryNotificationBadgeValue"
          badgeSeverity="danger" outlined @click="openTemplateLibrary" />
      </div>
    </template>
  </Menubar>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import Menubar from 'primevue/menubar'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import { NotificationBadgeKeys, notificationBadgeManager } from '@/core/storage/Notification'

const router = useRouter()
const items = ref([
  {
    icon: 'pi pi-home',
    action: () => {
      router.push('/')
    },
  },
  {
    icon: 'pi pi-envelope',
    label: '联系作者',
    action: () => {
      contactAuthor()
    },
  }
])

const templateLibraryNotificationBadgeValue = ref<string | undefined>(undefined)

function openTemplateLibrary() {
  templateLibraryNotificationBadgeValue.value = undefined
  notificationBadgeManager.clear(NotificationBadgeKeys.TemplateLibrary)
  router.push({ name: 'TemplateLibrary' })
}

function contactAuthor() {
  const email = 'ended-crock-lilly@duck.com'
  const subject = '关于 Bagu 应用的咨询'
  const body = '您好，我对您的 Bagu 应用有一些问题想要咨询...'

  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  window.open(mailtoUrl, '_blank')
}

onMounted(async () => {
  const value = await notificationBadgeManager.get(NotificationBadgeKeys.TemplateLibrary) ?? undefined
  if (!value) {
    return
  }

  templateLibraryNotificationBadgeValue.value = String(value)
})
</script>
