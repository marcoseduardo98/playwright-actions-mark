import { expect, APIRequestContext } from "@playwright/test"
import { TaskModel } from "../fixtures/task.model"

const BASE_API = process.env.BASE_API

/* 
Deletar tarefa pelo nome usando API helper 
*/
export async function deleteTaskByHelper(request: APIRequestContext, taskName: string) {
    await request.delete(`${BASE_API}/helper/tasks/${taskName}`)
}

/* 
Realiza um request para cadastrar uma nova tarefa
 * Realiza um request POST para a API
 * Verifica se o request anterior foi executado com sucesso (Espera um status da familia 200)
*/
export async function postTask(request: APIRequestContext, task: TaskModel) {
    const newTask = await request.post(`${BASE_API}/tasks`, { data: task }) //Request chamando API para cadastrar
    expect(newTask.ok()).toBeTruthy() //Verifica se o request anterior foi executado (Espera um status da familia 200)
}
