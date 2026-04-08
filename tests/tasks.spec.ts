import { test, expect } from '@playwright/test'
import { TaskModel } from './fixtures/task.model'
import { deleteTaskByHelper, postTask } from './support/helpers'
import { TasksPage } from './support/pages/tasks'
import dados from './fixtures/tasks.json'

let tasksPage: TasksPage

test.beforeEach(({ page }) => {
    tasksPage = new TasksPage(page) //instancia a pagina
})

test.describe('Cadastro', () => {
    test('Deve poder cadastrar uma nova tarefa', async ({ request }) => {
        
        /*
        Dado que eu tenho uma nova tarefa
        E que estou na pÃ¡gina de cadastro
        Quando faco o cadastro dessa tarefa
        Entao eu vejo essa tarefa na minha lista
        */

        const task = dados.success as TaskModel

        await deleteTaskByHelper(request, task.name) //chamada da funcao de deletar pelo nome

        await tasksPage.go()
        await tasksPage.create(task)
        await tasksPage.shouldHaveText(task.name)

    })

    test('Nao deve permitir cadastrar tarefa com nome duplicado', async ({ request }) => {

        /*
        Dado que eu tenho uma nova tarefa
        E que estou na pÃ¡gina de cadastro
        E que essa tarefa ja foi cadastrada
        Quando facÌ§o o cadastro dessa tarefa
        Entao eu vejo uma mensagem de erro
        */

        const task = dados.duplicate as TaskModel

        await deleteTaskByHelper(request, task.name) //chamada da funcao de deletar pelo nome
        await postTask(request, task) //chamada da funcao de post para cadastrar tarefa

        await tasksPage.go()
        await tasksPage.create(task)
        await tasksPage.alertHaveText('Task already exists!')

    })

    test('Campo obrigatório', async () => {

        /*
        Dado que eu estou na pÃ¡gina de cadastro
        E que nao preencho o campo de nome
        Quando facÌ§o o cadastro
        Entao eu vejo uma mensagem de erro
        */

        const task = dados.required as TaskModel

        await tasksPage.go()
        await tasksPage.create(task)

        const validationMessage = await tasksPage.inputTaskName.evaluate(e => (e as HTMLInputElement).validationMessage)
        expect(validationMessage).toEqual('This is a required field')

    })
})


test.describe('Atualização', () => {
    test('deve concluir uma tarefa', async ({ request }) => {

    /*
    Dado que eu estou na pÃ¡gina de cadastro
    E existe uma tarefa cadastrada
    Quando marco essa tarefa como concluida
    Entao eu vejo essa tarefa marcada como concluida
    */

    const task = dados.update as TaskModel

    await deleteTaskByHelper(request, task.name)
    await postTask(request, task)

    await tasksPage.go()
    await tasksPage.toggle(task.name)
    await tasksPage.shouldBeDone(task.name)
    })
})

test.describe('Exclusão', () => {
    test('deve excluir uma tarefa', async ({ request }) => {

    /*
    Dado que eu estou na pÃ¡gina de cadastro
    E existe uma tarefa cadastrada
    Quando clico no botao de excluir
    Entao a tarefa deve ser excluida
    */

    const task = dados.delete as TaskModel

    await deleteTaskByHelper(request, task.name)
    await postTask(request, task)

    await tasksPage.go()
    await tasksPage.remove(task.name)
    await tasksPage.shouldNotExist(task.name)
    })
})
