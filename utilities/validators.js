module.exports.validateRegisterInput = (
    nome,
    sobrenome,
    email,
    dataDeNascimento,
    senha,
    confirmaSenha,

)=>{
    const errors = {}
    if (nome.trim() === ''){
        errors.nome = "nome em branco"
    }
    if (sobrenome.trim() === ''){
        errors.sobrenome = "sobrenome em branco"
    }
    if (email.trim() === ''){
        errors.email = "email em branco"
    } 
    if (dataDeNascimento.trim() === ''){
        errors.dataDeNascimento = "Data de nascimento em branco"
    }
    if (senha.trim() === ''){
        errors.senha = "senha em branco"
    }
    if (confirmaSenha.trim() === ''){
        errors.confirmaSenha = "confirme a senha"
    }
}