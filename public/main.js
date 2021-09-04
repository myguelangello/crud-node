/* para mostrar o LINK ATIVO na NAVBAR */
/* se usar só document.links daria certo tbm 
  porém incluiria todos as tags "a" do site 
  e não somente as do menu */
let a = document.getElementsByClassName("nav-link");
for (var i = 0; i < a.length; i++) {
  if (a[i].href == document.URL) {
    a[i].className = "nav-link active";
  }
}

/* Adicionando ToolTips - Dicas que aparecem em alguns links importantes */
var tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

/* Exemplo de como mudar a classe de inputs e spans */
/* var input = document.querySelectorAll("td input");
var span = document.querySelectorAll("td span");

for (let index = 0; index < input.length; index++) {
  input[index].classList.remove("hidden");
  input[index].classList.add("show");

  //nav.classList.toggle("show");
}
for (let index = 0; index < span.length; index++) {
  span[index].classList.remove("show");
  span[index].classList.add("hidden");
} */
