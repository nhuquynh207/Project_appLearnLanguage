let accounts = JSON.parse(localStorage.getItem("listAccount")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser"));

// lấy category 
const getCategoryByUser = () => {
    let data = localStorage.getItem("data_" + currentUser.id);
    if (!data || data === "undefined") return [];
    return JSON.parse(data);
};

let listCatagory = getCategoryByUser(); 

// lưu word theo user
const saveDataForUser =(data)=>{
    localStorage.setItem("word_"+ currentUser.id , JSON.stringify(data));
};

const getDataByUser = () =>{
    let data = localStorage.getItem("word_" + currentUser.id);
    if (!data || data === "undefined") return [];
    return JSON.parse(data);
};

let userData = getDataByUser();

// kiểm tra dữ liệu user
if (userData.length === 0) {
    userData = [
        {
            id: "1",
            word: "Cat",
            meaning: "mèo",
            categoryId: "1",
            example: "The cat is sleeping on the sofa."
        },
        {
            id: "2",
            word: "Dog",
            meaning: "chó",
            categoryId: "1",
            example: "My dog loves playing in the park."
        }
    ];
    saveDataForUser(userData);
}


let words = userData.slice();

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

// popup
let btn_openPopUp = document.querySelectorAll(".btn-open");
let btn_closePopUp = document.querySelectorAll(".btn-close");

btn_openPopUp.forEach(btn => {
    btn.addEventListener("click", (e) => {
        if (e.target.id === "btn_addNewWord") {
            document.getElementById("popUpNewWord").style.display = "flex";
        }
    });
});

btn_closePopUp.forEach(btn => {
    btn.addEventListener("click", (e) => {
        let id = e.target.id;

        if (id === "close_add") {
            document.getElementById("popUpNewWord").style.display = "none";
        }
        if (id === "close_edit") {
            document.getElementById("popUpEdit").style.display = "none";
        }
        if (id === "close_delete") {
            document.getElementById("popUpDeleteWord").style.display = "none";
        }
    });
});

// cancel
document.getElementById("btn_cancelAddNewWord").onclick = () => {
    errorAdd_v1.innerText = "";
    errorAdd_v2.innerText = "";
    errorAdd_v3.innerText = "";
    inputNewWord.value = "";
    inputMeaningWord.value = "";
    document.getElementById("popUpNewWord").style.display = "none";
};

document.getElementById("btn_cancelEditWord").onclick = () => {
    errorEdit_v1.innerText="";
    errorEdit_v2.innerText="";
    errorEdit_v3.innerText="";
    document.getElementById("popUpEdit").style.display = "none";
};

document.getElementById("btn_cancelDeleteWord").onclick = () => {
    document.getElementById("popUpDeleteWord").style.display = "none";
};

// render
let tableRenderData = document.getElementById("list_word");

const renderData = (list) => {
    tableRenderData.innerHTML = "";

    list.forEach(w => {
        let cate = listCatagory.find(c => c.id === w.categoryId);
        let tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${w.word}</td>
        <td>${w.meaning}</td>
        <td>${cate ? cate.name : ""}</td>
        <td class="buttonAction">
            <button onclick="openEdit('${w.id}')" style="color: #4e73df;">Edit</button>
            <button onclick="openDelete('${w.id}')" style="color: #e74a3b;">Delete</button>
        </td>
        `;
        tableRenderData.appendChild(tr);
    });
};

renderData(words);

// edit/delete popup
let indexWord = null;

let inputEditWord = document.getElementById("editInputWord");
let inputEditMeaning = document.getElementById("editInputMeaning");
let inputEditCategory = document.getElementById("editInputCategory");

let openEdit = (id) => {
    let w = words.find(e => e.id === id);
    if (!w) return;

    inputEditWord.value = w.word;
    inputEditMeaning.value = w.meaning;
    inputEditCategory.value = w.categoryId;

    indexWord = id;
    document.getElementById("popUpEdit").style.display = "flex";
};

let openDelete = (id) => {
    indexWord = id;
    document.getElementById("popUpDeleteWord").style.display = "flex";
};

// thêm mới
let inputNewWord = document.getElementById("inputNewWord");
let inputMeaningWord = document.getElementById("inputMeaningWord");
let catagoryWord = document.getElementById("selectCategory");
let btn_confirmAdd = document.getElementById("btn_saveNewWord");
let select  = document.getElementById("editInputCategory");

// ===== dùng category user =====
const renderOptionAdd = () =>{
    catagoryWord.innerHTML = `<option value="AllCategory">-- All Category --</option>`;
    
    listCatagory.forEach(c =>{
        let option = document.createElement("option");
        option.value = c.id;
        option.innerText = c.name;
        catagoryWord.appendChild(option);
    });
};

renderOptionAdd();

let errorAdd_v1 = document.getElementById("InputwordAdd");
let errorAdd_v2 = document.getElementById("InputMeaningAdd");
let errorAdd_v3 = document.getElementById("selectAdd");

btn_confirmAdd.addEventListener("click", () => {
    let wordNew = inputNewWord.value.trim();
    let meaning = inputMeaningWord.value.trim();

    errorAdd_v1.innerText = ""
    errorAdd_v2.innerText = ""
    errorAdd_v3.innerText = ""

    let isValid = true;

    if (!wordNew) {
        errorAdd_v1.innerText = "Không được để trống";
        isValid = false;
    }

    if (!meaning) {
        errorAdd_v2.innerText = "Không được để trống";
        isValid = false;
    }

    if (catagoryWord.value === "AllCategory") {
        errorAdd_v3.innerText = "Phải chọn danh mục";
        isValid = false;
    }

    if (!isValid) return;

    let newWord = {
        id: Date.now().toString(),
        word: wordNew,
        meaning: meaning,
        categoryId: catagoryWord.value,
        example: "Example",
    };

    userData.push(newWord);
    saveDataForUser(userData);

    words = userData.slice();
    renderData(words);

    Swal.fire({
        icon: "success",
        title: "Đã thêm mới!",
        timer: 1500,
        showConfirmButton: false
    });

    document.getElementById("popUpNewWord").style.display = "none";

    inputNewWord.value = "";
    inputMeaningWord.value = "";
    searchByCatagories.value = "AllCategory";
});

// delete
let btn_confirmDelete = document.getElementById("btn_ConfirmDeleteWord");

btn_confirmDelete.addEventListener("click", () => {
    let index = userData.findIndex(w => w.id === indexWord);

    if (index !== -1) {
        userData.splice(index, 1);
        saveDataForUser(userData);

        words = userData.slice();
        renderData(words);
    }

    Swal.fire({
        icon: "success",
        title: "Đã xóa!",
        timer: 1500,
        showConfirmButton: false
    });

    document.getElementById("popUpDeleteWord").style.display = "none";
});

// edit
let btn_editConfirm = document.getElementById("btn_saveEditWord");
let errorEdit_v1 = document.getElementById("InputwordEdit");
let errorEdit_v2 = document.getElementById("InputMeaningEdit");
let errorEdit_v3 = document.getElementById("selectEdit");

btn_editConfirm.addEventListener("click", () => {
    let index = userData.findIndex(w => w.id === indexWord);

    errorEdit_v1.innerText="";
    errorEdit_v2.innerText="";
    errorEdit_v3.innerText="";

    let check = true;

    if (!inputEditWord.value.trim()) {
        errorEdit_v1.innerText= "Không được để trống";
        check=false;
    }

    if (!inputEditMeaning.value.trim()) {
        errorEdit_v2.innerText= "Không được để trống";
        check=false;
    }

    if (!inputEditCategory.value) {
        errorEdit_v3.innerText = "Phải chọn danh mục!"
        check=false;
    }

    if (!check) return;

    
    if (index !== -1) {
        let oldData = userData[index];

        userData[index] = {
            id: oldData.id,
            word: inputEditWord.value.trim(),
            meaning: inputEditMeaning.value.trim(),
            categoryId: inputEditCategory.value,
            example: "example"
        };

        saveDataForUser(userData);
        words = userData.slice();
        renderData(words);
    };

    Swal.fire({
        icon: "success",
        title: "Cập nhật thành công!",
        timer: 1500,
        showConfirmButton: false
    });

    document.getElementById("popUpEdit").style.display = "none";
});

// filter
let searchByCatagories = document.getElementById("list_categories");

searchByCatagories.addEventListener("change", () => {
    let type = searchByCatagories.value;

    if (type === "AllCategory") {
        renderData(words);
    } else {
        let result = words.filter(w => w.categoryId === type);
        renderData(result);
    }
});

// search
let inputSearchVocab = document.getElementById("inputSearchCate");

inputSearchVocab.addEventListener("keyup", () => {
    let keyword = inputSearchVocab.value.toLowerCase().trim();

    let result = words.filter(w =>
        w.word.toLowerCase().includes(keyword) ||
        w.meaning.toLowerCase().includes(keyword)
    );

    renderData(result);
});

// render select filter
const renderOption = () => {
    searchByCatagories.innerHTML = `<option value="AllCategory">-- All Category --</option>`;

    listCatagory.forEach(c => {
        let option = document.createElement("option");
        option.value = c.id;
        option.innerText = c.name;
        searchByCatagories.appendChild(option);
    });
};

renderOption();

const renderOptionEdit = () =>{
    select.innerHTML = ``;
    listCatagory.forEach(c =>{
        let option = document.createElement("option");
        option.value = c.id;
        option.innerText = c.name;
        select.appendChild(option);
    });
};

renderOptionEdit();