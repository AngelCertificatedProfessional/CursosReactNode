import { Request, Response } from "express"
import { prisma } from "../../data/mysql";

interface Todo {
    id: number;
    text: string;
    completedAt: Date | null;
}

const todos: Todo[] = [{
    id: 1,
    text: 'Biy Milk',
    completedAt: new Date()
}, {
    id: 2,
    text: 'Biy Milk2',
    completedAt: new Date()
}, {
    id: 3,
    text: 'Biy Milk3',
    completedAt: new Date()
}]


export class TodosController {
    //* Di
    constructor() {

    }

    public getTodos = (req: Request, res: Response) => {
        res.json(todos)
    }

    public getTodoById = (req: Request, res: Response) => {
        const id = +req.params.id
        if (isNaN(id)) return res.status(400).json({ error: 'Id argument is not a number' })
        const todo = todos.find(todo => todo.id === id);
        (todo)
            ? res.json(todo)
            : res.status(404).json({ error: `Todo with id ${id} not found` })
    }

    public createTodo = async (req: Request, res: Response) => {
        const { text } = req.body;
        if (!text) return res.status(400).json({ error: 'Text property is required' })
        const todo = await prisma.todo.create({
            data: {
                text
            }
        });

        res.json(todo)
    }

    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id
        if (isNaN(id)) return res.status(400).json({ error: 'Id argument is not a number' })
        const todo = todos.find(todo => todo.id === id);
        if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` });
        const { text, completedAt } = req.body;
        if (!text) return res.status(400).json({ error: 'Text property is required' });
        todo.text = text || todo.text;
        (completedAt === 'null') ? todo.completedAt = null : todo.completedAt = new Date(completedAt || todo.completedAt);
        // todos.forEach((todo, index) => {
        //     if (todo.id === id) {
        //         todos[index] = todo;
        //     }
        // })

        //! Ojo Referencia
        res.json(todo)
    }

    public deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id
        const todo = todos.find(todo => todo.id === id)
        if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` });
        todos.splice(todos.indexOf(todo), 1)
        res.json(todo)
    }
}