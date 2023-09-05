// console.log('Hello World')
var updateBtns = document.getElementsByClassName('update-cart')

for(var i=0; i < updateBtns.length; i++) {
	updateBtns[i].addEventListener('click', function() {
		var productId = this.dataset.product
		var action = this.dataset.action
		console.log('productId:', productId, 'action:', action)

		console.log('USER:', user)
		if(user === 'AnonymousUser'){
			// console.log('user not logged in')
			addCookieItem(productId, action)
		}else{
			updateUserOrder(productId, action)
		}
	})
}

function addCookieItem(productId, action) {
	console.log('not logged in..')
	if (action == 'add'){
		if (cart[productId] == undefined){
		cart[productId] = {'quantity':1}

		}else{
			cart[productId]['quantity'] += 1
		}
	}
	if (action == 'remove'){
		cart[productId]['quantity'] -= 1

		if (cart[productId]['quantity'] <= 0){
			console.log('Item should be deleted')
			delete cart[productId];
		}
	}

	console.log('Cart:', cart)
	document.cookie = 'cart=' + JSON.stringify(cart) + ";domain=;path=/"
	location.reload()
	
	// cart = {
	// 	1:{'quantity':4},
	// 	4:{'quantity':1},
	// 	6:{'quantity':2},
	// }

}

function updateUserOrder(productId, action){
	console.log('user is loged in,sending data..')
	var url = '/update_item/'
	console.log('URL:', url)
	fetch(url, {
		method: 'POST',
		headers:{
			'Content-Type':'application/json',
			'X-CSRFToken':csrftoken,
		},
		body:JSON.stringify({'productId': productId, 'action': action})
	})

	.then((response) =>{
		return response.json()
	})
	.then((data) =>{
		console.log('data:', data)
		location.reload()
	})
}




// var updateBtns = document.getElementsByClassName('update-cart')

// for (i = 0; i < updateBtns.length; i++) {
// 	updateBtns[i].addEventListener('click', function(){
// 		var productId = this.dataset.product
// 		var action = this.dataset.action
// 		console.log('productId:', productId, 'Action:', action)
// 		console.log('USER:', user)

// 		if (user == 'AnonymousUser'){
// 			addCookieItem(productId, action)
// 		}else{
// 			updateUserOrder(productId, action)
// 		}
// 	})
// }

// function updateUserOrder(productId, action){
// 	console.log('User is authenticated, sending data...')

// 		var url = '/update_item/'

// 		fetch(url, {
// 			method:'POST',
// 			headers:{
// 				'Content-Type':'application/json',
// 				'X-CSRFToken':csrftoken,
// 			}, 
// 			body:JSON.stringify({'productId':productId, 'action':action})
// 		})
// 		.then((response) => {
// 		   return response.json();
// 		})
// 		.then((data) => {
// 		    location.reload()
// 		});
// }

// function addCookieItem(productId, action){
// 	console.log('User is not authenticated')

// 	if (action == 'add'){
// 		if (cart[productId] == undefined){
// 		cart[productId] = {'quantity':1}

// 		}else{
// 			cart[productId]['quantity'] += 1
// 		}
// 	}

// 	if (action == 'remove'){
// 		cart[productId]['quantity'] -= 1

// 		if (cart[productId]['quantity'] <= 0){
// 			console.log('Item should be deleted')
// 			delete cart[productId];
// 		}
// 	}
// 	console.log('CART:', cart)
// 	document.cookie ='cart=' + JSON.stringify(cart) + ";domain=;path=/"
	
// 	location.reload()
// }