import { test, expect } from '@playwright/test'

import { generateOrderNumber } from '../support/helpers'
import { OrderLockupPage } from '../support/pages/OrderLockupPage'

/// AAA - Arrange, Act, Assert

test.describe('order inquiry', () => {

  test.beforeEach(async ({ page }) => {
    // Arrange
    await page.goto('http://localhost:5173/')
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

    await page.getByRole('link', { name: 'Consultar Pedido' }).click()
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
  })

  test('Must check an approved order', async ({ page }) => {

    const orderNumber = {
      number: 'VLO-SJIN6D',
      status: 'APROVADO',
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'Luiz Neto',
        email: 'luizitow@hotmail.com',
      },
      payment: 'À Vista'
    }

    // Act
    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(orderNumber.number)

    // Assert
    await expect(page.getByTestId(`order-result-${orderNumber.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${orderNumber.number}
      - status:
        - img
        - text: ${orderNumber.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${orderNumber.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${orderNumber.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${orderNumber.customer.name}
      - paragraph: Email
      - paragraph: ${orderNumber.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${orderNumber.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `)

    await orderLockupPage.expectApprovedBadge()
  })

  test('Must check an failed order', async ({ page }) => {

    const orderNumber = {
      number: 'VLO-8B98N2',
      status: 'REPROVADO',
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'Steve Jobs',
        email: 'jobs@apple.com',
      },
      payment: 'À Vista'
    }

    // Act
    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(orderNumber.number)

    // Assert
    await expect(page.getByTestId(`order-result-${orderNumber.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${orderNumber.number}
      - status:
        - img
        - text: ${orderNumber.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${orderNumber.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${orderNumber.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${orderNumber.customer.name}
      - paragraph: Email
      - paragraph: ${orderNumber.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${orderNumber.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `)

    await orderLockupPage.expectFailedBadge()
  })

  test('Must check an in-analysis order', async ({ page }) => {

    const orderNumber = {
      number: 'VLO-I54RBT',
      status: 'EM_ANALISE',
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'João da Silva',
        email: 'joao@velo.dev',
      },
      payment: 'À Vista'
    }

    // Act
    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(orderNumber.number)

    // Assert
    await expect(page.getByTestId(`order-result-${orderNumber.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${orderNumber.number}
      - status:
        - img
        - text: ${orderNumber.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${orderNumber.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${orderNumber.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${orderNumber.customer.name}
      - paragraph: Email
      - paragraph: ${orderNumber.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${orderNumber.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `)

    await orderLockupPage.expectInAnalysisBadge()
  })

  test('A message must be displayed when an order is not found', async ({ page }) => {

    // Test Data
    const order = generateOrderNumber()

    // Act
    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(order)

    // Assert
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - img
      - heading "Pedido não encontrado" [level=3]
      - paragraph: Verifique o número do pedido e tente novamente
      `)
  })
})