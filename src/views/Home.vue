<template>
  <div id="home">
     <!-- loading -->
    <div class="loading" v-if="TaskStore.loading">Loading tasks...</div>
    <div>
        <div>
            <TaskForm/>
        </div>
    </div>
    <TaskDetails/>
  </div>
</template>

<script>
import { useTaskStore} from '../stores/TaskStore'
import TaskDetails from '../components/TaskDetails.vue'
import TaskForm from '../components/TaskForm.vue'
import { ref } from '@vue/reactivity'
import { useAuthStore } from '../stores/authStore'
export default {
    components: {TaskDetails,TaskForm},
    setup() {
        const TaskStore = useTaskStore()
        const AuthStore = useAuthStore()

        
        return{TaskStore,AuthStore}
    }
// const TaskStore = useTaskStore()
}
</script>

<style scoped>
#home{
    margin-top: 5rem;
}
</style>