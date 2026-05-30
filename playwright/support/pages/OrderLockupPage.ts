import { Page, expect } from '@playwright/test'

type OrderStatus = 'APROVADO' | 'REPROVADO' | 'EM_ANALISE'

type StatusClasses = {
    background: string
    text: string
    icon: string
}

const STATUS_CLASSES: Record<OrderStatus, StatusClasses> = {
    APROVADO: {
        background: 'bg-green-100',
        text: 'text-green-700',
        icon: 'lucide-circle-check-big'
    },
    REPROVADO: {
        background: 'bg-red-100',
        text: 'text-red-700',
        icon: 'lucide-circle-x'
    },
    EM_ANALISE: {
        background: 'bg-amber-100',
        text: 'text-amber-700',
        icon: 'lucide-clock'
    }
}

export class OrderLockupPage {
    constructor(private page: Page) { }

    async searchOrder(code: string) {
        await this.page.getByRole('textbox', { name: 'Número do Pedido' }).fill(code)
        await this.page.getByRole('button', { name: 'Buscar Pedido' }).click()
    }

    async validateStatusBadge(status: OrderStatus) {
        const { background, text, icon } = STATUS_CLASSES[status]
        const statusBadge = this.page.getByRole('status').filter({ hasText: status })

        await expect(statusBadge).toHaveClass(new RegExp(background))
        await expect(statusBadge).toHaveClass(new RegExp(text))
        await expect(statusBadge.locator('svg')).toHaveClass(new RegExp(icon))
    }

    async expectApprovedBadge() {
        await this.validateStatusBadge('APROVADO')
    }

    async expectFailedBadge() {
        await this.validateStatusBadge('REPROVADO')
    }

    async expectInAnalysisBadge() {
        await this.validateStatusBadge('EM_ANALISE')
    }
}