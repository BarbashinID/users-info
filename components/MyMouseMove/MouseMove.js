export default class MouseMove{
    static async handleStart(e, row, col, setDrag)  {
        let iniMouse = e.clientX;
        let iniSize  = document.getElementById(`${row}${col}`).offsetWidth;
        setDrag({
            iniMouse: iniMouse,
            iniSize:  iniSize
        })}
    static async handleMove (e, row, col, drag) {
        if(e.clientX){
            let iniMouse = drag.iniMouse;
            let iniSize  = drag.iniSize;
            let endMouse = e.clientX;
            let endSize = iniSize + (endMouse - iniMouse);
            document.getElementById(`${row}${col}`).style.width = `${endSize}px`;
        }}
}