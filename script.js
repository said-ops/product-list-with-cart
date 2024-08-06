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
fetchData();


