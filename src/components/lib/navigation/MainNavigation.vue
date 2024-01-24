<template>
    <Navigation>
        <NavigationItem :label="$t('home')" routeName="home"/>
    </Navigation>
</template>

<script setup lang="ts">
import Navigation from '@/components/lib/navigation/Navigation.vue'
import NavigationItem from '@/components/lib/navigation/NavigationItem.vue'
</script>
