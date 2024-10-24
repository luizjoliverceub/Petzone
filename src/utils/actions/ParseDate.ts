import dayjs from 'dayjs'

export function parseDate(date: Date | undefined) {
    return dayjs(date).format('DD/MM/YYYY')
}

export function parseDate2(date: Date | undefined) {
    return dayjs(date).format('YYYY-MM-DD')
}

export function parseHour(date: Date | undefined) {
    return dayjs(date).format('HH:mm')
}

export function tempDate(dataAlvo: Date | undefined) {
    const agora = dayjs();
    const diferenca = dayjs(dataAlvo).diff(agora); 

    if (diferenca <= 0) {
        return 'Encerrado';
    }

    const dias = dayjs(dataAlvo).diff(agora, 'day');
    if (dias > 0) {
        return `Faltam ${dias} dias`;
    }

    const horas = dayjs(dataAlvo).diff(agora, 'hour');
    if (horas > 0 && horas > 1) {
        return `Faltam ${horas} horas`;
    }

    const hora = dayjs(dataAlvo).diff(agora, 'hour');
    if (hora > 0 || hora <= 1) {
        return `Encerra às ${parseHour(dataAlvo)}`;
    }

    // const minutos = dayjs(dataAlvo).diff(agora, 'minute');
    // if (minutos > 0) {
    //     return `Faltam ${minutos} minutos`;
    // }

    // const segundos = dayjs(dataAlvo).diff(agora, 'second');
    // if (segundos > 0) {
    //     return `Faltam ${segundos} segundos`;
    // }
}