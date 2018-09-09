export class Todo {
  id?: string;
  title: string;
  description: string;
  deadline: Date|number;
  status: string;
  images?: string[]
}