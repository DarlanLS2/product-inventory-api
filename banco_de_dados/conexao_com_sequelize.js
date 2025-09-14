import sequelize, { Sequelize, DataTypes} from "sequelize";

// Criando a conexão com o banco
const conexaoSequelize = new Sequelize("loja", "root", "", {
    host: "localhost",
    dialect: "mysql",
});

// Verifica se a conexão com banco foi bem sucedida
conexaoSequelize.authenticate()
  .then(() => {
    console.log("------------------------")
    console.log('Conexão com banco: ok');
  })
  .catch(err => {
    console.error('Conexão com banco:' + err);
  });


// Cria o model produto
const Product = conexaoSequelize.define( "produto", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preco: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    }
})


// Product.sync({ force: true }); // roda este codigo so uma vez se nao vai ficar criando novas tabelas 

// exportando os models das tabelas
export {Product};
