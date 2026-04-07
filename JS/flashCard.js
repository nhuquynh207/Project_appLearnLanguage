let accounts = JSON.parse(localStorage.getItem("listAccount")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser"));

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

// lấy category 
const getCategoryByUser = () => {
    let data = localStorage.getItem("data_" + currentUser.id);
    if (!data || data === "undefined") {
        return [];
    };
    return JSON.parse(data);
};

let listCatagory = getCategoryByUser(); 



const getDataByUser = () =>{
    let data = localStorage.getItem("word_" + currentUser.id);
    if (!data || data === "undefined") return [];
    return JSON.parse(data);
};

let userData = getDataByUser();

let tableListWord = document.getElementById("listLearned");
let cardLearn = document.getElementById("cardWord");

const renderListWord = (list) =>{
    tableListWord.innerHTML = "";

    list.forEach(w => {
        let tr = document.createElement("tr");
        tr.innerHTML= `
            <td>${w.word}</td>
            <td>${w.meaning}</td>
            <td>Not learned</td>
        `;
        tableListWord.appendChild(tr);
    });
};

renderListWord(userData);

let btnPrev = document.getElementById("btn_pre");
let btnNext = document.getElementById("btn_next");
let currentIndex = 0;
const renderCardWord = () => {
    if (userData.length === 0) {
        cardLearn.innerText = "No words available";
        return;
    }

    let currentWord = userData[currentIndex];

    cardLearn.innerHTML = `
        <h2>${currentWord.word}</h2>

    `;
};
renderCardWord();

btnNext.addEventListener("click", () => {
    if (currentIndex < userData.length - 1) {
        currentIndex++;
        renderCardWord();
    }
});

btnPrev.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        renderCardWord();
    }
});

let select = document.getElementById("searchcategories")
const renderOption = () => {
    select.innerHTML = `<option value="AllCategory">-- All Category --</option>`;

    listCatagory.forEach(c => {
        let option = document.createElement("option");
        option.value = c.id;
        option.innerText = c.name;
        select.appendChild(option);
    });
};

renderOption();

select.addEventListener("change", () => {
    let type = select.value;

    if (type === "AllCategory") {
        renderListWord(userData);
    } else {
        let result = userData.filter(w => w.categoryId === type);
        renderListWord(result);
    }
});
