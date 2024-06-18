function checkNoEmpty(val,err) {
  if (val == "") {
    err.innerHTML = "Vui lòng nhập";
    err.style.display = 'block';
    return false;
  } else {
    err.innerHTML = "";
    err.style.display = "none";
    return true;
  }
}

function checkTaiKhoan(val,err) {
    let regex = /^\d{4,6}$/;
    if (regex.test(val)) {
      err.innerHTML = "";
      err.style.display = "none";
      return true;
    } else {
      err.innerHTML = "Vui lòng nhập 4 - 6 ký tự là số";
      err.style.display = "block";
      return false;
    }
}

function checkTenNhanVien(val,err) {
    let regex = /^[A-Za-zÀ-ỹ\s]+$/;
    if (regex.test(val)) {
      err.innerHTML = "";
      err.style.display = "none";
      return true;
    } else {
      err.innerHTML = "Vui lòng nhập ký tự là CHỮ";
      err.style.display = "block";
      return false;
    }
}

function checkEmail(val, err) {
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regex.test(val)) {
      err.innerHTML = "";
      err.style.display = "none";
      return true;
    } else {
      err.innerHTML = "Vui lòng nhập đúng định dạng Email";
      err.style.display = "block";
      return false;
    }
}

function checkPassword(val, err) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,10}$/;
  if (passwordRegex.test(val)) {
    err.innerHTML = "";
    err.style.display = "none";
    return true;
  } else {
    err.innerHTML = "Mật khẩu từ 6 - 10 ký tự chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt";
    err.style.display = "block";
    return false;
  }
}

function checkNumber(val, err) {
  const numberRegex = /^\d+$/;
  if (numberRegex.test(val)) {
    err.innerHTML = "";
    err.style.display = "none";
    return true;
  } else {
    err.innerHTML = "Vui lòng nhập định dạng Number";
    err.style.display = "block";
    return false;
  }
}

function checkLuongCb(val, err) {
  let value = Number(val);
  if( value >= 1000000 && value <= 20000000  ) {
    err.innerHTML = "";
    err.style.display = "none";
    return true;
  } else {
    err.innerHTML = "Vui lòng nhập số >= 1000000 và <= 20000000";
    err.style.display = "block";
    return false;
  }
}

function checkGioLam(val, err) {
  let value = Number(val);
  if (value >= 80 && value <= 200) {
    err.innerHTML = "";
    err.style.display = "none";
    return true;
  } else {
    err.innerHTML = "Vui lòng nhập số giờ làm >= 80 và <= 200";
    err.style.display = "block";
    return false;
  }
}