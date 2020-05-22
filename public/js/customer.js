const Templates = {};
async function render(templateName, data) {
  if (!Templates[templateName]) {
    const str = await (await fetch(`/templates/${templateName}.hbs`)).text();
    Templates[templateName] = Handlebars.compile(str);
  }

  return Templates[templateName](data);
}


document.body.addEventListener('click', async (event) => {
  if (event.target.className === 'deleteSkill'){
    event.preventDefault();
    console.log(event.target.parentNode.id);
    
    const result = await (
      await fetch(`/customer`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: event.target.parentNode.id
        }),
      })
    ).json();
    event.target.parentNode.remove();
  }


    console.log(result);
    
  }
})

document.getElementById('selectCategory').addEventListener('change',async (event) => {
  const result = await (
    await fetch(`/customer/skills/${event.target.value}`,)
  ).json();
  // console.log(result);
document.getElementById('selectSkill').innerHTML = await render('customerSelect', { skills: result.skills });

})