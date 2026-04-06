let accounts = JSON.parse(localStorage.getItem("listAccount")) || [];

// logout
let btnLogout = document.getElementById("btn_logout");
btnLogout.addEventListener("click", () => {
    if (confirm("Bạn có chắc muốn đăng xuất không ?")) {
        localStorage.removeItem("currentUser");
        alert("Đăng xuất thành công!");
        window.location.href = "./login.html";
    }
});


// data mặc định
let categories = [
    { id: "1", name: "Con vật", description: "Các từ vựng liên quan đến động vật" },
    { id: "2", name: "Cây cối", description: "Các từ vựng về thực vật và cây cối" }
];

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
    document.getElementById("popUpNewCategory").style.display = "none";
};

// cancel edit
document.getElementById("btn_cancelEditCategory").onclick = () => {
    document.getElementById("popUpEdit").style.display = "none";
};

// cancel delete
document.getElementById("btn_cancelDeleteCategory").onclick = () => {
    document.getElementById("popUpDeleteCategory").style.display = "none";
};
// localStorage
let saveData = () => {
    localStorage.setItem("listCatagory", JSON.stringify(categories));
};

let getData = () => {
    let data = localStorage.getItem("listCatagory");
    if (data) {
        categories = JSON.parse(data);
    }
};
getData();

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
    let index = categories.findIndex(c => c.id === currentId);
    
    if (index !== -1) {
        categories.splice(index, 1);
    }
    
    saveData();
    currentList = categories;
    renderData(currentList);
    document.getElementById("popUpDeleteCategory").style.display = "none";
});

// save edit
let btn_confirmSave = document.getElementById("btn_saveEditCategory");
let inputEdit = document.getElementById("editInputCategory");
let inputDescription = document.getElementById("editInputDecription");

btn_confirmSave.addEventListener("click", () => {
    let index = categories.findIndex(c => c.id === currentId);
    
    if (index === -1) return;
    
    categories[index] = {
        id: currentId,
        name: inputEdit.value.trim(),
        description: inputDescription.value.trim(),
    };
    
    saveData();
    renderData(categories);
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
let inputNew = document.getElementById("inputNewCategory");
let inputNewDescription = document.getElementById("inputDescripton");
let btn_Add = document.getElementById("btn_save");

btn_Add.addEventListener("click", () => {
    
    if (!inputNew.value.trim() || !inputNewDescription.value.trim()) {
        alert("Không được để trống");
        return;
    }
    
    let newCategory = {
        id: Date.now().toString(),
        name: inputNew.value.trim(),
        description: inputNewDescription.value.trim(),
    };
    
    categories.push(newCategory);
    saveData();
    renderData(categories);
    
    document.getElementById("popUpNewCategory").style.display = "none";
    
    inputNew.value = "";
    inputNewDescription.value = "";
});

//phân trang
