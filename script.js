let total = 0;
//get items from json
async function fetchData (){
    const response = await fetch('data.json');
    const data = await response.json();
    populateItems(data);
}
//function to populate items 
function populateItems (items) {

    //items container
    const itemsContainer = document.querySelector('.items');
    itemsContainer.innerHTML = '';
    //loop through data and display each item
    items.forEach(item => {
        
        const itemImage = item.image.desktop;
        const itemCategory = item.category;
        const itemName = item.name;
        const itemPrice = '$'+ item.price;
        //item view
        const itemView = `<div class="item-image">
        <img src="${itemImage}" alt="">
    </div>
    <div class="add-to-cart">
        <img src="./assets/images/icon-add-to-cart.svg" alt="add to cart">
        <span class="add-text">Add to Cart</span>
        <div class="increment">
          <span class="min">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 2">
              <path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/></svg>
          </span>
          <span class="counter">1</span>
          <span class="max">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
              <path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/>
            </svg>
          </span>
        </div>
    </div>
    <div class="item-infos">
        <span class="category">${itemCategory}</span>
        <span class="name">${itemName}</span>
        <span class="item-price">
          <span class="price">${itemPrice}</span>
        </span>
    </div>`;
        const div = document.createElement('div');
        div.classList.add('item');
        div.innerHTML = itemView;
        //append view to items container
        itemsContainer.appendChild(div);                  
    });
}
//add to cart
function addToCart (event){
    const addbutton = event.target;
    const cart = document.querySelector('.cart');
    const cartEmpty = document.querySelector('.cart-empty');
    if(addbutton.className === 'add-text'){
        console.log('add clicked');
        console.log(event.target.parentElement.querySelector('.increment'));
        //display cart and hide cart empty
        if(cart.style.display === 'none' || cart.style.display === ''){
            displayCart();
            displayEncrement(event.target.parentElement.querySelector('.increment'));
            hideAddToCart(event.target.parentElement.querySelector('img'),event.target.parentElement.querySelector('span.add-text'));
            addCartItem(event.target.parentElement.parentElement,cart);
            plusMinus(event.target.parentElement.querySelector('.increment'),event.target.parentElement.parentElement,cart);
            console.log(event.target.parentElement.parentElement);
            totalCalc(cart);
        }else
        //if cart is already displayed
        if(cart.style.display === 'flex'){
            //hide this add cart and display encrement
            displayEncrement(event.target.parentElement.querySelector('.increment'));
            hideAddToCart(event.target.parentElement.querySelector('img'),event.target.parentElement.querySelector('span.add-text'));
            addCartItem(event.target.parentElement.parentElement,cart);
            plusMinus(event.target.parentElement.querySelector('.increment'),event.target.parentElement.parentElement,cart);
            console.log(event.target.parentElement.parentElement);
            totalCalc(cart);
        }
    }
}
//display the cart
function displayCart(){
    const cart = document.querySelector('.cart');
    const cartEmpty = document.querySelector('.cart-empty');
    cart.style.display = 'flex';
    cartEmpty.style.display = 'none';
    console.log('cart-opend');
}
//display encrement
function displayEncrement(encrement){
    encrement.style.display = 'flex';
}
//hide add to card
function hideAddToCart(img,text){
    img.style.display = 'none';
    text.style.display = 'none';
}
//increment and decrement item order number
function plusMinus(increment,item,cart){
    let counter = 1;
    increment.querySelector('.max').addEventListener('click', ()=>{
        console.log('clicked+');
        counter++;
    increment.querySelector('.counter').textContent = counter;
    //increment the order number on cart 
    cart.querySelector('.cart-items').querySelectorAll('.cart-item').forEach(cartItem => {
        if(item.querySelector('.item-infos .name').textContent === cartItem.querySelector('.cart-item-title').textContent){
            cartItem.querySelector('.cart-item-infos .item-number').textContent = counter + 'x';
            cartItem.querySelector('.cart-item-infos .sub-total').textContent='$' +  parseFloat(item.querySelector('.item-infos .item-price .price').textContent.substr(1,item.querySelector('.item-infos .item-price .price').textContent.length)).toFixed(2) * counter;
            // totalCalc(cart);
        }
    });

    });
    increment.querySelector('.min').addEventListener('click', ()=>{
        if(counter === 1){
            increment.querySelector('.counter').textContent = counter;
            // totalCalc(cart);
            
        }else{
            counter--;
            increment.querySelector('.counter').textContent = counter;
            console.log('clicked-');
            //decrement the order number on cart 
            cart.querySelector('.cart-items').querySelectorAll('.cart-item').forEach( cartItem =>{
        if(item.querySelector('.item-infos .name').textContent === cartItem.querySelector('.cart-item-title').textContent){
            cartItem.querySelector('.cart-item-infos .item-number').textContent = counter + 'x';
            cartItem.querySelector('.cart-item-infos .sub-total').textContent='$' +  parseFloat(item.querySelector('.item-infos .item-price .price').textContent.substr(1,item.querySelector('.item-infos .item-price .price').textContent.length)).toFixed(2) * counter;
            // totalCalc(cart);
        }
    });
        }
    
    });
}
//add the item infos to the cart
function addCartItem(item,cart){
    //get the item details
    const itemTitle = item.querySelector('.item-infos .name').textContent;
    const orderNumber = item.querySelector('.add-to-cart .increment .counter').textContent;
    const itemPrice = item.querySelector(' .item-infos .item-price .price').textContent;
    //item view
    const cartItemView = `<span class="cart-item-title">${itemTitle}</span>
    <span class="remove-item"><img src="./assets/images/icon-remove-item.svg" alt="remove item"></span>
    <div class="cart-item-infos">
      <span class="item-number">${orderNumber}x</span>
      <span class="unit-price">
        <span>@</span>
        <span>${itemPrice}</span>
      </span>
      <span class="sub-total">$${parseFloat(itemPrice.substr(1,itemPrice.lenght) * orderNumber).toFixed(2)}</span>
    </div>`;
    const div =  document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = cartItemView;
    cart.querySelector('.cart-items').appendChild(div);
}
//total items
function totalCalc(cart){
    let subTotal = 0;
    const totalOut = cart.querySelector('.order-total .total');
    cart.querySelector('.cart-items').querySelectorAll('.cart-item').forEach(cartItem => {
        let subTotal = parseFloat(cartItem.querySelector('.sub-total').textContent.slice(1));
        console.log(subTotal,typeof subTotal);
        total = total + subTotal;
    });
    totalOut.textContent = '$' + total;
}
//attach eventListeners
function attacheEL (){
    //items
    const items = document.querySelector('.items');
    items.addEventListener('click', addToCart);
}
//dom event
document.addEventListener('DOMContentLoaded', function (e){
    fetchData();
    attacheEL();
});


