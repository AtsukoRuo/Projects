var objects = null;
var book_Id = 0;
var frontgoundDOM = document.querySelector(".frontground");
var activeFormDOM = null;

(async function getAllBooks() {
    let response = await fetch("BookManager?operation=getAllBooks");
    let objects = await response.json();
    if (objects.length === 0) {
        sendMessageToTip("NO BOOK NOW!", "error");
    } else {
        let preHTML = '';
        for (const object of objects) {
            preHTML += `
                <div class="book-item" data-bookid="${object.id}">
                    <div class="book-item-info">
                        <img src="figure/${object.img_src}" />
                        <span>${object.title}</span>
                    </div>

                    <div class="book-item-operation-wrapper">
                        <div class="book-item-operation">
                            <div class="book-operation-borrow">
                                <img src="figure/图书借阅.png" />
                                <span>borrow</span>
                            </div>
                            <div class="book-operation-return">
                                <img src="figure/归还.png">
                                <span>return</span>
                            </div>
                            <div class="book-operation-info">
                                <img src="figure/查看.png" />
                                <span>info</span>
                            </div>
                            <div class="book-operation-delete">
                                <img src="figure/删除.png" />
                                <span>delete</span>
                            </div>
                            <div class="book-operation-update">
                                <img src="figure/更新.png" />
                                <span>update</span>
                            </div>
                        </div>
                    </div>
                </div>`;
        }
        document.querySelector(".books-container").innerHTML += preHTML;
        refreshEvent();
    }
})();

function cancelForm() {
    activeFormDOM.classList.add("form-isRemoved");
    frontgoundDOM.classList.add("frontground-isRemoved");
}

let bookRecord = {
    id: 0,
    title: "",
    time_issue: "",
    num_word: "",
    price: "",
    time_in: "",
    status: "",
    author: "",
    img_src: ""
};
function isValidTimeFormat(time) {
    return true;
}


document.getElementById("btn-add").addEventListener('click', async (e) => {
    let isOK = true;
    document.getElementById("form-add").querySelectorAll("input").forEach((element) => {
        if (element.value === null || element.value.length === 0) isOK = false;
        if (element.dataset.inputType === "time") {
            if (!isValidTimeFormat(element.value)) {
                sendMessageToTip('Invalid Time Format YYYY-MM-DD', 'error');
                return;
            }
        }
        bookRecord[element.name] = element.value;
    });
    if (isOK) {
        let response = await fetch("BookManager?operation=add", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(bookRecord)
        });

        let json = await response.json();
        let preHTML =  `
                <div class="book-item" data-bookid="${json.id}">
                    <div class="book-item-info">
                        <img src="figure/${json.img_src}" />
                        <span>${bookRecord.title}</span>
                    </div>

                    <div class="book-item-operation-wrapper">
                        <div class="book-item-operation">
                            <div class="book-operation-borrow">
                                <img src="figure/图书借阅.png" />
                                <span>borrow</span>
                            </div>
                            <div class="book-operation-return">
                                <img src="figure/归还.png">
                                <span>return</span>
                            </div>
                            <div class="book-operation-info">
                                <img src="figure/查看.png" />
                                <span>info</span>
                            </div>
                            <div class="book-operation-delete">
                                <img src="figure/删除.png" />
                                <span>delete</span>
                            </div>
                            <div class="book-operation-update">
                                <img src="figure/更新.png" />
                                <span>update</span>
                            </div>
                        </div>
                    </div>
                </div>`;
        
        document.querySelector(".books-container").innerHTML += preHTML;
        refreshEvent();
    } else {
        sendMessageToTip('Failed : Empty Field!', 'error');
    }
    cancelForm();
});


document.getElementById("btn-delete").addEventListener('click', async (e) => {
    let response = await fetch(`BookManager?id=${book_Id}`, {method : "Delete"});
    document.querySelector(`.book-item[data-bookid="${book_Id}"]`).remove();
    cancelForm();
});
document.getElementById("btn-update").addEventListener('click', async (e) => {
    
});

document.getElementById("btn-return").addEventListener('click', async (e) => {
    let isOK = true;
    let record = {};
    document.getElementById("form-return").querySelectorAll("input").forEach((element) => {
        if (element.value === null || element.value.length === 0) isOK = false;
        record[`${element.name}`] = element.value;
    });
    record["book_id"] = book_Id;
    if (isOK) {
        let response = await fetch("BookManager?operation=return", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(record)
        });

    } else {
        sendMessageToTip('Failed : Empty Field!', 'error');
    }
    cancelForm();
    sendMessageToTip('return successfully', 'success');
});

document.getElementById("btn-borrow").addEventListener('click', async (e) => {
    let isOK = true;
    let record = {};
    document.getElementById("form-borrow").querySelectorAll("input").forEach((element) => {
        if (element.value === null || element.value.length === 0) isOK = false;
        record[`${element.name}`] = element.value;
    });
    record["book_id"] = book_Id;
    if (isOK) {
        let response = await fetch("BookManager?operation=borrow", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(record)
        });
    } else {
        sendMessageToTip('Failed : Empty Field!', 'error');
    }
    cancelForm();
    sendMessageToTip('borrow successfully', 'success');
});
document.getElementById("btn-update").addEventListener('click', async (e) => {
    let record = {};
    document.getElementById("form-update").querySelectorAll("input").forEach((element) => {
        record[`${element.name}`] = element.value;
    });
    record["book_id"] = book_Id;
    let response = await fetch("BookManager?operation=update", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(record)
    });
    cancelForm();
    sendMessageToTip('update successfully', 'success');
});

function refreshEvent() {
    document.querySelectorAll(".book-item").forEach((element) => {
        if (element.hasAttribute("data-bookid"))
            RegistrationCenter(element);
    });
    document.querySelectorAll(".btn-cancel").forEach((element) => {
        element.addEventListener('click', cancelForm);
    });
    document.querySelector(".form-close").addEventListener('click', cancelForm);
    document.querySelector(".book-operation-add").addEventListener('click', (e)=>{
        displayForm("form-add", null);
    });
}

function RegistrationCenter(DOM) {
    DOM.querySelector(".book-operation-borrow").addEventListener('click', (e) => {
        displayForm("form-borrow", DOM);
    });
    DOM.querySelector(".book-operation-info").addEventListener('click', (e) => {
        activeFormDOM = document.querySelector("#form-info");
        getFormDate(DOM);
        activeFormDOM.classList.remove("form-isRemoved");
        frontgoundDOM.classList.remove("frontground-isRemoved");
    });
    DOM.querySelector(".book-operation-return").addEventListener('click', (e) => {
        displayForm("form-return", DOM);
    });
    DOM.querySelector(".book-operation-delete").addEventListener('click', (e) => {
        displayForm("form-delete", DOM);
    });
    DOM.querySelector(".book-operation-update").addEventListener('click', (e) => {
        displayForm("form-update", DOM);
    });
}

function displayForm(id, elem) {
    activeFormDOM = document.getElementById(`${id}`);
    document.querySelectorAll(`#${id} input`).forEach((element) => {
        element.value = "";
    });
    activeFormDOM.classList.remove("form-isRemoved");
    frontgoundDOM.classList.remove("frontground-isRemoved");
    if (elem !== null) book_Id = elem.dataset.bookid;
}


async function getFormDate(elem) {
    let response =  await fetch(`BookManager?id=${elem.dataset.bookid}&operation=getBook`);
    let json =  await response.json();
    document.querySelector(".form-info-items-wrapper").innerHTML = `
        <div class="form-info-item">
                    <div class="form-info-name">Title</div>
                    <div class="form-info-value">${json.title}</div>
                </div>
                <div class="form-info-item">
                    <div class="form-info-name">Time Issue</div>
                    <div class="form-info-value">${json.time_issue}</div>
                </div>
                <div class="form-info-item">
                    <div class="form-info-name">Word</div>
                    <div class="form-info-value">${json.num_word}</div>
                </div>
                <div class="form-info-item">
                    <div class="form-info-name">Price</div>
                    <div class="form-info-value">${json.price}</div>
                </div>
                <div class="form-info-item">
                    <div class="form-info-name">Status</div>
                    <div class="form-info-value">${json.status}</div>
                </div>
                <div class="form-info-item">
                    <div class="form-info-name">Author</div>
                    <div class="form-info-value">${json.author}</div>
                </div>
    `;
    response = await fetch(`BookManager?id=${elem.dataset.bookid}&operation=getBorrowingRecordOfBook`);
    objects = await response.json();
    let preHTML = `
        <div class="form-info-record">
                    <span>name</span>
                    <span>student id</span>
                    <span>contact</span>
                    <span>check out</span>
                    <span>check in</span>
                    <span>status</span>
                    <span>note</span>
        </div>
    `;
    for (object of objects) {
        preHTML += `
            <div class="form-info-record">
                    <span>${object.name}</span>
                    <span>${object.student_id}</span>
                    <span>${object.contact}</span>
                    <span>${object.time_out}</span>
                    <span>${object.time_back}</span>
                    <span>${object.status_back}</span>
                    <span>${object.info}</span>
              </div>
        `
    }
    document.querySelector(".form-info-records-wrapper").innerHTML = preHTML;
}

document.getElementById("btn-warning").addEventListener('click', (e)=> {
    document.getElementById("form-warning").classList.add("form-isRemoved");
});