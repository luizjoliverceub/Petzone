'use server'

type User = {
    id: string
    role: string
    email: string
    name: string
}

export async function getUser(email: string | null | undefined) {
    try {
        const response = await fetch('http://localhost:3000/api/user/getUser')

        if (!response.ok) {
            throw new Error('Network response was not ok')
        }

        const data: User[] = await response.json()

        const user = data.find(user => user.email === email)
        
        return user
    } catch (error) {
        console.error('Error fetching user:', error)
        return undefined
    }
}