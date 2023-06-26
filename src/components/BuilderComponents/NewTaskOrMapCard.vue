<template>
    <div class="add-card">
        <h2>{{ cardHeader }}</h2>
        <div class="selection-wrapper">
            <div
                @click="$emit('createNew')"
                class="selection create-new"
            >
                <svg class="add-button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
                </svg>
                <span>{{ t('create-new') }}</span>
            </div>
            <div
                @click="$emit('addById')"
                class="selection add-by-id"
            >
                <svg class="add-button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
                </svg>
                <span>{{ t('add-by-id') }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'new-task-or-map-card',
    props: {
        cardHeader: {
            type: String,
            required: true
        }
    },
    methods: {
        t(target) { return this.$store.getters.translation(target) }
    }

}
</script>

<style scoped>
.add-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

}
h2 { margin: 0; }
.selection-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
.selection {
    margin: 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    fill: lightgrey;
}
.selection:hover {
    cursor: pointer;
    color: green;
    fill: green;
    transition: fill 200ms;
}
svg.add-button {
    width: 40px;
    height: 40px;
}
</style>