export function generateOrderCode() {
    const prefix = 'VLO-';
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    let randomLetters = '';
    let randomNumbers = '';
  
    // Gera 3 letras aleatórias
    for (let i = 0; i < 3; i++) {
      randomLetters += letters.charAt(Math.floor(Math.random() * letters.length));
    }
  
    // Gera 3 números aleatórios
    for (let i = 0; i < 3; i++) {
      randomNumbers += Math.floor(Math.random() * 10);
    }
  
    return `${prefix}${randomLetters}${randomNumbers}`;
  }