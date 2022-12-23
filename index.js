const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static(".")); 

app.listen(8080);
//thư hàm xử lý khởi tạo UI và kết nối của graphql
const { graphqlHTTP } = require('express-graphql');
// schema
const graphqlSchema = require('./graphql/schema');
// resolver
const graphqlResolver = require('./graphql/resolver');


app.use("/graphql", graphqlHTTP({
    schema: graphqlSchema,  // nơi khai báo đối tượng của graqhql
    rootValue: graphqlResolver,  // nhận vào các hàm xử lý chức năng, logic của graphql
    graphiql: true
}))

//1 cài đặt prisma
//2 mở docker kết CSDL
//3 cấu hình kết nối CSDL từ prisma đến database
//4 gõ lệnh prisma db pull để lấy table về
//5 setup đối tượng và hàm trong schema để khớp với đối prisma
//6 tạo các hàm resolver để xử lý

