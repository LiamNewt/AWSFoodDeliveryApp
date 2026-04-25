const API="";

function getSelectedItem() {
    const pizza = document.getElementById("itemPizza").value;
    const burger = document.getElementById("itemBurger").value;
    const chicken = document.getElementById("itemChicken").value;
    const kebab = document.getElementById("itemKebab").value;

    return pizza || burger || chicken || kebab; //retunr first selected item
}

async function placeOrder() {
    const customerName = document.getElementById("name").value;
    const item = getSelectedItem();

    if(!customerName || !item){
        alert("Please enter all required fields");
    return;
    }

    try {
    const response = await fetch(`${API}/order`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
    customerName: customerName,
    item: item
    })
});

if (!response.ok){
    throw new Error("Server Error");
}

const data= await response.json();

document.getElementById("orderResult").innerText = `Your order has been placed, thank you! Order Number: ${data.orderId},  Order Status: ${data.status}`;

} catch (error){
    console.error(error);
    alert("There was an error placing your order!");
}
}

async function trackOrder() {
    const orderId =document.getElementById("orderNum").value;

    if(!orderId){
        alert("Please enter your order number.");
        return;
    }

    try{
        const response=await fetch(`${API}/order/${orderId}`);
        const data =await response.json();
        document.getElementById("orderStatus").innerText = `Order Status: ${data.status}`;
    }
    
    catch (error){
        console.error(error);
        alert("Error tracking your order.");
    }
    
}


