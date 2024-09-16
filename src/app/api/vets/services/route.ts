import { NextResponse } from "next/server"

const data = [
    { 'service': 'Consultas de rotina e preventivas' },
    { 'service': 'Vacinação' },
    { 'service': 'Controle de parasitas' },
    { 'service': 'Exames laboratoriais' },
    { 'service': 'Cirurgias gerais' },
    { 'service': 'Cirurgias ortopédicas' },
    { 'service': 'Atendimento emergencial' },
    { 'service': 'Castração' },
    { 'service': 'Exames de imagem (raio-X, ultrassom)' },
    { 'service': 'Odontologia veterinária' },
    { 'service': 'Nutrição e dietas personalizadas' },
    { 'service': 'Atendimento domiciliar' },
    { 'service': 'Internação e cuidados intensivos' },
    { 'service': 'Terapia comportamental' },
    { 'service': 'Fisioterapia e reabilitação' },
    { 'service': 'Dermatologia veterinária' },
    { 'service': 'Oftalmologia veterinária' },
    { 'service': 'Cardiologia veterinária' },
    { 'service': 'Endocrinologia veterinária' },
    { 'service': 'Oncologia veterinária' },
    { 'service': 'Acupuntura e medicina alternativa' },
    { 'service': 'Microchipagem' },
    { 'service': 'Emissão de atestados e laudos' },
    { 'service': 'Atendimento a animais silvestres' },
    { 'service': 'Acompanhamento geriátrico' }
];


export async function GET(request: Request) {
    try {
        return new NextResponse(JSON.stringify(data), { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 })
    }
}