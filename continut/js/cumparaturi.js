class Storage{
    getItem(){
        throw new Error("Abstract get method");
    }

    setItem(products){
        throw new Error("Abstract set method");
    }

}
class LocalStorage extends Storage{
    getItem(resolve){
        let content = localStorage.getItem('products')
        if (content != null)
        return resolve(content)
        else return resolve([])
    }

    setItem(products){
        localStorage.setItem("products", JSON.stringify(products));
    }

}
class IndexedDB extends Storage{
    constructor(){
        super();
        var openRequest = indexedDB.open('produse', 3);
        openRequest.onupgradeneeded = function(e) {
            var db = e.target.result;
            console.log('running onupgradeneeded');
            if (!db.objectStoreNames.contains('products')) {
                db.createObjectStore('products', {keyPath: 'id'});
            }
            else {
            console.log("Object store products exists");
            }
        };
    };
    
    setItem(produse){
        var DBOpenRequest = indexedDB.open('produse', 3);
        
        DBOpenRequest.onsuccess = function(e) {
            var db = DBOpenRequest.result;
            var transaction = db.transaction(['products'], 'readwrite');
            var objectStore = transaction.objectStore('products');
            
            produse.forEach(function(produs) {
                
                var request = objectStore.put({id : produs.id, value: produs});
                request.onsuccess = function(event) {
                    console.log("Succesfull Insertion")
                };
            });
        }
        DBOpenRequest.onerror = function(e) {
            console.log("Error opening the database for insertion");
        }
    };

    getItem(resolve){
        self = this;

        var DBOpenRequest = indexedDB.open('produse', 3);
        console.log('INSIDE');
        DBOpenRequest.onsuccess = function(e) {
            var db = DBOpenRequest.result;
            var transaction = db.transaction(['products'], 'readwrite');
            var objectStore = transaction.objectStore('products');

            var db_items = [];
            objectStore.openCursor().onsuccess = function(event) {
                var cursor = event.target.result;
                if(cursor) {
                    db_items.push(cursor.value.value)
                    cursor.continue();
                } else {
                    if(db_items.length==0)
                    resolve(db_items);
                    else
                    resolve(JSON.stringify(db_items))   
                    
                }
            };
        }
    }

}

var storage_type=0;//default e pentru localStorage
var myStorage;
function changeStorage(){
    var selected=document.getElementById('storage2').value;
    if(selected=='local')
    {
        storage_type = 0;
    }
    else{
        storage_type = 1;
    }
    showTable();
}

class Product {
    constructor(id, name, quantity) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
    }
}

function buy() {
    
    const worker = new Worker("content/js/worker.js");
    
    worker.postMessage("Button clicked");

    worker.onmessage = function(event) {
    console.log("Message received from worker.js");
    
    var id;
    var promise = new Promise(function(resolve){
        myStorage.getItem(resolve)
    });
    promise.then(function(content){
    if(content.length == 0 ){
        id=0;
    }
    else
    { 
        content = JSON.parse(content);
        id=content[content.length-1].id
    }
    let name = document.getElementById("nume").value;
    let quantity = document.getElementById("cantitate").value;

    if (name.trim() === "" || quantity.trim() === "") {
        alert("Numele si cantitatea sunt obligatorii!");
        event.preventDefault();
        return;
    }
    id++;
    let product = new Product(id, name, quantity);


    let table = document.getElementById("lista_cumparaturi");
    let row = table.insertRow();
    row.innerHTML = `<td>${product.id}</td><td>${product.name}</td><td>${product.quantity}</td>`;

    content.push(product);
    myStorage.setItem(content)

    document.getElementById("nume").value = "";
    document.getElementById("cantitate").value = "";
    event.preventDefault();
    });
};

    event.preventDefault();
}
window.showTable=function show(){

    var table = document.getElementById("lista_cumparaturi");

        if(table){
            let rows = table.getElementsByTagName("tr");
            while(rows.length>1)
            {
                table.deleteRow(1)
            }
        }  

    if (storage_type == 0){
        console.log("Instanta LocalStorage")
        myStorage = new LocalStorage();
    }
    else
    {
        console.log("Instanta IndexedDB");
        myStorage = new IndexedDB();
    }
    var promise = new Promise(function(resolve){
        myStorage.getItem(resolve)
    });
    promise.then(function(products){

    if (products.length!=0)
    {
        products = JSON.parse(products);
    }
    let table = document.getElementById("lista_cumparaturi");
    if (table) {
        for(var i=0;i<products.length;i++)
        {
            let row = table.insertRow();
            row.innerHTML = `<td>${products[i].id}</td><td>${products[i].name}</td><td>${products[i].quantity}</td>`;
        }
        event.preventDefault();
    }   
    });
    
}