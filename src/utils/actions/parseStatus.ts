export function parseStatus(status: string | undefined) {
    if (status === 'pending') {
        return 'Pendente'
    }

    if (status === 'confirmed') {
        return 'Confirmado'
    }

    if (status === 'denied') {
        return 'Recusado'
    }

    if (status === 'canceled') {
        return 'Cancelado'
    }

    if (status === 'finished') {
        return 'Finalizado'
    }

    return 'Sem status'
}

export function statusColor(status: string | undefined) {
    if (status === 'pending') {
        return 'yellow-300'
    }

    if (status === 'confirmed') {
        return 'green-400'
    }

    if (status === 'denied') {
        return 'orange-400'
    }

    if (status === 'canceled') {
        return 'red-500'
    }

    if (status === 'finished') {
        return 'blue-400'
    }

    return 'stone-400'
}