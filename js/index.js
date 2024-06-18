let arrStaffs = [];
let modal = document.getElementById("myModal");
function getDataLocalStorage() {
  let datas = localStorage.getItem("staffs");
  if (datas) {
    let convertDatas = JSON.parse(datas);
    arrStaffs = convertDatas;
    renderData();
  } else {
    localStorage.setItem("staffs","[]");
  }
}
getDataLocalStorage();

// get data form
function getDataForm() {
  let flag = true;
  let datas = document.querySelectorAll("#myModal form input, #myModal form select");
  let objStaffs = new NhanVien();
  for (let data of datas) {
    let { id, value } = data;
    objStaffs[id] = value;
    let validationName = data.getAttribute("data-validation");
    let errNotice = data.parentElement.parentElement.querySelector(".sp-thongbao");
    let isValidNoEmpty = checkNoEmpty(value, errNotice);
    flag &= isValidNoEmpty;

    if (!isValidNoEmpty) continue;

    if (validationName == "taikhoan") {
      let isValidTaiKhoan = checkTaiKhoan(value, errNotice);
      flag &= isValidTaiKhoan;
    }

    if (validationName == "ten") {
      let isValidTen = checkTenNhanVien(value, errNotice);
      flag &= isValidTen;
    }

    if (validationName == "email") {
      let isValidEmail = checkEmail(value, errNotice);
      flag &= isValidEmail;
    }

    if (validationName == "matkhau") {
      let isValidMatKhau = checkPassword(value, errNotice);
      flag &= isValidMatKhau;
    }

    if (validationName == "luongcb") {
      let isValidNumber = checkNumber(value, errNotice);
      if (!isValidNumber) continue;
      let isValidLuongCb = checkLuongCb(value, errNotice);
      flag &= isValidLuongCb;
    }

    if (validationName == "giolam") {
      let isValidNumber = checkNumber(value, errNotice);
      if (!isValidNumber) continue;
      let isValidGioLam = checkGioLam(value, errNotice);
      flag &= isValidGioLam;
    }
  }
  if (flag) return objStaffs;
}

// convert chuc vu
function convertPosition(chucVu) {
  switch (chucVu) {
    case "giamDoc":
      return "Sếp";
    case "truongPhong":
      return "Trưởng phòng";
    case "nhanVien":
      return "Nhân viên";
  }
}

// render data
function renderData(arr = arrStaffs) {
  if (arr.length > 0) {
    let content = "";
    if (arr) {
      for (let staff of arr) {
        let { tknv, name, email, datepicker, luongCB, chucvu, gioLam } = staff;
        let objStaffs = new NhanVien();
        Object.assign(objStaffs, staff);
        content += `
              <tr>
              <td>${tknv}</td>
              <td>${name}</td>
              <td>${email}</td>
              <td>${datepicker}</td>
              <td>${convertPosition(chucvu)}</td>
              <td>${objStaffs.tongLuong()}</td>
              <td>${objStaffs.xepLoai()}</td>
              <td><button class="btn btn-danger" onclick="deleteNhanVien('${tknv}')">Xoá</button><button class="btn btn-warning" data-toggle="modal" data-target="#myModal" onclick="editNhanVien('${tknv}')">Sửa</button></td>
              </tr>
              `;
      }
    }
    document.getElementById("tableDanhSach").innerHTML = content;
  } else {
    document.getElementById("tableDanhSach").innerHTML = `
    <tr>
    <td colspan="8" class="text-danger">Chưa có nhân viên nào được thêm vào</td>
    </tr>
    `;
  }
}

// add data
function addData(datas = arrStaffs) {
  localStorage.setItem("staffs", JSON.stringify(datas));
}

/************ CONTROLLER - handleCLICK *****************/

document.getElementById("btnThemNV").onclick = () => {
  let staff = getDataForm();
  if (!staff) return;

  let elError = document.getElementById("tknv").parentElement.parentElement.querySelector(".sp-thongbao");

  if (arrStaffs.findIndex((item) => item.tknv == staff.tknv) === -1) {
    arrStaffs.push(staff);
    renderData();
    addData();
    document.getElementById("formStaff").reset();
    elError.innerHTML = "";
    elError.style.display = "none";
    return true;
  } else {
    elError.innerHTML = "Tài khoản nhân viên đã tồn tại";
    elError.style.display = "block";
    return false;
  }
};

const deleteNhanVien = (tknv) => {
  let staff = arrStaffs.findIndex((item, index) => item.tknv === tknv);
  arrStaffs.splice(staff, 1);
  addData();
  renderData();
};

const editNhanVien = (tknv) => {
  let staff = arrStaffs.filter((item, index) => item.tknv === tknv);
  let datas = document.querySelectorAll("#myModal form input, #myModal form select");
  for (let data of datas) {
    let { id } = data;
    data.value = staff[0][id];
  }
  document.getElementById("header-title").innerHTML = "Thông Tin Nhân Viên";
  document.getElementById("tknv").setAttribute("disabled", "disabled");
  document.getElementById("btnThemNV").setAttribute("disabled", "disabled");
  document.getElementById("btnCapNhat").removeAttribute("disabled", "disabled");
};

document.getElementById("btnThem").onclick = () => {
  document.getElementById("header-title").innerHTML = "Thêm Nhân Viên";
  document.getElementById("formStaff").reset();
  document.getElementById("tknv").removeAttribute("disabled");
  document.getElementById("btnThemNV").removeAttribute("disabled");
  document.getElementById("btnCapNhat").setAttribute("disabled", "disabled");
  document.querySelector("#formStaff .form-group .sp-thongbao").innerHTML = "";
  document.querySelector("#formStaff .form-group .sp-thongbao").style.display = 'none';
};

document.getElementById("btnCapNhat").onclick = () => {
  let datas = getDataForm();
  if (datas) {
    let staffUpdate = arrStaffs.findIndex((item) => item.tknv === datas.tknv);
    arrStaffs[staffUpdate] = datas;
    renderData();
    addData();
  }
};

document.getElementById("btnTimNV").onclick = () => {
  let keysearch = removeVietnameseTones(document.getElementById("searchName").value);
  let arr = [];
  for (let staff of arrStaffs) {
    let objStaff = new NhanVien();
    Object.assign(objStaff, staff);
    staff["xepLoaiNhanVien"] = objStaff.xepLoai();
    arr.push(staff);
  }
  let result = arr.filter((item, index) => removeVietnameseTones(item["xepLoaiNhanVien"]).includes(keysearch));
  if (result.length > 0) {
    renderData(result);
  } else {
    document.getElementById("tableDanhSach").innerHTML = `<tr>
    <td colspan="8" class="text-danger">Không tìm thấy nhân viên</td>
    </tr>`;
  }
};
