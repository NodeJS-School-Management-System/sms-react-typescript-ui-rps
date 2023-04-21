// In your state module file
export let studentList: any = [];

export function setStudentList(newStudentList: string[]): void {
  studentList = newStudentList;
}

// In the TypeScript file where you want to use the studentList variable
// import { studentList, setStudentList } from "./path/to/state/module";

// You can now use the studentList variable in the current file
setStudentList(["Alice", "Bob", "Charlie"]);
console.log(studentList); // Output: ['Alice', 'Bob', 'Charlie']
