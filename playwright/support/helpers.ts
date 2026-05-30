export function generateOrderNumber(): string {
    const prefix: string = 'VLO';
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  
    let randomPart: string = '';
  
    for (let i = 0; i < 6; i++) {
      const randomIndex: number = Math.floor(Math.random() * characters.length);
      randomPart += characters[randomIndex];
    }
  
    return `${prefix}-${randomPart}`;
  }
