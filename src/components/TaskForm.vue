<template>
  <div>
    <form @submit.prevent="handleSubmit">
        <input type="text" name="text" placeholder="I need to ..." v-model="title">
        <input type="number" name="reps" placeholder="reps" v-model="reps">
        <input type="number" name="load" placeholder="load" v-model="load">
        <button>Add</button>
    </form>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useTaskStore } from "../stores/TaskStore";
export default {
    setup(){
        const TaskStore = useTaskStore()
        
        const title = ref('')
        const reps = ref(0)
        const load = ref(0)

        const handleSubmit = () => {
            if (title.value.length > 0) {
                TaskStore.addTask({
                    title:title.value,
                    reps:reps.value,
                    load:load.value
                })
                title.value = '';
                reps.value = '';
                load.value = '';
            }
        }
        return{TaskStore,title,reps,load,handleSubmit}
    }
}
</script>

<style>

</style>