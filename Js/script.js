const storageKey = 'BookShelf';
let indexsave = 0;
let books = [];
let btnsave = document.getElementById('bt-save');
let btncancel = document.getElementById('bt-cancel');
let btdeletedCompleted = document.getElementById('bt-deleted_Completed');
let btdeletedUnCompleted = document.getElementById('bt-deleted_UnCompleted');
let btSEARCH = document.getElementById('bt-SEARCH');
let TAHUN_PEMBUATAN = document.getElementById("p-TAHUN_PEMBUATAN");

function CheckLocalStorage(){
    if(typeof(Storage) === undefined){
        alert("Browser tidak didukung local storage");
        return false
    }
    return true;
}

function SaveBook(){
	if(CheckLocalStorage()){
		localStorage.setItem(storageKey, JSON.stringify(books));
	}
}

function BookShelfList(data){
	if(CheckLocalStorage()){
		if(localStorage.getItem(storageKey) !== null){
			books = JSON.parse(localStorage.getItem(storageKey));
		}
		
		books.unshift(data);
		if (books.length > 5) {
			books.pop();
		}
		SaveBook();
	}
}

function loadBookList() {
    const serializedData = localStorage.getItem(storageKey);
    let data = JSON.parse(serializedData);

    if (data !== null) {
        for (const book of data) {
            books.push(book);
        }
    }
    renderBookList();
}

function clearForm(){
	document.getElementById('p-JUDUL').value = '';
	document.getElementById('p-NAMA_PENULIS').value = '';
	document.getElementById('p-TAHUN_PEMBUATAN').value = '';
	document.getElementById('p-KETERANGAN').value = '';
	document.getElementById('p-COMPLETED_BOOK').checked = false;
}

function findBook(Id) {
	for (const book of books) {
		if (book.id === Id) {
			return book;
		}
	}
	return null;
}

function findBookJudul(judul) {
	for (const book of books) {
		if (book.judul === judul) {
			return book;
		}
	}
	return null;
}

function findBookIndex(Id) {
	for (const i in books) {
		if (books[i].id === Id) {
            return i;
        }
	}
	return -1;
}

function BookListCompleted(BookListcompleted, id, judul, penulis, tahun, keterangan){
	let tablecompleted = document.createElement('table');
	tablecompleted.classList.add('BookListCompleted');
	
	let tbody = document.createElement('tbody');
	
	let trJudul = document.createElement('tr');
	trJudul.classList.add('label-judul');
	let tdJudul = document.createElement('td');
	let labelJudul = document.createElement('label');
	labelJudul.classList.add('value-judul');
	labelJudul.innerHTML = judul;
	
	let trPenulis = document.createElement('tr');
	let tdPenulis = document.createElement('td');
	let labelPenulis = document.createElement('label');
	labelPenulis.innerHTML ='Penulis : ' + penulis;
	
	let trTahun = document.createElement('tr');
	let tdTahun = document.createElement('td');
	let labelTahun = document.createElement('label');
	labelTahun.innerHTML ='Tahun : ' + tahun;
	
	let trKeterangan = document.createElement('tr');
	let tdKeterangan = document.createElement('td');
	let labelKeterangan = document.createElement('label');
	labelKeterangan.innerHTML ='Keterangan : ' + keterangan;
	
	let btuncompleted = document.createElement('a');
		btuncompleted.innerHTML = '<span>Belum Selesai Dibaca</span>'
		btuncompleted.classList.add('g-button'); 
		btuncompleted.classList.add('g-button-submit'); 
		btuncompleted.addEventListener('click', function () {
			BookisUnCompleted(id);
		});
		
	let btdeleted_Completed = document.createElement('a');
		btdeleted_Completed.innerHTML = '<span>Hapus Buku</span>'
		btdeleted_Completed.classList.add('g-button'); 
		btdeleted_Completed.classList.add('g-button-red'); 
		btdeleted_Completed.addEventListener('click', function () {
			DeleteBook(id);
		});
		
	let btEditcompleted = document.createElement('a');
		btEditcompleted.innerHTML = '<span>Edit Buku</span>'
		btEditcompleted.classList.add('g-button');  
		btEditcompleted.addEventListener('click', function () {
			EditBook(id);
		});
		
	let trButton = document.createElement('tr');
	trButton.classList.add('row-button');
	
	let tdButton = document.createElement('td');
	
	let pButton = document.createElement('p');
	
	pButton.appendChild(btuncompleted)
	pButton.appendChild(btdeleted_Completed)
	pButton.appendChild(btEditcompleted)
	
	tbody.appendChild(trJudul).appendChild(tdJudul).appendChild(labelJudul);
	tbody.appendChild(trPenulis).appendChild(tdPenulis).appendChild(labelPenulis);
	tbody.appendChild(trTahun).appendChild(tdTahun).appendChild(labelTahun);
	tbody.appendChild(trKeterangan).appendChild(tdKeterangan).appendChild(labelKeterangan);
	tbody.appendChild(trButton).appendChild(tdButton).appendChild(pButton);
	
	BookListcompleted.appendChild(tablecompleted).appendChild(tbody);
}

function BookListUnCompleted(BookListuncompleted, id, judul, penulis, tahun, keterangan){
	let tableuncompleted = document.createElement('table');
	tableuncompleted.classList.add('BookListUnCompleted');
	
	let tbody = document.createElement('tbody');
	
	let trJudul = document.createElement('tr');
	trJudul.classList.add('label-judul');
	let tdJudul = document.createElement('td');
	let labelJudul = document.createElement('label');
	labelJudul.classList.add('value-judul');
	labelJudul.innerHTML = judul;
	
	let trPenulis = document.createElement('tr');
	let tdPenulis = document.createElement('td');
	let labelPenulis = document.createElement('label');
	labelPenulis.innerHTML ='Penulis : ' + penulis;
	
	let trTahun = document.createElement('tr');
	let tdTahun = document.createElement('td');
	let labelTahun = document.createElement('label');
	labelTahun.innerHTML ='Tahun : ' + tahun;
	
	let trKeterangan = document.createElement('tr');
	let tdKeterangan = document.createElement('td');
	let labelKeterangan = document.createElement('label');
	labelKeterangan.innerHTML ='Keterangan : ' + keterangan;
	
	let btcompleted = document.createElement('a');
		btcompleted.innerHTML = '<span>Selesai Dibaca</span>'
		btcompleted.classList.add('g-button'); 
		btcompleted.classList.add('g-button-submit'); 
		btcompleted.addEventListener('click', function () {
			BookisCompleted(id);
		});
		
	let btdeleted_UnCompleted = document.createElement('a');
		btdeleted_UnCompleted.innerHTML = '<span>Hapus Buku</span>'
		btdeleted_UnCompleted.classList.add('g-button'); 
		btdeleted_UnCompleted.classList.add('g-button-red'); 
		btdeleted_UnCompleted.addEventListener('click', function () {
			DeleteBook(id);
		});
		
	let btEditUnCompleted = document.createElement('a');
		btEditUnCompleted.innerHTML = '<span>Edit Buku</span>'
		btEditUnCompleted.classList.add('g-button');  
		btEditUnCompleted.addEventListener('click', function () {
			EditBook(id);
		});
		
	let trButton = document.createElement('tr');
	trButton.classList.add('row-button');
	
	let tdButton = document.createElement('td');
	
	let pButton = document.createElement('p');
	
	pButton.appendChild(btcompleted)
	pButton.appendChild(btdeleted_UnCompleted)
	pButton.appendChild(btEditUnCompleted)
	
	tbody.appendChild(trJudul).appendChild(tdJudul).appendChild(labelJudul);
	tbody.appendChild(trPenulis).appendChild(tdPenulis).appendChild(labelPenulis);
	tbody.appendChild(trTahun).appendChild(tdTahun).appendChild(labelTahun);
	tbody.appendChild(trKeterangan).appendChild(tdKeterangan).appendChild(labelKeterangan);
	tbody.appendChild(trButton).appendChild(tdButton).appendChild(pButton);
	
	BookListuncompleted.appendChild(tableuncompleted).appendChild(tbody);
}

function renderBookList() {
	const BookListuncompleted = document.querySelector('#dg1_list-Book_uncompleted');
	const BookListcompleted = document.querySelector('#dg1_list-Book_completed');
	BookListuncompleted.innerHTML = '';
	BookListcompleted.innerHTML = '';
  
	for (const book of books) {
		if(book.completedBook == true){			
			BookListCompleted(BookListcompleted, book.id, book.judul, book.penulis, book.tahun, book.keterangan);
		}else{
			BookListUnCompleted(BookListuncompleted, book.id, book.judul, book.penulis, book.tahun, book.keterangan);
		}
	}
} 

function optionYear(){
	currentYear = (new Date()).getFullYear();
	startYear = currentYear - 30;
	endYear = currentYear + 1;
	
	for (i=startYear;i<=endYear;i++) {
	newOption = document.createElement("option");
	newOption.value = i;
	newOption.label = i;
		if (i == currentYear) {
			newOption.selected = true;
		}
	TAHUN_PEMBUATAN.appendChild(newOption);
	}
}

btnsave.addEventListener('click', function(event){
	event.preventDefault();
	
	if(indexsave == 2){
		SaveEditBook();
		indexsave = 0;
	}else{
		const id = +new Date();
		const judul = document.getElementById('p-JUDUL').value;
		const penulis = document.getElementById('p-NAMA_PENULIS').value;
		const tahun = document.getElementById('p-TAHUN_PEMBUATAN').value;
		const keterangan = document.getElementById('p-KETERANGAN').value;
		const completedBook = document.getElementById('p-COMPLETED_BOOK').checked;
		const newBookData = {
			id: id,
			judul: judul,
			penulis: penulis,
			tahun: tahun,
			keterangan: keterangan,
			completedBook: completedBook,
		};	
		books.push(newBookData);
		BookShelfList(newBookData);
		renderBookList();
	}		
	clearForm();
	
	setTimeout(function() {
		alert('Buku berhasil disimpan');
	}, 100);
	
});

btncancel.addEventListener('click', function(event){
	clearForm();
});

function DeleteBook(Id) {
	let message = 'Apakah anda ingin menghapus buku ini?';
	if(confirm(message) == true){
		const BookIndex = findBookIndex(Id);
		
		if (BookIndex === -1){ 
			return false;
		}else{
			books.splice(BookIndex, 1);
			SaveBook();
			renderBookList();
			
			setTimeout(function() {
				alert('Buku berhasil dihapus');
			}, 100);
			
		}
	}else{
		return false;
	}
}

function SearchBookByTitle(judul){
	const BookListuncompleted = document.querySelector('#dg1_list-Book_uncompleted');
	const BookListcompleted = document.querySelector('#dg1_list-Book_completed');
	BookListuncompleted.innerHTML = '';
	BookListcompleted.innerHTML = '';
  
	for (let book of books) {
		if (book.judul.toLowerCase().includes(judul.toLowerCase())) {
			if(book.completedBook == true){			
				BookListCompleted(BookListcompleted, book.id, book.judul, book.penulis, book.tahun, book.keterangan);
			}else{
				BookListUnCompleted(BookListuncompleted, book.id, book.judul, book.penulis, book.tahun, book.keterangan);
			}
		}
	}
}

btSEARCH.addEventListener('click', function(event){
	const value = document.getElementById("p-SEARCH").value;
	
	SearchBookByTitle(value);
});

function BookisCompleted(Id){
	const BookCompleted = findBook(Id);
	
	if (BookCompleted == null){
		return false;
	} else {
		BookCompleted.completedBook = true;
		renderBookList();
		SaveBook();		
	}
}

function BookisUnCompleted(Id){
	const BookUnCompleted = findBook(Id);
	if (BookUnCompleted == null){
		return false;
	} else {
		BookUnCompleted.completedBook = false;
		renderBookList();	
		SaveBook();	
	}
}

function EditBook(Id){
	const Editbook = findBook(Id);
	if (Editbook == null){
		return false;
	} else {
		document.getElementById('p-ID').value = Editbook.id;
		document.getElementById('p-JUDUL').value = Editbook.judul;
		document.getElementById('p-NAMA_PENULIS').value = Editbook.penulis;
		document.getElementById('p-TAHUN_PEMBUATAN').value = Editbook.tahun;
		document.getElementById('p-KETERANGAN').value = Editbook.keterangan;
		document.getElementById('p-COMPLETED_BOOK').checked = Editbook.completedBook;
		indexsave = 2;
	}
}

function SaveEditBook(){
	const Id = document.getElementById('p-ID').value;
	const judul = document.getElementById('p-JUDUL').value;
	const penulis = document.getElementById('p-NAMA_PENULIS').value;
	const tahun = document.getElementById('p-TAHUN_PEMBUATAN').value;
	const keterangan = document.getElementById('p-KETERANGAN').value;
	const completedBook = document.getElementById('p-COMPLETED_BOOK').checked;
	
	let objIndex = books.findIndex((obj => obj.id == Id));
	
	books[objIndex].judul = judul;
	books[objIndex].penulis = penulis;
	books[objIndex].tahun = tahun;
	books[objIndex].keterangan = keterangan;
	books[objIndex].completedBook = completedBook;
	
	console.log(books[objIndex].completedBook);
	
	//books.push(EditBookData);
	SaveBook();
	renderBookList();
}

window.addEventListener('load', function () {
  if (CheckLocalStorage) {
    if (localStorage.getItem(storageKey) !== null) {
      renderBookList();
	  optionYear();
    }
	optionYear();
  }
});

document.addEventListener('DOMContentLoaded', function () {
	if(CheckLocalStorage()){
		loadBookList();
	}
});