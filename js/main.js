const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const dataModal = $$("[data-modal]");
const btnClose = $$("#btn-close");
const modalBackdrop = $$(".modal-backdrop");

function Modal() {
  this.openModal = (content) => {
    // create element
    const modalBackdrop = document.createElement("div");
    modalBackdrop.className = "modal-backdrop";
    modalBackdrop.id = "modal-1";

    const modalContainer = document.createElement("div");
    modalContainer.className = "modal-container";

    const modalClose = document.createElement("button");
    modalClose.className = "modal-close";
    modalClose.id = "btn-close";

    const i = document.createElement("i");
    i.className = "fa-solid fa-xmark";
    modalClose.appendChild(i);

    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    modalContent.innerHTML = content;

    // Appent content and element
    modalContainer.append(modalClose, modalContent);
    modalBackdrop.appendChild(modalContainer);
    document.body.appendChild(modalBackdrop);

    // lắng nghe sự kiện click

    setTimeout(() => {
      modalBackdrop.classList.add("show");
    }, 500);

    modalClose.onclick = () => {
      this.closeModal(modalBackdrop);
    };

    modalBackdrop.onclick = (e) => {
      if (e.target === modalBackdrop) {
        this.closeModal(modalBackdrop);
      }
    };

    document.addEventListener("keydown", (e) => {
      if ((e.key === "Escape")) {
        this.closeModal(modalBackdrop);
      }
    });
  };
  
  this.closeModal = (modalBackdrop) => {
    modalBackdrop.classList.remove("show");
    modalBackdrop.ontransitionend = function () {
      modalBackdrop.remove();
    };
  };
}

const modal = new Modal();

const btnModal1 = $("#modal-1");
const btnModal2 = $("#modal-2");
const btnModal3 = $("#modal-3");

btnModal1.onclick = function(){
    modal.openModal("<h1>Manh Thang</h1>");
}


btnModal2.onclick = function(){
    modal.openModal("<h1>Manh Thang</h1>");
}


btnModal3.onclick = function(){
    modal.openModal("<h1>Manh Thang</h1>");
}
