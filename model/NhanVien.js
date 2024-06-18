class NhanVien {
  tknv = "";
  name = "";
  email = "";
  password = "";
  datepicker = "";
  luongCB = "";
  chucvu = "";
  gioLam = "";
  tongLuong = () => {
    let heSoLuong = 1;
    switch (this.chucvu) {
      case "giamDoc":
        heSoLuong = 3;
        break;
      case "truongPhong":
        heSoLuong = 2;
        break;
    }
    return parseInt(Number(this.luongCB) * heSoLuong).toLocaleString("it-IT", { style: "currency", currency: "VND" });
  }
  xepLoai = () => {
    let loaiNhanVien = '';
    let gioLam = this.gioLam * 1;
    if ( gioLam >= 192 ) loaiNhanVien = 'Nhân viên xuất sắc';
    else if ( gioLam < 192 && gioLam >= 176 ) loaiNhanVien = "Nhân viên giỏi";
    else if ( gioLam < 176 && gioLam >= 160 ) loaiNhanVien = "Nhân viên khá";
    else if ( gioLam < 160 ) loaiNhanVien = "Nhân viên trung bình";
    return loaiNhanVien;
  }
}