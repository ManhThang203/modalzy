const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Lấy ra các nút
const dataModal = $$("[data-modal]");
const btnClose = $$("#btn-close");
// const modalBackdrop = $$(".modal-backdrop");

// hàm sử lý modal
function Modal(option = {}) {
  const { templateId, methodModal = ["button", "orvelay", "escape"] } = option;
  const template = $(`#${templateId}`);

  if (!template) {
    console.error(`${templateId} không tồn tại`);
    return;
  }
  // kiểm tra xem có các nút phù hợp hay không và nếu có thì là true / false
  this._allowButtonClose = methodModal.includes("button");
  this._allowOrvelayClose = methodModal.includes("orvelay");
  this._allowEscapeClose = methodModal.includes("escape");

  // hàm sử lý lấy ra kích thước cảu thanh cuộn
  // kĩ thuậy Cache
  function getScrollballWidth() {
    // do modalBackdrop cũng là 1 object lên cũng có thể chấm value để gán gia trị
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
  this.open = () => {
    const content = template.content.cloneNode(true);

    // create element
    const modalBackdrop = document.createElement("div");
    modalBackdrop.className = "modal-backdrop";
    modalBackdrop.id = "modal-1";

    const modalContainer = document.createElement("div");
    modalContainer.className = "modal-container";
    if (this._allowButtonClose) {
      // tạo element button
      const modalClose = document.createElement("button");
      modalClose.className = "modal-close";
      modalClose.id = "btn-close";
      // tạo element i
      const i = document.createElement("i");
      i.className = "fa-solid fa-xmark";
      modalClose.appendChild(i);
      modalContainer.append(modalClose);

      // hàm sử lý xóa
      modalClose.onclick = () => {
        this.close(modalBackdrop);
      };
    }
    // tạo thẻ elemnt div content
    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    modalContent.append(content);

    // Appent content and element
    modalContainer.append(modalContent);
    modalBackdrop.appendChild(modalContainer);
    document.body.appendChild(modalBackdrop);

    // khi modalBackdrop được cho vào Dom thì sau khoản thời gian thì thêm class show vào
    setTimeout(() => {
      modalBackdrop.classList.add("show");
    }, 0);

    document.body.classList.add("croll-hidden");
    document.body.style.paddingRight = getScrollballWidth() + "px";
    // nếu có Orvelay thì sử lý logic
    if (this._allowOrvelayClose) {
      modalBackdrop.onclick = (e) => {
        if (e.target === modalBackdrop) {
          this.close(modalBackdrop);
        }
      };
    }
    // nếu có Escape thì sử lý logic
    if (this._allowEscapeClose) {
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          this.close(modalBackdrop);
        }
      });
    }
    return modalBackdrop;
  };
  // hàm sử lý đóng 
  this.close = (modalBackdrop) => {
    modalBackdrop.classList.remove("show");
    // lắng nghe khi hết sự kiện transitionend thì remove ra khỏi Dom
    modalBackdrop.ontransitionend = function () {
      modalBackdrop.remove();
    };
    document.body.classList.remove("croll-hidden");
    document.body.style.paddingRight = "";
  };
}

const modal1 = new Modal({
  templateId: "modal1",
});

const btnModal1 = $("#modal-1");
const btnModal2 = $("#modal-2");

btnModal1.onclick = function () {
  modal1.open();

  // modal1.close();
};

const modal2 = new Modal({
  templateId: "modal2",
  methodModal: ["button", "escape"],
  // closeMethods: ['button','overlay','escape'],
  // hiển thị footer của modal
  footer: true,
  cssClass: ["class1", "class2", "classN"],
  onOpen: () => {
    console.log("Mddal opened");
  },
  onclose: () => {
    console.log("Modal close");
  },
});

//  modal2.opend()
//  modal2.close()
// modal2.setFooterContent('HTML string')
// modal2.addFooterContent('Canncel', 'class-1 class-2', (e) => {})
// modal2.addFooterContent('Agree', 'class-3 class-4', (e) => {})
// mdoal2.destroy();

btnModal2.onclick = function () {
  const modalBackdrop = modal2.open();

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
