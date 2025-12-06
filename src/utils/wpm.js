export function calculateWPM(charCount, elapsedTime) {
    if(elapsedTime === 0 ) return 0;
    
    return Math.round((charCount /5)/ (elapsedTime/60));
}