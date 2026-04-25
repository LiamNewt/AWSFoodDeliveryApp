const API_BASE = "https://nxlg8rhz56.execute-api.eu-west-1.amazonaws.com";

async function placeOrder() {
  const name = document.getElementById("name").value;

  const pizza = document.getElementById("itemPizza").value;
  const burger = document.getElementById("itemBurger").value;
  const chicken = document.getElementById("itemChicken").value;
  const kebab = document.getElementById("itemKebab").value;

  let selectedItem = "";

  if (pizza !== "Select") selectedItem = pizza;
  else if (burger !== "Select") selectedItem = burger;
  else if (chicken !== "Select") selectedItem = chicken;
  else if (kebab !== "Select") selectedItem = kebab;

  if (name === "" || selectedItem === "") {
    document.getElementById("orderResult").innerText =
      "Please enter your name and select one item.";
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerName: name,
        item: selectedItem,
      }),
    });

    const data = await response.json();

    document.getElementById("orderResult").innerText =
      `Order placed successfully! Your order number is: ${data.orderId}`;

    document.getElementById("orderNum").value = data.orderId;
  } catch (error) {
    document.getElementById("orderResult").innerText = "Error placing order.";
    console.log(error);
  }
}

async function trackOrder() {
  const orderId = document.getElementById("orderNum").value;

  if (orderId === "") {
    document.getElementById("orderStatus").innerText =
      "Please enter an order number.";
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/order/${orderId}`);
    const data = await response.json();

    if (data.error) {
      document.getElementById("orderStatus").innerText = data.error;
    } else {
      document.getElementById("orderStatus").innerText =
        `Order Status: ${data.status}`;
    }
  } catch (error) {
    document.getElementById("orderStatus").innerText = "Error tracking order.";
    console.log(error);
  }
}
