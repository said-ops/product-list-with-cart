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
    const itemImage = event.target.parentElement.parentElement.querySelector('.item-image img');
    if(addbutton.className === 'add-text'){
        console.log('add clicked');
        console.log(event.target.parentElement.querySelector('.increment'));
        //display cart and hide cart empty
        if(cart.style.display === 'none' || cart.style.display === ''){
            itemImage.classList.add('add-border');
            displayCart();
            displayEncrement(event.target.parentElement.querySelector('.increment'));
            hideAddToCart(event.target.parentElement.querySelector('img'),event.target.parentElement.querySelector('span.add-text'));
            addCartItem(event.target.parentElement.parentElement,cart);
            plusMinus(event.target.parentElement.querySelector('.increment'),event.target.parentElement.parentElement,cart);
            console.log(event.target.parentElement.parentElement);
            totalCalc(cart);
            cartItemsNumber(cart);
            deleteCartItem(cart,event.target.parentElement.querySelector('img'),event.target.parentElement.querySelector('span.add-text'),event.target.parentElement.querySelector('.increment'),itemImage);
            cart.querySelector('button.confirm').addEventListener('click',()=>{
                confirmOrder(cart);
                console.log('confirm order');
               
                
            });
            document.querySelector('.confirmed .new').addEventListener('click',()=>{
                startNewOrder(cart,itemImage);
                console.log('new order');
            });
           
        }else
        //if cart is already displayed
        if(cart.style.display === 'flex'){
            //hide this add cart and display encrement
            itemImage.classList.add('add-border');
            displayEncrement(event.target.parentElement.querySelector('.increment'));
            hideAddToCart(event.target.parentElement.querySelector('img'),event.target.parentElement.querySelector('span.add-text'));
            addCartItem(event.target.parentElement.parentElement,cart);
            plusMinus(event.target.parentElement.querySelector('.increment'),event.target.parentElement.parentElement,cart);
            console.log(event.target.parentElement.parentElement);
            totalCalc(cart);
            cartItemsNumber(cart);
            deleteCartItem(cart,event.target.parentElement.querySelector('img'),event.target.parentElement.querySelector('span.add-text'),event.target.parentElement.querySelector('.increment'),itemImage);
            document.querySelector('.confirmed .new').addEventListener('click',()=>{
                startNewOrder(cart,itemImage);
                console.log('new order');
            });
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
//hide cart
function hideCart(){
    const cart = document.querySelector('.cart');
    const cartEmpty = document.querySelector('.cart-empty');
    cart.style.display = 'none';
    cartEmpty.style.display = 'flex';
}
//display encrement
function displayEncrement(encrement){
    encrement.style.display = 'flex';
}
//hide increment
function hideEncrement(encrement){
    encrement.style.display = 'none';
}
//hide add to card
function hideAddToCart(img,text){
    img.style.display = 'none';
    text.style.display = 'none';
}
function displayAddToCart(img,text){
    img.style.display = 'initial';
    text.style.display = 'initial';
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
            totalCalc(cart);
            cartItemsNumber(cart);
        }
    });

    });
    increment.querySelector('.min').addEventListener('click', ()=>{
        if(counter === 1){
            increment.querySelector('.counter').textContent = counter;
            totalCalc(cart);
            cartItemsNumber(cart);
            
        }else{
            counter--;
            increment.querySelector('.counter').textContent = counter;
            console.log('clicked-');
            //decrement the order number on cart 
            cart.querySelector('.cart-items').querySelectorAll('.cart-item').forEach( cartItem =>{
        if(item.querySelector('.item-infos .name').textContent === cartItem.querySelector('.cart-item-title').textContent){
            cartItem.querySelector('.cart-item-infos .item-number').textContent = counter + 'x';
            cartItem.querySelector('.cart-item-infos .sub-total').textContent='$' +  parseFloat(item.querySelector('.item-infos .item-price .price').textContent.substr(1,item.querySelector('.item-infos .item-price .price').textContent.length)).toFixed(2) * counter;
            totalCalc(cart);
            cartItemsNumber(cart);
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
         subTotal += parseFloat(cartItem.querySelector('.sub-total').textContent.slice(1)); 
    });
    totalOut.textContent = '$' + subTotal;
}
//number of items in the cart
function cartItemsNumber(cart){
    let count = 0;
    const itemTotal = cart.querySelector('.cart-title span');
    cart.querySelector('.cart-items').querySelectorAll('.cart-item').forEach( cartItem => {
        count += parseFloat(cartItem.querySelector('.cart-item-infos .item-number').textContent.slice(0,cartItem.querySelector('.cart-item-infos .item-number').textContent.length-1));
        
    });
    console.log(count);
    itemTotal.textContent = count;
    if(count === 0){
        hideCart();
    }
}
//delete cart items
function deleteCartItem(cart,img,text,encrement,itemImg){
cart.querySelectorAll('.remove-item').forEach(icon => {
    icon.addEventListener('click', ()=>{
        icon.parentElement.parentElement.removeChild(icon.parentElement);
        displayAddToCart(img,text);
        hideEncrement(encrement);
        totalCalc(cart);
        cartItemsNumber(cart);
        itemImg.classList.remove('add-border');
        
    }); 
});
}
//confirm order hundle
async function confirmOrder(cart){
    const response = await fetch('data.json');
    const data = await response.json();
    const total = cart.querySelector('.total').textContent;
    const items = document.querySelector('.confirmed-items');
      items.innerHTML='';
    cart.querySelectorAll('.cart-item').forEach(cartItem=>{
        const itemName = cartItem.querySelector('.cart-item-title').textContent;
        const itemCount = cartItem.querySelector('.item-number').textContent;
        
        const itemPrice = cartItem.querySelector('.unit-price').textContent.slice(2);
        const subTotal = cartItem.querySelector('.sub-total').textContent;
        
        //get data to get the thumbnail
        let itemThumb = '';
        data.forEach(item => {
            if(itemName === item.name){
              itemThumb = item.image.thumbnail;
            }
        });
        //confirmed view
        const view = `<div class="thumbnail">
        <img src="${itemThumb}" alt="${itemName}">
      </div>
      <div class="confirmed-infos">
        <span class="con-item-name">${itemName}</span>
        <span class="con-subtotal">${subTotal}</span>
        <span class="con-unit">
          <span class="con-number">${itemCount}</span>
          <span class="con-price">${itemPrice}</span>
        </span>
      </div>
    `;
      //display confirmed cart and overlay
      const overlay = document.querySelector('.overlay');
      const confirmed = document.querySelector('.confirmed');
      confirmed.style.display = 'flex';
      overlay.style.display ='initial';
      //create confirmed-item
      const div = document.createElement('div');
      div.classList.add('confirmed-item');
      div.innerHTML = view;
      //append div to confirmed-items
      items.appendChild(div);
    });
    //total view
    const totalOrder = document.createElement('div');
    totalOrder.classList.add('con-order');
    totalOrder.innerHTML =`<span>order total</span>
    <span class="con-total">${total}</span>`;
    items.appendChild(totalOrder);
}
//start new order hundler
function startNewOrder(cart,itemImage){
    //remove all items from confirmed cart and hide it 
    const overlay = document.querySelector('.overlay');
    const confirmed = document.querySelector('.confirmed');
    confirmed.querySelector('.confirmed-items').innerHTML = '';
    confirmed.style.display='none';
    overlay.style.display='none';
    //clear cart and hide it
    cart.querySelector('.cart-items').innerHTML ='';
    cart.querySelector('.total').innerHTML='';
    cart.querySelector('.cart-title span').textContent = '0';
    cart.style.display = 'none';
    document.querySelector('.cart-empty').style.display='flex';
    
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
