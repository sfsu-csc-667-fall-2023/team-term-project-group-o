var reset_btn1 = document.querySelector("#reset_btn1")
var reset_panel1 = document.querySelector("#reset_panel1")
var back_btn1 = document.querySelector("#back_btn1")

reset_btn1.onclick = ()=>{
  reset_panel1.classList.toggle("d-none")
}
back_btn1.onclick = ()=>{
  reset_panel1.classList.toggle("d-none")
}
