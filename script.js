
function onfocus(e)
{
    // console.log(e.target);
    e.target.style.outlineStyle = 'solid';
    e.target.style.outlineWidth = '2px';
    e.target.style.outlineColor = 'grey';
}


function additem(e)

{
e.preventDefault();
//validate input;
const newitem = iteminput.value;
if(newitem === '')
{
    alert('please add an item');
    return;
}
//create list item

addElementToDom(newitem);

//add item to local storage

addItemToStorage(newitem);

iteminput.value = ' ';
checkUI();
}
function addElementToDom(value)
{

const li = document.createElement('li');

li.appendChild(document.createTextNode(value));

const button = createbutton("remove-item btn-link text-red");
li.appendChild(button);

itemlist.appendChild(li);

}
function createbutton(classes)
{
    const button = document.createElement('button');
    const itag = createitag('fa-solid fa-xmark');
    button.className = classes;
    button.appendChild(itag);
    return button;
}
function createitag(classes)
{
   const itag =  document.createElement('i');
   itag.className = classes;
   return itag;
}
function onblur (e)
{
e.target.style.outlineStyle = 'none';
}

function onClickItem(e){
   const target = e.target.parentElement;
   const className = e.target.parentElement.className;
   
   if (className === 'remove-item btn-link text-red')
   {
    removeitem(target.parentElement);
   }
   else
   {
      console.log(1);
   }


}

function removeitem(item)
    {
     if (confirm('Are you sure to remove '+item.textContent+'?')){
        item.remove();
     } 
     // remove from local storage as well 
     
     removeItemfromStorage(item.textContent);
   checkUI();

}
function removeItemfromStorage(text)
{
  let itemsFromStorage = getItemFromStorage();
  console.log(itemsFromStorage);
  itemsFromStorage = itemsFromStorage.filter(function(i){
    return i!=text;
  })

  localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

function clearal(e)
{
if (confirm('Are you sure to clearall')){
while(itemlist.firstChild)
{
    itemlist.firstChild.remove();
}
localStorage.removeItem('items');
}

checkUI();

}

function checkUI()
{
    const items = document.querySelectorAll('li');
    console.log(items);
    if (items.length==0)
    {
      clearbtn.style.display = 'none';  
      filter.style.display = 'none';    
    }  
    else {
        clearbtn.style.display = 'block';  
        filter.style.display = 'block';     
    }  
  
}

function filteritems(e){
    console.log(e.target.value);
    const filterText = e.target.value;

        document.querySelectorAll('li').forEach(function(items){
            if(!items.innerText.includes(filterText))
            {
               items.style.display = 'none'
            }
            else{
                items.style.display = 'flex'  
            }
    })    
}

function addItemToStorage(value){
    let itemsFromStorage = getItemFromStorage();
    
    //adding items to array
    itemsFromStorage.push(value);
    //convert to json string and set to local storage
    localStorage.setItem('items' ,JSON.stringify(itemsFromStorage));
}

function getItemFromStorage(){
    let itemsFromStorage;
    if(localStorage.getItem('items')===null){
        itemsFromStorage = [];
    }
    else{
        itemsFromStorage = JSON.parse( localStorage.getItem('items'));
    } 

    return itemsFromStorage;
}

function displayitems(){
    const itemsFromStorage = getItemFromStorage();
    itemsFromStorage.forEach(function(items){
        addElementToDom(items);
    })
    checkUI();
    // console.log(itemsFromStorage);   
}

const itemform = document.getElementById('item-form');
const iteminput = document.getElementById('item-input');
const itemlist = document.getElementById('item-list');
const clearbtn = document.getElementById('clear');
const filter = document.getElementById('filter');
itemform.addEventListener('submit',additem);
iteminput.addEventListener('focus',onfocus);
iteminput.addEventListener('blur',onblur);
itemlist.addEventListener('click', onClickItem);
clearbtn.addEventListener('click',clearal);
filter.addEventListener('input',filteritems);
document.addEventListener('DOMContentLoaded', displayitems);

checkUI();







