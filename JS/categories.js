let accounts = JSON.parse(localStorage.getItem("listAccount")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser"));

const saveDataForUser =(data)=>{
    localStorage.setItem("data_"+ currentUser.id , JSON.stringify(data));
};

const getDataByUser = () => {
    let data = localStorage.getItem("data_" + currentUser.id);
    if (!data || data === "undefined") return [];
    return JSON.parse(data);
};


let inputNew = document.getElementById("inputNewCategory");
let inputNewDescription = document.getElementById("inputDescripton");
let btn_Add = document.getElementById("btn_save");
let errorAdd_v1 = document.getElementById("errorNewCate");
let errorAdd_v2 = document.getElementById("errorDes");


// logout
let btnLogout = document.getElementById("btn_logout");
btnLogout.addEventListener("click", () => {
    if (!currentUser) {
        Swal.fire({
            icon: "warning",
            title: "Bạn cần đăng nhập!",
            timer: 1500,
            showConfirmButton: false
        }).then(() => {
            window.location.href = "./login.html";
        });
        return;
    }

    Swal.fire({
        title: "Bạn có chắc muốn đăng xuất?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Đăng xuất",
        cancelButtonText: "Hủy"
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("currentUser");

            Swal.fire({
                icon: "success",
                title: "Đăng xuất thành công!",
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                window.location.href = "./login.html";
            });
        }
    });
});


let userData = getDataByUser();

// kiểm tra dữ liệu user
if (userData.length === 0) {
    userData = [
        { id: "1", name: "animal", description: "Các từ vựng liên quan đến động vật" },
        { id: "2", name: "plant", description: "Các từ vựng về thực vật và cây cối" }
    ];
    saveDataForUser(userData);
}

let categories = userData.slice();
// copy toàn bộ phần tử của mảng userData sang mảng mới

let currentList =categories;
let pageSize = 2; 
let currentPage=1;
let pagination = document.getElementById("pagination");

let getDataByPage = (data) => { //lấy dữ liệu của mảng theo trang hiwenj tại
    let start = (currentPage - 1) * pageSize; //vị trí bắt đầu lấy dữ liệu
    let end = start + pageSize;
    return data.slice(start, end);
};

//cập nhật trang hiện tại
let changePage = (page) => {
    currentPage = page;
    renderData(currentList);
};

let renderPagination = (data) => {
    let totalPage = Math.ceil(data.length /pageSize);
    pagination.innerHTML = ""
    
    
    let preBtn = document.createElement("button");
    preBtn.innerText=`<`;
    if (currentPage >1) {
        preBtn.addEventListener("click",()=>{
            changePage(currentPage -1);
        });
    }
    pagination.appendChild(preBtn);

    for (let i = 1; i <= totalPage; i++) {
        let btn=document.createElement("button");
        btn.innerText= i;

        if (i === currentPage) {
            btn.classList.add("activePage");
        };

        btn.addEventListener("click", () =>{
            changePage(i);
        });

        pagination.appendChild(btn);
    };

    let nextBtn = document.createElement("button");
    nextBtn.innerText=`>`;
    if (currentPage < totalPage) {
        nextBtn.addEventListener("click",()=>{
            changePage(currentPage + 1);
        });
    }
    pagination.appendChild(nextBtn);


}
// popup
let btn_openPopUp = document.querySelectorAll(".btn-open");
let btn_closePopUp = document.querySelectorAll(".btn-close");

btn_openPopUp.forEach(btn => {
    btn.addEventListener("click", (e) => {
        if (e.target.id === "btn_addNewCategory") {
            document.getElementById("popUpNewCategory").style.display = "flex";
        }
    });
});

btn_closePopUp.forEach(btn => {
    btn.addEventListener("click", (e) => {
        let id = e.target.id;
        
        if (id === "close_add") {
            document.getElementById("popUpNewCategory").style.display = "none";
        }
        if (id === "close_edit") {
            document.getElementById("popUpEdit").style.display = "none";
        }
        if (id === "close_delete") {
            document.getElementById("popUpDeleteCategory").style.display = "none";
        }
    });
});

// cancel add
document.getElementById("btn_cancelAdd").onclick = () => {
    errorAdd_v1.innerText = "";
    errorAdd_v2.innerText = "";
    document.getElementById("popUpNewCategory").style.display = "none";
};
// cancel edit

document.getElementById("btn_cancelEditCategory").onclick = () => {
    errorEdit_v1.innerText = "";
    errorEdit_v2.innerText = "";
    document.getElementById("popUpEdit").style.display = "none";
};

// cancel delete
document.getElementById("btn_cancelDeleteCategory").onclick = () => {
    document.getElementById("popUpDeleteCategory").style.display = "none";
};


// render
let tableBody = document.getElementById("list_catagory");

const renderData = (list) => {
    let dataRender = getDataByPage(list);

    tableBody.innerHTML = "";
    
    if (list.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="3">Không có dữ liệu</td></tr>`;
        pagination.innerHTML ="";
        return;
    }
    
    dataRender.forEach(c => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${c.name}</td>
        <td>${c.description}</td>
        <td class="buttonAction">
        <button onclick="openEdit('${c.id}')" style="color:#4e73df">Edit</button>
        <button onclick="openDelete('${c.id}')" style="color:#e74a3b">Delete</button>
        </td>
        `;
        tableBody.appendChild(tr);
    });

    renderPagination(list);
};

currentList = categories;
renderData(currentList);

// edit
let currentId = null;

window.openEdit = (id) => {
    currentId = id;
    
    let cate = categories.find(c => c.id === id);
    if (!cate) return;
    
    document.getElementById("editInputCategory").value = cate.name;
    document.getElementById("editInputDecription").value = cate.description;
    
    document.getElementById("popUpEdit").style.display = "flex";
};

// delete popup
window.openDelete = (id) => {
    currentId = id;
    document.getElementById("popUpDeleteCategory").style.display = "flex";
};

// confirm delete
document.getElementById("btn_ConfirmDeleteCategory").addEventListener("click", () => {
    let index = userData.findIndex(c => c.id === currentId);
    
    if (index !== -1) {
        userData.splice(index, 1);
        saveDataForUser(userData);
    }
    
    
    categories = userData.slice();
    currentList = categories;
    currentPage = 1;
    renderData(currentList);

    //
    Swal.fire({
        icon: "success",
        title: "Đã xóa!",
        text: "Danh mục đã được xóa thành công",
        timer: 1500,
        showConfirmButton: false
        
    });

    document.getElementById("popUpDeleteCategory").style.display = "none";
});

// save edit
let errorEdit_v1 = document.getElementById("errorEditCate");
let errorEdit_v2 = document.getElementById("errorDesEdit");
let btn_confirmSave = document.getElementById("btn_saveEditCategory");
let inputEdit = document.getElementById("editInputCategory");
let inputDescription = document.getElementById("editInputDecription");
btn_confirmSave.addEventListener("click", () => {
    let index = userData.findIndex(c => c.id === currentId);
    
    errorEdit_v1.innerText="";
    errorEdit_v2.innerText = "";
    let check=true;

    if (!inputEdit.value.trim()) {
        errorEdit_v1.innerText="Không được để trống";
        check=false;
    };

    if (!inputDescription.value.trim()) {
        errorEdit_v2.innerText = "Không được để trống";
        check = false;
    };

    if (!check) return;

    if (index === -1) return;
    
    userData[index] = {
        id: currentId,
        name: inputEdit.value.trim(),
        description: inputDescription.value.trim(),
    };
    
    saveDataForUser(userData)
    categories = userData.slice();
    currentList = categories;
    renderData(currentList);

    Swal.fire({
        icon: "success",
        title: "Cập nhật thành công!",
        timer: 1500,
        showConfirmButton: false
        
    });
    document.getElementById("popUpEdit").style.display = "none";
});

// search
let inputSearchCate = document.getElementById("inputSearchCate");

inputSearchCate.addEventListener("keyup", () => {
    let keyword = inputSearchCate.value.toLowerCase().trim();
    
    let result = categories.filter(c =>
        c.name.toLowerCase().includes(keyword)
    );
    
    currentList = result;
    currentPage = 1;
    renderData(currentList);
});

// add new

btn_Add.addEventListener("click", () => {
    
    errorAdd_v1.innerText = "";
    errorAdd_v2.innerText ="";

    let check=true;
    if (!inputNew.value.trim()){
        errorAdd_v1.innerText = "Không được để trống";
        check=false;
    } 
    if (!inputNewDescription.value.trim()) {
        errorAdd_v2.innerText = "Không được để trống";
        check=false
    };

    if (!check) {
        return;
    }
        
    
    let newCategory = {
        id: Date.now().toString(),
        name: inputNew.value.trim(),
        description: inputNewDescription.value.trim(),
    };
    
    userData.push(newCategory);
    saveDataForUser(userData);
    categories = userData.slice();
    currentList = categories;
    currentPage = 1;
    renderData(currentList);

    Swal.fire({
        icon: "success",
        title: "Đã thêm mới!",
        timer: 1500,
        showConfirmButton: false
        
    });
    
    document.getElementById("popUpNewCategory").style.display = "none";
    
    inputNew.value = "";
    inputNewDescription.value = "";
});

