<template>
    <div id="app">
            <div id="nav" class="container mx-auto p-6">
            <ul class="list-reset flex">
                <li class="mr-6">
                    <router-link class="text-blue" to="/">Logout</router-link>
                </li>
            </ul>
        </div>
        <router-view/>
    </div>
</template>

<style lang="scss">
    @import "./styles/global.scss";
</style>
