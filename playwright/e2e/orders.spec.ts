import { test, expect } from '@playwright/test'

/// AAA - Arrange, Act, Assert

test('Must check an approved order', async ({ page }) => {
  //Arrange
  await page.goto('http://localhost:5173/')
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

  //Act
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill('VLO-SJIN6D')
  await page.getByRole('button', { name: 'Buscar Pedido' }).click()

  //Assert
  await expect(page.getByText('VLO-SJIN6D')).toBeVisible({timeout: 10_000})
  await expect(page.getByText('APROVADO')).toBeVisible()


  //await expect(page.getByTestId('order-result-id')).toBeVisible({timeout: 10_000})
  //await expect(page.getByTestId('order-result-id')).toContainText('VLO-SJIN6D')
  //await expect(page.getByTestId('order-result-status')).toBeVisible()
  //await expect(page.getByTestId('order-result-status')).toContainText('APROVADO')

})