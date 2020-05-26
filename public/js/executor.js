const Templates = {};
async function render(templateName, data) {
  if (!Templates[templateName]) {
    const str = await (await fetch(`/templates/${templateName}.hbs`)).text();
    Templates[templateName] = Handlebars.compile(str);
  }
  return Templates[templateName](data);
}

document.body.addEventListener("click", async (event) => {
  if (event.target.className === "deleteSkill") {
    event.preventDefault();

    console.log(event.target.parentElement.parentElement);

    const categoryDiv = event.target.parentElement.parentElement;
    event.preventDefault();
    const resultDelete = await (
      await fetch(`/executor`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: event.target.parentElement.id,
        }),
      })
    ).json();
    event.target.parentElement.remove();

    if (categoryDiv.getElementsByClassName("skill").length === 0) {
      categoryDiv.remove();
    }
  }

  if (event.target.className === "deleteMyOrder") {
    console.log(event.target.parentElement.id);
    const order = event.target.parentElement;

    const resultDelOrder = await (
      await fetch(`/executor/order`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: order.id,
        }),
      })
    ).json();
    if (resultDelOrder.status === 200) {
      order.remove();
    }
  }

  if (event.target.id === "doResponse") {
    const id = event.target.parentNode.id;
    const alert = document.getElementById(`alert${id}`);
    console.log(alert);
    const resultDoResp = await (
      await fetch(`/executor/doResponse/${id}`)
    ).json();
    if (resultDoResp.status === 200) {
      alert.innerHTML = "Отклик отправлен!";
      setTimeout(() => event.target.parentElement.remove(), 1000);
    } else {
      console.log(alert);
      alert.innerHTML = "Уже откликнулся!";
    }
  }

  //>>>>>>>>>>>>>>>>>>>>>>>>customer>>>>>>>>>>>>>>>

  if (event.target.className === "deleteOrderCustomer") {
    event.preventDefault();
    console.log(event.target.parentElement.id);
    const order = event.target.parentElement;
    const resultDelOrder = await (
      await fetch(`/customer`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: order.id,
        }),
      })
    ).json();
    if (resultDelOrder.status === 200) {
      order.remove();
    }
  }

  if (event.target.className === "editOrderCustomer") {
    event.preventDefault();
    console.log(event.target.parentElement.id);
    const orderToEdit = event.target.parentElement;
    const result = await (
      await fetch(`/customer/editOrder/${orderToEdit.id}`,)
    ).json();
    if (result.status === 200) {
      console.log(result)
      const {order,category,firstCat} = result;
      orderToEdit.innerHTML = await render('editOrder',{order,category,firstCat})
      
    }
  }

  if (event.target.className === "editOk") {
    event.preventDefault();    
    const editedOrder = event.target.parentElement;
    const orderId = editedOrder.id;
    console.log(orderId);
    
    const expirationDate = document.getElementById(`expirationDate${orderId}`).value;
    const title = document.getElementById(`title${orderId}`).value;
    const description = document.getElementById(`description${orderId}`).value;
    const  skills = document.getElementById(`selectSkill`).value;
    const  categories = document.getElementById(`selectCategory`).value;
    const city = document.getElementById(`city${orderId}`).value;
    console.log(expirationDate,title,description,skills,city);
    
    console.log(event.target.parentElement.id);
    const resulteditOk = await (
      await fetch(`/customer/editOrder`,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          expirationDate,
          title,
          description,
          skills,
          city,
          orderId,
          categories,
        }),
      })
    ).json();
    if (resulteditOk.status === 200) {
      
      editedOrder.innerHTML = await render('editedOrder',{order: resulteditOk.order})
      
    }
  }

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

});

document
  .getElementById("selectCategory")
  .addEventListener("change", async (event) => {
    const result = await (
      await fetch(`/executor/skills/${event.target.value}`)
    ).json();
    document.getElementById(
      "selectSkill"
    ).innerHTML = await render("skillsSelect", { skills: result.skills });
  });

document.addSkillForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log(event.target.skill.value);

  const skill = event.target.skill.value;
  const category = event.target.category.value;
  const price = event.target.price.value;

  const resultAdd = await (
    await fetch(`/executor`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        skillId: skill,
        categoryId: category,
        price: price,
      }),
    })
  ).json();

  if (resultAdd.status === 200) {
    console.log(resultAdd.skill.category._id);
    const skillsList = document.getElementById("skillsList");
    let category = document.getElementById(resultAdd.skill.category._id);

    if (!category) {
      skillsList.innerHTML += await render("addCategory", {
        skill: resultAdd.skill,
      });
    }
    category = document.getElementById(resultAdd.skill.category._id);
    category.innerHTML += await render("addSkill", {
      skill: resultAdd.skill,
      price: resultAdd.price,
    });
    event.target.price.value = "";
  }
});
