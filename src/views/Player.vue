<template>
  <div v-if="content" class="wrapper">
    <TaskPlayer
      v-if="isTask"
      :task="content"
      @taskCorrect="$emit('taskCorrect', $event)"
    />
    <MapPlayer v-else-if="isMap" :map="content" />
    <span v-else>Unknown type of content</span>
  </div>
  <div v-else>loading...</div>
</template>

<script>
  import TaskPlayer from '../components/TaskPlayer/index.vue'
  import MapPlayer from '../components/MapPlayer/index.vue'

  export default {
    components: {
      TaskPlayer,
      MapPlayer
    },
    props: {
      id: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        content: null
      }
    },
    computed: {
      isTask() {
        return !!this.content.worlds
      },
      isMap() {
        return !this.isTask
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