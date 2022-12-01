const apiLinkIBGE = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";
const uf = document.getElementById("uf");
const cidade = document.getElementById("cidade");
const regiao = document.getElementById("regiao");
const telefone = document.getElementById("telefone");


uf.addEventListener("change", function(){
  fetch(apiLinkIBGE + "/" + uf.value)
    .then(resp =>  resp.json())
    .then(json => {
        regiao.value = json.regiao.nome;
      })
    })

uf.addEventListener("change", function(){
  fetch(apiLinkIBGE + "/" + uf.value + "/municipios")
    .then(resp =>  resp.json())
    .then(json => {
      cidade.innerHTML = "";
      json.forEach( function (municipio){
        cidade.innerHTML += "<option value=" + municipio.id +">" + municipio.nome + "</option>";
      })
    })
})



let cadastros = new Array();

function cadastra_novo(){
  const formcad = document.getElementById("formulario");
  const formData = new FormData(formcad);    // cria novo obejto de formulário com dados de HTML
  console.log(formcad);
  formData.append("nomeEstado",document.getElementById("uf").options[document.getElementById("uf").selectedIndex].text);
  formData.append("nomeCidade",document.getElementById("cidade").options[document.getElementById("cidade").selectedIndex].text);
  formData.append("nomeReg",document.getElementById("regiao").value);
  

  const formObj = Object.fromEntries(formData);
  console.log(formObj);



  cadastros.push(formObj);
 // localStorage.setItem("cadastro", JSON.stringify(cadastros));
}

function preencheTabela(){
  // if(localStorage.hasOwnProperty("cadastro")){
  //     cadastros = JSON.parse(localStorage.getItem("cadastro"));
  // }

    document.getElementById("cadastros").innerHTML = 
    `<tr>
        <th class="tituloColuna">Nome </th>
        <th class="tituloColuna">Telefone </th>
        <th class="tituloColuna">Email </th>
        <th class="tituloColuna">Idade </th>
        <th class="tituloColuna">Estado </th>
        <th class="tituloColuna">Região </th>
        <th class="tituloColuna">Cidade </th>
        <th class="tituloColuna">Gênero </th>
        <th class="tituloColuna"></th>
    </tr>`;

    let index = 0;

    cadastros.forEach( function(cadastro){
        document.getElementById("cadastros").innerHTML +=
        `<tr>
        <td>${cadastro.nome}</td>
        <td>${cadastro.telefone}</td>
        <td>${cadastro.email}</td>
        <td>${cadastro.idade}</td>
        <td>${cadastro.nomeEstado}</td>
        <td>${cadastro.nomeReg}</td>
        <td>${cadastro.nomeCidade}</td>
        <td>${cadastro.flexRadioDefault}</td>
        </tr>`;
        index++;        
      })
}

document.getElementById("cadnovo").addEventListener("click", function(event){
    event.preventDefault();
    cadastra_novo();
    preencheTabela();
})

window.onload = function(){     // após baixar a página
  fetch(apiLinkIBGE)            // baixa lista de estados
    .then(resp => resp.json())  //processa arquivo baixado com JSON
    .then (json => {
      json.forEach( function (estado){
        uf.innerHTML += "<option value=" + estado.id +">" + estado.nome + "</option>";
      })
    })
}
