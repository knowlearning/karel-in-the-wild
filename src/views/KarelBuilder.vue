<template>
  <div class="karel-builder">
    <Modal
      v-if="modalContent"
      :editing="editing"
      :id="modalContent"
      @save="save"
      @close="confirmCloseModal"
      @delete="confirmDeleteContent"
    >
      <component
        :is="componentInModal"
        :id="modalContent"
        
        @exit="closeModal"
        :previewMode="true"
      />
    </Modal>

    <Navbar
      :mode="mode"
      @setMode="mode = $event"
    />

    <div class="karel-builder-body">
      <NewTaskOrMapCard
        :cardHeader="mode === 'tasks' ? t('new-task') : t('new-map') "
        @createNew="customizeNewContent"
        @addById="mode === 'tasks' ? addTaskById() : addMapById()"
      />

      <ContentCard
        v-for="id in content" class="content-card"
        :key="`card-for-${id}`"
        :id="id"
        @preview="launchPreviewModal($event)"
        @edit="launchCustomizer($event)"
        @copy="launchCustomizer($event)"
      />
    </div>
  </div>
  
</template>

<script>
import Modal from '../helpers/VueModal.vue'
import Navbar from '../components/BuilderComponents/Navbar.vue'
import ContentCard from '../components/BuilderComponents/ContentCard.vue'
import NewTaskOrMapCard from '../components/BuilderComponents/NewTaskOrMapCard.vue'

import {
  confirmDeleteSwal,
  confirmCloseWithoutSaveSwal,
  noBlankNameSwal,
  noBlankInstructionsSwal,
  importTaskSwal,
  taskNotFoundSwal,
  importMapSwal,
  mapNotFoundSwal
} from '../helpers/projectSwallows.js'
import TaskCustomizer from '../components/BuilderComponents/TaskCustomizer/index.vue'
import TaskPlayer from '../components/TaskPlayer/index.vue'
import MapCustomizer from '../components/BuilderComponents/MapCustomizer.vue'
import MapPlayer from '../components/MapPlayer/index.vue'

export default {
  name: 'karel-builder',
  components: {
    Navbar,
    Modal,
    ContentCard,
    NewTaskOrMapCard,
    TaskCustomizer,
    TaskPlayer,
    MapCustomizer,
    MapPlayer
  },
  data() {
    return {
      mode: 'tasks',
      modalContent: null,
      editing: false,
    }
  },
  computed: {
    componentInModal() {
      const taskType = this.$store.getters.type(this.modalContent)
      if (this.editing && (taskType === 'map' || this.modalContent === 'newMap')) {
        return MapCustomizer
      } else if (this.editing && (taskType ==='task' || this.modalContent === 'newTask')) {
        return TaskCustomizer
      } else if (taskType === 'map') {
        return MapPlayer
      } else if (taskType === 'task') {
        return TaskPlayer
      } else {
        console.warn('cannot compute component for modal from modalContent:', this.modalContent)
        return undefined
      }
    },
    content() {
      return this.mode === 'maps' ? this.$store.getters.mapIds() : this.$store.getters.taskIds()
    },
  },
  methods: {
    t(target) {
      return this.$store.getters.translation(target)
    },
    async addMapById() {
      const { value, isDismissed } = await importMapSwal()
      if (isDismissed) return

      this.$store.dispatch('loadMapAndEmbedded', value)
        .catch(() => mapNotFoundSwal())
    },
    async addTaskById() {
      const { value, isDismissed } = await importTaskSwal()
      if (isDismissed) return

      this.$store.dispatch('loadTask', value)
        .catch(() => taskNotFoundSwal())
    },
    save() {
      const customizerState = this.$store.state.customizerState
      if (!customizerState || !customizerState.name ) {
        noBlankNameSwal()
        return
      }

      const type = (this.mode === 'tasks') ? 'task' : 'map'
      if (type === 'task' && !customizerState.instructions) {
        noBlankInstructionsSwal()
        return
      }

      const swapId = this.modalContent
      this.$store.dispatch('save', { swapId, type })
      this.closeModal()
    },
    launchCustomizer(id) {
      this.editing = true
      this.modalContent = id
    },
    launchPreviewModal(id) {
      this.modalContent = id
      this.editing = false
    },
    customizeNewContent() {
      // instead of a uuid (as we do as an edit base to eventuall save over), simply pass 'newMap' or 'newTask'
      this.modalContent = this.mode === 'maps' ? 'newMap' : 'newTask'
      this.editing = true
    },
    async confirmDeleteContent() {
      const { isConfirmed } = await confirmDeleteSwal()
      if (isConfirmed) {
        this.$store.dispatch('delete', this.modalContent)
        this.closeModal()
      }
    },
    async confirmCloseModal() {
      if (!this.editing) this.closeModal()
      else {
        const { isConfirmed } = await confirmCloseWithoutSaveSwal()
        if (isConfirmed) this.closeModal()
      }
    },
    closeModal() {
      this.modalContent = null
      this.$store.dispatch('updateCustomizerState', null)
      this.editing = false
    }
  }
}
</script>

<style scoped>
.karel-builder {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.karel-builder-body {
  flex-grow: 1;  
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}
</style>