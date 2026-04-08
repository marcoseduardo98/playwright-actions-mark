import { test, expect } from '@playwright/test'

test('Webapp deve estar online', async ({ page }) => {
    await page.goto('http://localhost:8080')  //Acessa a URL para iniciar o teste, await aguarda a finalizacao de cada step
    await expect(page).toHaveTitle('Gerencie suas tarefas com Mark L') //Verifica que a pg abriu de acordo com a titulo
})