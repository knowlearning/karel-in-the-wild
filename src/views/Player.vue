<template>
  <div v-if="content" class="wrapper" :key="id">
    <component
      v-if="isTask"
      :is="persistentTaskComponent"
      :task="content"
      @taskCorrect="$emit('taskCorrect', $event)"
    />
    <component
      v-else-if="isMap"
      :is="persistentMapComponent"
      :map="content"
    />
    <span v-else>Unknown type of content</span>
  </div>
  <div v-else>loading...</div>
</template>

<script>
  import TaskPlayer from '../components/TaskPlayer/index.vue'
  import MapPlayer from '../components/MapPlayer/index.vue'
  import { vuePersistentComponent } from '@knowlearning/agents'

  export default {
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
      },
      persistentTaskComponent() {
        console.log('TAAASK', this.content,vuePersistentComponent(TaskPlayer, this.id))
        return vuePersistentComponent(TaskPlayer, this.id)
      },
      persistentMapComponent() {
        console.log('MaaaaaP', this.content)
        return vuePersistentComponent(MapPlayer, this.id)
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