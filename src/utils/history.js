export function saveHistory(record){
    const existing = JSON.parse(localStorage.getItem("history")||"[]");
    existing.push(record);
    localStorage.setItem("history",JSON.stringify(existing));
}

export function loadHistory(){
    return JSON.parse(localStorage.getItem("history")|| "[]");
}