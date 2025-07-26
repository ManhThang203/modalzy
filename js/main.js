const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const dataModal = $$("[data-modal]");
const btnClose = $$("#btn-close");
const modalBackdrop = $$(".modal-backdrop");

let currentModal = null;

dataModal.forEach((btn) => {
    btn.onclick = function(){
        const modal = $(this.dataset.modal);
        if(modal){
            modal.classList.add("show");
        }
        else{
            console.error(`${this.dataset.modal} không tồn tại`);
        }
        currentModal = modal;
    }
})

btnClose.forEach((btn) => {
    btn.onclick = function(){
        const modal = this.closest(".modal-backdrop");
        if(modal){
            modal.classList.remove("show");
        }
        currentModal = null;
    }
})

modalBackdrop.forEach((modal) =>{
    modal.onclick = function(e){
       if(e.target === this){
        modal.classList.remove("show");
       }
        currentModal = null;
    }
})


document.addEventListener("keydown", (e) => {
    if(e.key === "Escape" && currentModal){
        currentModal.classList.remove("show");
        currentModal = null;
    }
})


