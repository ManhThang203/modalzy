const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const dataModal = $$("[data-modal]");
const btnClose = $$("#btn-close");
const modalBackdrop = $$(".modal-backdrop");


function Modal() {
  // hàm sử lý lấy ra kích thước cảu thanh cuộn
  // kĩ thuậy Cache
  function getScrollballWidth() {
    if (getScrollballWidth.value) {
      console.log("Giá trị thanh cuộn đã được lưu vào bộ nhớ");
      return getScrollballWidth.value;
    }

    const div = document.createElement("div");
    div.style.overflow = "scroll";
    Object.assign(div.style, {
      overflow: "scroll",
      position: "absolute",
      top: "-9999px",
    });
    document.body.appendChild(div);
    const ScrollballWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);

    getScrollballWidth.value = ScrollballWidth;

    console.log(`Tinhs toán kích thước của thanh cuộn: ${ScrollballWidth}`);
    return ScrollballWidth;
  }
  this.openModal = (option = {}) => {
    const { templateId, modalElement = true } = option;
    const template = $(`#${templateId}`);

    if (!template) {
      console.error(`${templateId} không tồn tại`);
      return;
    }
    const content = template.content.cloneNode(true);

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

    modalContent.append(content);

    // Appent content and element
    modalContainer.append(modalClose, modalContent);
    modalBackdrop.appendChild(modalContainer);
    document.body.appendChild(modalBackdrop);

    // lắng nghe sự kiện click

    setTimeout(() => {
      modalBackdrop.classList.add("show");
    }, 0);

    document.body.classList.add("croll-hidden");
    document.body.style.paddingRight = getScrollballWidth() + "px";

    modalClose.onclick = () => {
      this.closeModal(modalBackdrop);
    };

    modalBackdrop.onclick = (e) => {
      if (modalElement) {
        if (e.target === modalBackdrop) {
          this.closeModal(modalBackdrop);
        }
      }
    };

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeModal(modalBackdrop);
      }
    });
    return modalBackdrop;
  };

  this.closeModal = (modalBackdrop) => {
    modalBackdrop.classList.remove("show");
    modalBackdrop.ontransitionend = function () {
      modalBackdrop.remove();
    };
    document.body.classList.remove("croll-hidden");
    document.body.style.paddingRight = "";
  };
}

const modal1 = new Modal({
    templateId: "modal1"
});

const btnModal1 = $("#modal-1");
const btnModal2 = $("#modal-2");


btnModal1.onclick = function () {
  modal1.opend();

  // modal1.close();
};


const modal2 = new Modal({
    templateId: "modal2",
    // closeMethods: ['button','overlay','escape'],
    // hiển thị footer của modal
    footer: true,
    cssClass: ['class1','class2','classN'],
    onOpen: () => {
        console.log("Mddal opened")
    },
    onclose: () => {
        console.log("Modal close")
    }
});

//  modal2.opend()
//  modal2.close()
// modal2.setFooterContent('HTML string')
// modal2.addFooterContent('Canncel', 'class-1 class-2', (e) => {})
// modal2.addFooterContent('Agree', 'class-3 class-4', (e) => {})
// mdoal2.destroy();

btnModal2.onclick = function () {
  const modalBackdrop = modal2.opend();

  // modal2.close();

  const form = modalBackdrop.querySelector("#login-form");
  if (form) {
    form.onsubmit = function (e) {
      e.preventDefault();
      const formData = {
        email: $("#email").value.trim(),
        passwork: $("#passwork").value.trim(),
      };
      console.log(formData);
    };
  }
};
