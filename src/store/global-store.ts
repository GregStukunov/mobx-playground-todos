import { makeAutoObservable } from "mobx";

export type ToDo = {
  text: string;
  isDone: boolean;
};

class ToDoStore {
  arrOfToDo: Array<ToDo> = [{ text: "something to do", isDone: false }];
  isFiltered: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  defineIsDone(todo: ToDo) {
    todo.isDone = !todo.isDone;
  }

  add(todoName: string) {
    if (todoName !== "") {
      this.arrOfToDo.push({ text: todoName, isDone: false });
    }
  }
  remove(todoIdx: number) {
    this.arrOfToDo.splice(todoIdx, 1);
  }

  filter(val: boolean) {
    this.isFiltered = val;
  }
}

export const toDoStore = new ToDoStore();
