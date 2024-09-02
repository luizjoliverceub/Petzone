export function generateId() {
    
    const randomNumber = Math.floor(Math.random() * 100000000);
    
    
    const id = randomNumber.toString().padStart(8, '0');
    
    return id;
}