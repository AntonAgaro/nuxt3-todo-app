<script lang="ts" setup>
import Todo from '@/types/Todo';
import {Ref} from '@vue/reactivity';

useHead({
  title: 'Todo App',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  charset: 'utf-8',
  meta: [
    {
      name: 'description',
      content: 'Nuxt3 todo app'
    }
  ]
})

const todos: Ref<Todo[]> = ref([]);
const newTodo = ref('');

const saveItems = () => localStorage.setItem('todos', JSON.stringify(todos.value));

const addNewTodo = () => {
  if (!newTodo.value) return;
  todos.value.push({
    done: false,
    text: newTodo.value
  })
  newTodo.value = ''
  saveItems()
}

const doneTodo = (todo: Todo): void => {
  todo.done = !todo.done;
  saveItems()
}

const removeTodo = (idx: number): void => {
  todos.value.splice(idx, 1)
  saveItems()
}

onMounted(() => {
  const storageTodos: string | undefined = localStorage.getItem('todos');
  if (storageTodos) {
    todos.value = [...JSON.parse(storageTodos)]
  } else {

  }
})


</script>

<template>
  <div>
    <h1 class="title">Todo App</h1>
    <form class="form" @submit.prevent="addNewTodo">
      <label for="todo-input" class="label">New Todo</label>
      <input class="input" id="todo-input" v-model="newTodo">
      <button class="button">Add Todo</button>
    </form>
    <h2 class="subtitle">Todo List</h2>
    <ul class="list" v-if="todos.length">
      <li
        v-for="(todo, idx) in todos"
        :key="idx"
        class="list__item"
        :class="{done: todo.done}"
        @click="doneTodo(todo)"
      >
        <div class="list__item-content">{{ todo.text }}</div>
        <button class="list__item-btn" @click.stop="removeTodo(idx)">Remove</button>
      </li>
    </ul>
    <div class="info-text" v-else>Todo list is empty!</div>
  </div>
</template>

<style lang="scss">
.title {
  font-weight: 700;
  font-size: pix2rem(28);
  text-align: center;
}

.form {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.label {
  font-size: pix2rem(14);
  font-weight: 700;
}

.input, .button {
  padding: 0 pix2rem($size2);
  height: pix2rem($size5);
  box-shadow: none;
  outline: none;
  border-radius: pix2rem($size1);
  font-size: pix2rem(18);
}

.input {
  margin: pix2rem($size1) 0 pix2rem($size2);
  background: transparent;
  border: $border;
  color: inherit;
}

.button {
  cursor: pointer;
  background: $primaryColor;
  border: 1px solid $primaryColor;
  color: $secondTextColor;
  font-weight: 700;
  transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
  &:hover {
    background: $secondTextColor;
    color: $primaryColor;
  }
}

.subtitle {
  margin-top: pix2rem($size4);
  font-size: pix2rem(22);
  border-bottom: $border;
  padding-bottom: pix2rem($size1);
}

.list {
  padding: pix2rem(10);

  &__item {
    padding: pix2rem($size2) pix2rem($size4);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: $border;
    border-radius: #{$size1}px;
    cursor: pointer;

    & + & {
      margin-top: pix2rem($size2);
    }

    &.done {
      background: #00dc82;
      .list__item-content {
        text-decoration: line-through;
      }
    }
  }
  &__item-btn {
    padding: pix2rem($size1);
    font-size: pix2rem($size2);
    border: 1px solid $secondTextColor;
    border-radius: #{$size1}px;
    background: $primaryColor;
    color: $textColor;
    cursor: pointer;
  }
}

.info-text {
  margin-top: pix2rem($size2);
  text-align: center;
  opacity: 0.5;
  font-size: pix2rem($size3);
}

</style>
