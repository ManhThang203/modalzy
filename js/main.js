const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Lấy ra các nút
const dataModal = $$("[data-modal]");
const btnClose = $$("#btn-close");
// const modalBackdrop = $$(".modal-backdrop");

// hàm sử lý modal
function Modal(option = {}) {
  const {
    templateId,
    destroyOnClose = true,
    cssClass = [],
    onOpen,
    onClose,
    methodModal = ["button", "orvelay", "escape"],
  } = option;

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

    return ScrollballWidth;
  }
  this._buile = () => {
    const content = template.content.cloneNode(true);

    // create element
    this._modalBackdrop = document.createElement("div");
    this._modalBackdrop.className = "modal-backdrop";
    this._modalBackdrop.id = "modal-1";

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
        this.close();
      };
    }
    // tạo thẻ elemnt div content
    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    cssClass.forEach((className) => {
      if (typeof className === "string") {
        modalContainer.classList.add(className);
      }
    });

    modalContent.append(content);

    // Appent content and element
    modalContainer.append(modalContent);
    this._modalBackdrop.appendChild(modalContainer);
    document.body.appendChild(this._modalBackdrop);
  };

  this.open = () => {
    // nếu không có trong Dom
    if (!this._modalBackdrop) {
      this._buile();
    }
    // khi this._modalBackdrop được cho vào Dom thì sau khoản thời gian thì thêm class show vào
    setTimeout(() => {
      this._modalBackdrop.classList.add("show");
    }, 0);

    document.body.classList.add("croll-hidden");
    document.body.style.paddingRight = getScrollballWidth() + "px";
    // nếu có Orvelay thì sử lý logic
    if (this._allowOrvelayClose) {
      this._modalBackdrop.onclick = (e) => {
        if (e.target === this._modalBackdrop) {
          this.close();
        }
      };
    }
    // nếu có Escape thì sử lý logic
    if (this._allowEscapeClose) {
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          this.close();
        }
      });
    }
    this._modalBackdrop.ontransitionend = (e) => {
      if (e.propertyName !== "transform") return;
      if (typeof onOpen === "function") onOpen();
    };

    return this._modalBackdrop;
  };
  // hàm sử lý đóng
  this.close = (destroy = destroyOnClose) => {
    this._modalBackdrop.classList.remove("show");
    // lắng nghe khi hết sự kiện transitionend thì remove ra khỏi Dom
    this._modalBackdrop.ontransitionend = (e) => {
      if (e.propertyName !== "transform") return;
      // nếu this._modalBackdrop khác null / udf và và cho phép hủy thì mới hủy đi
      if (this._backdrop && destroy) {
        this._backdrop.remove();
        this._backdrop = null;
      }

      if (typeof onClose === "function") onClose();
    };
    document.body.classList.remove("croll-hidden");
    document.body.style.paddingRight = "";
  };

  this.destroy = () => {
    this.close(true);
  };
}

const modal1 = new Modal({
  templateId: "modal1",
  destroyOnClose: false,
  onOpen: () => {
    console.log("Mddal 1 opened");
  },
  onClose: () => {
    console.log("Modal 1 close");
  },
});

const btnModal1 = $("#modal-1");
const btnModal2 = $("#modal-2");

btnModal1.onclick = function () {
  modal1.open();
};

const modal2 = new Modal({
  templateId: "modal2",
  methodModal: ["button", "escape"],
  footer: true,
  cssClass: ["class1", "class2", "classN"],
  onOpen: () => {
    console.log("Mddal 2 opened");
  },
  onClose: () => {
    console.log("Modal 2 close");
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
