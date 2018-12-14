<template>
    <div id="app">
        <div id="nav" class="container mx-auto p-6 bg-ix-purple">
            <ul class="list-reset flex">
                <li class="mr-6 p-4 bg-ix-blue rounded">
                    <router-link class="text-white no-underline" to="/"><strong>Log</strong>out</router-link>
                </li>
            </ul>
        </div>
        <router-view/>
    </div>
</template>

<style lang="scss">
    @import "./styles/global.scss";
</style>
