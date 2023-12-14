<template>
    <section id="hero" class="mb-8">
        <div class="container flex flex-col-reverse md:flex-row items-center px-6 mx-auto mt-10 space-y-0 md:space-y-0">
            <div class="flex flex-col mb-32 space-y-12 md:w-1/2">
                <h1 class="max-w-md text-4xl justify-center font-bold text-center md:text-5xl md:text-left">
                    The easy way to share stories with your community
                </h1>
                <p class="max-w-sm text-center md:text-left">
                    Get starting blog today and get great engagements with your audience
                </p>

                <div class="flex justify-center md:justify-start space-x-6">
                    <a href="" class="p-3 px-6 pt-2 bg-gray-300 rounded-full">login</a>
                    <a href="" class="p-3 px-6 pt-2 bg-blue-500 text-white rounded-full hover:bg-blue-300">Sign in</a>
                </div>
            </div>

            <!-- image-->
            <div class="md:w-1/2 mx-10 w-9">
                <img src="../../public/blog.svg" alt="" class="font-3xl">
            </div>
        </div>
    </section>

    <section id="features">
        <div class="container flex flex-col space-y-12 mx-auto mt-10 md:space-y-0 md:flex-row">
            <div>
                <h2 class="max-w-md text-4xl font-bold text-center">
                    What is different about my blog
                </h2>

                <p class="max-w-sm text-center text-gray-400 md:text-left mt-3">
                    My blog provides all the features you need to manage your blog posts and engagements
                </p>
            </div>
        </div>
    </section>
    <ActionCall/>
</template>

<script setup>
import ActionCall from '../components/ActionCall.vue';

</script>

<style scoped>

</style>