<template>
  <div>
    <div class="loading" v-if="TaskStore.loading">
        Loading Tasks....
    </div>
    <main>
        <div class="task-list" v-if="filter === 'all'">
            <section class="workout">
                <div>
             <p>All Workouts</p>
             <p>You have {{ TaskStore. totalCount}} Workouts</p>
            </div>
            </section>
            <div class="task" v-for="Task in TaskStore.tasks" :key="Task.id" >
                <h2>{{ Task.title }}</h2>
                <div>
                    <p>{{ Task.reps }}</p>
                    <p>{{ Task.load }}</p>
                </div>
            <div class="icons">
                <i class="material-icons"  @click="deleteTask(Task._id)">delete</i>
                <i class="material-icons" :class="{active: Task.isFav}" @click="toggleFav(Task._id)">favorite</i>
            </div>
            </div>
        </div>
    </main>
  </div>
</template>

<script>
import { ref } from "vue";
import { useTaskStore } from '../stores/TaskStore'
export default {
    setup() {
        const TaskStore = useTaskStore()

        //fetch tasks
        TaskStore.getTasks()
        //delete tasks
        const deleteTask = async(_id) => {
           await TaskStore.deleteTask(_id)
        }

        //toggle fav for true and false
        const toggleFav = async(_id) => {
            await TaskStore.toggleFav(_id)
        }

        const filter = ref('all')



        return {TaskStore, filter,deleteTask, toggleFav}
    }
}
</script>s

<style>
.active{
    color: red;
}
.workout{
    display: flex;
    justify-content: space-between;
}
</style>