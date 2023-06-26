<template>
  <div v-if="content" class="wrapper">
    <TaskPlayer v-if="isTask" :task="content" />
  </div>
  <div v-else>loading...</div>
</template>

<script>
import TaskPlayer from '../components/TaskPlayer/index.vue'

  export default {
    components: {
      TaskPlayer
    },
    data() {
      return {
        content: null
      }
    },
    computed: {
      id() {
        return this.$route.params.id
      },
      isTask() {
        return !!this.content.worlds
      },
      isMap() {
        return !!this.isTask
      }
    },
    async created() {
      this.content = await Agent.download(this.id).then(r => r.json())
    }
  }

</script>

<style scoped>
.wrapper
{
  width: 100vw;
  height: 100vh;
}

</style>