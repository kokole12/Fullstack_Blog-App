<template>
    <nav class="relative container mx-auto p-6 h-full">
        <div class="flex items-center justify-between">
            <div class="pt-2 space-x-6">
                <router-link :to="{name: 'home'}" class="logo text-2xl font-bold">My Blog</router-link>
                <input type="text" class=" border-solid rounded-xl p-1" placeholder="search">
            </div>
            <div class="hidden md:flex space-x-6">
                <router-link :to="{name: 'home'}" class="hover:border-gray-300">Home</router-link>
                <a href="">Stories</a>
                <a href="">My stories</a>
            </div>
            <div class="hidden md:flex space-x-6">
                <a href="" class="p-3 pt-2">write</a>
                <a href="" class="p-3 px-6 pt-2 bg-gray-300 rounded-full">login</a>
                <a href="" class="p-3 px-6 pt-2 bg-blue-500 text-white rounded-full hover:bg-blue-300">Sign in</a>
            </div>
        </div>
    </nav>
    <hr/>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>