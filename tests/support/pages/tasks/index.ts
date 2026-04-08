import { Page, Locator, expect  } from '@playwright/test'
import { TaskModel } from '../../../fixtures/task.model'

export class TasksPage {
    readonly page: Page
    readonly inputTaskName: Locator

    constructor(page: Page) {
        this.page = page
        this.inputTaskName = page.locator('input[class*=InputNewTask]')
    }

    async go() {
        await this.page.goto('/') //Acessa a pagina
    }

    async create(task: TaskModel) {
        await this.inputTaskName.fill(task.name) //Realiza o preenchimento
        await this.page.click('css=button >> text=Create') //Clica no btn
    }

    async toggle(taskName: string) {
        const target = this.page.locator (`xpath=//p[text()="${taskName}"]/..//button[contains(@class, "Toggle")]`) //Constante para localizar elemento
        await target.click () //Clica no btn
    }

    async remove(taskName: string) {
        const target = this.page.locator (`xpath=//p[text()="${taskName}"]/..//button[contains(@class, "Delete")]`) //Constante para localizar elemento
        await target.click () //Clica no btn
    }

    async shouldHaveText(taskName: string) {
        const target = this.page.locator(`css=.task-item p >> text=${taskName}`) //Constante para localizar elemento
        await expect(target).toBeVisible() //Verifica texto preenchido = texto cadastrado        
    }

    async shouldNotExist(taskName: string) {
        const target = this.page.locator(`css=.task-item p >> text=${taskName}`) //Constante para localizar elemento
        await expect(target).not.toBeVisible() //Verifica se o elemento nao esta visivel   
    }

    async alertHaveText(text: string) {
        const target = this.page.locator('.swal2-html-container') //Constante para localizar elemento
        await expect(target).toHaveText(text) //Verifica texto preenchido
    }

    async shouldBeDone(taskName: string) {
        const target = this.page.getByText(taskName) //Busca elemento pelo texto
        await expect(target).toHaveCSS('text-decoration-line', 'line-through') //Verifica se o elemento possui o atributo decoration
    }

}