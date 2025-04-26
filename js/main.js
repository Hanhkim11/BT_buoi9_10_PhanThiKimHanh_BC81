class NhanVien {
  constructor(
    taiKhoan,
    hoTen,
    email,
    matKhau,
    ngayLam,
    luongCoBan,
    chucVu,
    gioLam
  ) {
    this.taiKhoan = taiKhoan;
    this.hoTen = hoTen;
    this.email = email;
    this.matKhau = matKhau;
    this.ngayLam = ngayLam;
    this.luongCoBan = luongCoBan;
    this.chucVu = chucVu;
    this.gioLam = gioLam;
    this.tongLuong = 0;
    this.loaiNhanVien = "";
  }

  tinhTongLuong() {
    if (this.chucVu === "Giám đốc") {
      this.tongLuong = this.luongCoBan * 3;
    } else if (this.chucVu === "Trưởng phòng") {
      this.tongLuong = this.luongCoBan * 2;
    } else {
      this.tongLuong = this.luongCoBan;
    }
  }

  xepLoaiNhanVien() {
    if (this.gioLam >= 192) {
      this.loaiNhanVien = "Xuất sắc";
    } else if (this.gioLam >= 176) {
      this.loaiNhanVien = "Giỏi";
    } else if (this.gioLam >= 160) {
      this.loaiNhanVien = "Khá";
    } else {
      this.loaiNhanVien = "Trung bình";
    }
  }
}

let danhSachNhanVien = [];

const themNhanVien = () => {
  const nhanVien = layThongTinNhanVienTuForm();
  if (nhanVien) {
    danhSachNhanVien.push(nhanVien);
    hienThiDanhSachNhanVien(danhSachNhanVien);
    resetForm();
  }
};

const capNhatNhanVien = () => {
  const nhanVien = layThongTinNhanVienTuForm();
  if (nhanVien) {
    danhSachNhanVien = danhSachNhanVien.map((nv) =>
      nv.taiKhoan === nhanVien.taiKhoan ? nhanVien : nv
    );
    hienThiDanhSachNhanVien(danhSachNhanVien);
    resetForm();
  }
};

const xoaNhanVien = (taiKhoan) => {
  danhSachNhanVien = danhSachNhanVien.filter((nv) => nv.taiKhoan !== taiKhoan);
  hienThiDanhSachNhanVien(danhSachNhanVien);
};

const timKiemNhanVien = () => {
  const tuKhoa = document.getElementById("timLoai").value.trim().toLowerCase();
  const ketQua = danhSachNhanVien.filter((nv) =>
    nv.loaiNhanVien.toLowerCase().includes(tuKhoa)
  );
  hienThiDanhSachNhanVien(ketQua);
};

const hienThiDanhSachNhanVien = (danhSach) => {
  const tbody = document.getElementById("tableDanhSach");
  let content = "";

  danhSach.forEach((nv) => {
    content += `
            <tr>
                <td>${nv.taiKhoan}</td>
                <td>${nv.hoTen}</td>
                <td>${nv.email}</td>
                <td>${nv.ngayLam}</td>
                <td>${nv.chucVu}</td>
                <td>${nv.tongLuong.toLocaleString()}</td>
                <td>${nv.loaiNhanVien}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaNhanVien('${
                      nv.taiKhoan
                    }')">Xóa</button>
                </td>
            </tr>
        `;
  });

  tbody.innerHTML = content;
};

const layThongTinNhanVienTuForm = () => {
  const taiKhoan = document.getElementById("taiKhoan").value.trim();
  const hoTen = document.getElementById("hoTen").value.trim();
  const email = document.getElementById("email").value.trim();
  const matKhau = document.getElementById("matKhau").value.trim();
  const ngayLam = document.getElementById("ngayLam").value.trim();
  const luongCoBan = Number(document.getElementById("luongCoBan").value.trim());
  const chucVu = document.getElementById("chucVu").value.trim();
  const gioLam = Number(document.getElementById("gioLam").value.trim());

  if (
    !kiemTraThongTin(
      taiKhoan,
      hoTen,
      email,
      matKhau,
      ngayLam,
      luongCoBan,
      chucVu,
      gioLam
    )
  ) {
    return null;
  }

  const nhanVien = new NhanVien(
    taiKhoan,
    hoTen,
    email,
    matKhau,
    ngayLam,
    luongCoBan,
    chucVu,
    gioLam
  );
  nhanVien.tinhTongLuong();
  nhanVien.xepLoaiNhanVien();
  return nhanVien;
};

const resetForm = () => {
  document.getElementById("formNhanVien").reset();
};

const kiemTraThongTin = (
  taiKhoan,
  hoTen,
  email,
  matKhau,
  ngayLam,
  luongCoBan,
  chucVu,
  gioLam
) => {
  let hopLe = true;

  const regexTaiKhoan = /^[0-9]{4,6}$/;
  if (!regexTaiKhoan.test(taiKhoan)) {
    alert("Tài khoản phải từ 4 đến 6 chữ số.");
    hopLe = false;
  }

  const regexHoTen = /^[a-zA-ZÀ-ỹ\s]+$/;
  if (!regexHoTen.test(hoTen)) {
    alert("Họ tên phải là chữ.");
    hopLe = false;
  }

  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!regexEmail.test(email)) {
    alert("Email không đúng định dạng.");
    hopLe = false;
  }

  const regexMatKhau = /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{6,10}$/;
  if (!regexMatKhau.test(matKhau)) {
    alert(
      "Mật khẩu phải 6-10 ký tự, có ít nhất 1 số, 1 ký tự in hoa và 1 ký tự đặc biệt."
    );
    hopLe = false;
  }

  if (ngayLam === "") {
    alert("Ngày làm không được để trống.");
    hopLe = false;
  }

  if (luongCoBan < 1000000 || luongCoBan > 20000000) {
    alert("Lương cơ bản phải từ 1 triệu đến 20 triệu.");
    hopLe = false;
  }

  if (
    chucVu !== "Giám đốc" &&
    chucVu !== "Trưởng phòng" &&
    chucVu !== "Nhân viên"
  ) {
    alert("Chức vụ không hợp lệ.");
    hopLe = false;
  }

  if (gioLam < 80 || gioLam > 200) {
    alert("Giờ làm phải từ 80 đến 200 giờ.");
    hopLe = false;
  }

  return hopLe;
};
