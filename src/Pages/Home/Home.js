import React, { Component, Fragment } from 'react';
import 'materialize-css/dist/css/materialize.min.css';

import Tabela from '../../Components/Tabela/Tabela';
import Form from '../../Components/Formulario/Formulario';
import Header from '../../Components/Header/Header';
import PopUp from '../../utils/Popup';

import ApiService from '../../utils/ApiService';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      autores: [],
    }
  }

  removeAutor = id => {
    const {autores} = this.state;

    const autoresAtualizado = autores.filter(autor => {
      return autor.id !== id;
    })

    ApiService.RemoveAutor(id)
    .then(res => {
      if(res.message === 'deleted'){
        this.setState({autores: [...autoresAtualizado]})
        PopUp.exibeMensagem('error', 'Autor removido com sucesso')
      }
    })
    .catch(error => {
      PopUp.exibeMensagem('error', 'Erro com a comunicação com a API ao tentar remover o autor')
    })
  }

  escutadorDeSubmit = dados => {
    const autor = {
      nome: dados.nome,
      livro: dados.livro,
      preco: dados.preco
    } 
    ApiService.CriaAutor(JSON.stringify(autor))
    .then(res => {
      if(res.message === 'success'){
        this.setState({autores: [...this.state.autores, res.data]})
        PopUp.exibeMensagem('success', 'Autor adicionado')
      }
    })
    .catch(error => {
      PopUp.exibeMensagem('error', 'Erro com a comunicação com a API ao tentar criar o autor')
    })
  }

  componentDidMount(){
    ApiService.ListaAutores()
    .then(res => {
      if(res.message === 'success'){
        this.setState({autores: [...this.state.autores, ...res.data]})
      }
    })
    .catch(error => {
      PopUp.exibeMensagem('error', 'Erro com a comunicação com a API ao tentar listar os autores')
    });
  }

  render(){
    const campos = [{titulo: 'Autores', dado: 'nome'}, {titulo: 'Livros', dado: 'livro'}, {titulo: 'Preços', dado: 'preco'}]
    return (
      <Fragment>
        <Header />
        <div className="container">
          <h1>Casa do Código</h1>
          <Form escutadorDeSubmit={this.escutadorDeSubmit} />
          <Tabela campos={campos} dados={this.state.autores} removeDados={this.removeAutor} />
        </div>
      </Fragment>
    );
  }
}

export default App;
