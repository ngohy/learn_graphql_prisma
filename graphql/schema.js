// nơi chứa những khai báo đối tượng (giống với thư mục model) của graphql

const { buildSchema } = require('graphql');

const graphqlSchema = buildSchema(`
    type User {
        user_id: ID
        full_name: String
        email: String
        pass_word: String
    }
    type Food_Type {
        type_id: Int
        type_name: String
        food: [Food]
    }

    type Food {
        food_id: ID
        food_name: String
        image: String
        price: Int
        desc: String
        type_id: Int
        food_type: Food_Type
    }
    
    type Message {
        data: User
        mess: String
    }

    type RootQuery {
        getUser: [User]
        getFood: [Food]
        getTypeFood: [Food_Type]
    }

    type RootMutation{
        createUser(full_name: String, email: String, pass_word: String):Message
    }
    
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);

module.exports = graphqlSchema;