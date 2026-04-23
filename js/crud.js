/*
*Objetivo: Realizar o CRUD de dados referente aos livros
*Data: 22/04/2026
*Autor: Diego Araujo
*Versao: 1.0
API: https://app-livraria-2024-gsc9e3gcdsh2f2b5.brazilsouth-01.azurewebsites.net/v2/livraria/livro'
https://projeto-livraria-latx.onrender.com/v2/livraria/livro/
*/

const botaoSalvar = document.getElementById('salvar')

//Inserir um novo livro
const postLivro = async function() {

    let URL = 'https://projeto-livraria-latx.onrender.com/v2/livraria/livro/'

    let dadosJSON = {}

    //Receber os dados do formulario
    let nomeLivro = document.getElementById('title')
    let desLivro = document.getElementById('subtitle')
    let fotoLivro = document.getElementById('image')
    let valorLivro = document.getElementById('price')

    // //Validacao dos dados
    // if(nomeLivro.value == '' || desLivro.value == '' || fotoLivro.value == '' || valorLivro.value == '') {
    //     alert('Preencha todos os campos para cadastrar um livro')
    // } else {
    //     //Criar o objeto com os dados do livro
    //     let livro = {
    //         title: nomeLivro.value,
    //         subtitle: desLivro.value,
    //         image: fotoLivro.value,
    //         price: valorLivro.value
    //     }

    //Criar o JSON de dados {title: 'nome do livro', subtitle: 'descricao do livro', image: 'url da imagem do livro', price: 'valor do livro'}
    dadosJSON.title     = nomeLivro.value
    dadosJSON.subtitle  = desLivro.value
    dadosJSON.image     = fotoLivro.value
    dadosJSON.price     = valorLivro.value

    console.log(dadosJSON)

    //POST dos dados para API de livros
    try {
        let response = await fetch(URL, {
            method: 'POST',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dadosJSON)
        })

        if(response.status == 201) {
            alert('Livro cadastrado com sucesso!')
        }else{
            alert('Não foi possível cadastrar o livro, tente novamente! Status: ' + response.status)
        }
    } catch (error) {
        console.error('Erro ao enviar dados:', error)
        alert('Erro de rede ou CORS. Verifique o console para detalhes.')
    }
}

//Atualiza um livro existente
const putLivro = async function() {

}

//Excluir um Livro existente
const deleteLivros = async function() {

}

//Retornar todos os livros
const getAllLivros = async function() {
    let URL = 'https://projeto-livraria-latx.onrender.com/v2/livraria/livro/'

    let response = await fetch(URL)

    let dados = await response.json()

    //Recebe o elemento principal para colocar a lista de dados
    let divListDados = document.getElementById('listDados')

    //Criar elementos no HTML
    let divDados = document.createElement('div')

    //Adicionar atributos
    divDados.setAttribute('class', 'linha dados')

    //Associar elementos pai e seus filhos
    divListDados.appendChild(divDados)
}

//Buscar um livro pelo ID
const getByIdLivro = async function() {

}

botaoSalvar.addEventListener('click', function() {
    postLivro()
})