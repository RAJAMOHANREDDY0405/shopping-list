
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

const li = document.createElement('li');

li.appendChild(document.createTextNode(newitem));

const button = createbutton("remove-item btn-link text-red");
li.appendChild(button);

itemlist.appendChild(li);

iteminput.value = ' ';

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

function removeitem(e){
   console.log(e.currentTarget); 
}
function clearal(e)
{
window.alert('do you want to clear all?')    
const ul = document.querySelector('.item-list');
const li = document.querySelectorAll('li');
li.forEach((item)=>item.remove());
document.getElementById('filter').remove();
}

const itemform = document.getElementById('item-form');
const iteminput = document.getElementById('item-input');
const itemlist = document.getElementById('item-list');
itemform.addEventListener('submit',additem);
iteminput.addEventListener('focus',onfocus);
iteminput.addEventListener('blur',onblur);







