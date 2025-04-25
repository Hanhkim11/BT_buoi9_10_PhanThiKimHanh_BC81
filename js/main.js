const danhSachNhanVien = new NhanVienList();
console.log(danhSachNhanVien.nVarr);

const hienThiTable = () => {
  let tbody = document.querySelector("#tableDanhSach");
  let contentTable = "";

  danhSachNhanVien.nVarr.map((nhanVien, index) => {
    console.log(nhanVien);
    let trNhanVien = `
<tr>
    <td>${nhanVien.taiKhoan}</td>
    <td>${nhanVien.hoTen}</td>
    <td>ngueynvanA@gmail.com</td>
    <td>A12345</td>
    <td>25/3/2025</td>
    <td>10000</td>
    <td>quanly</td>
    <td>
        <div class="btn btn-primary">Xem</div>
        <div class="btn btn-info">Sua</div>
        <div class="btn btn-danger">Xoa</div>
    </td>
</tr>
`;
    contentTable += trNhanVien;
  });

  console.log(contentTable);
  tbody.innerHTML = contentTable;
};
hienThiTable();
