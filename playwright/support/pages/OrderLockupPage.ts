import { Page, Locator, expect } from "@playwright/test"

type OrderStatus = 'APROVADO' | 'REPROVADO' | 'EM_ANALISE'

const STATUS_CONFIG = {
  APROVADO:  { color: 'green',  icon: 'lucide-circle-check-big' },
  REPROVADO: { color: 'red',    icon: 'lucide-circle-x'         },
  EM_ANALISE:{ color: 'amber',  icon: 'lucide-clock'            },
} satisfies Record<OrderStatus, { color: string; icon: string }>

export class OrderLockupPage {
  constructor(private page: Page) {}

  async searchOrder(code: string) {
    await this.page.getByRole('textbox', { name: 'Número do Pedido' }).fill(code)
    await this.page.getByRole('button', { name: 'Buscar Pedido' }).click()
  }

  getStatusBadge(status: OrderStatus): Locator {
    return this.page.getByRole('status').filter({ hasText: status })
  }

  async expectStatusBadge(status: OrderStatus): Promise<void> {
    const { color, icon } = STATUS_CONFIG[status]
    const badge = this.getStatusBadge(status)

    await expect(badge).toHaveClass(new RegExp(`bg-${color}-100`))
    await expect(badge).toHaveClass(new RegExp(`text-${color}-700`))
    await expect(badge.locator('svg')).toHaveClass(new RegExp(icon))
  }

  async expectApprovedBadge(): Promise<void> {
    await this.expectStatusBadge('APROVADO')
  }

  async expectFailedBadge(): Promise<void> {
    await this.expectStatusBadge('REPROVADO')
  }

  async expectInAnalysisBadge(): Promise<void> {
    await this.expectStatusBadge('EM_ANALISE')
  }
}