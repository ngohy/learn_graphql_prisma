const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const graphqlResolver = {

    //tên hàm và kiểu dữ liệu trả về phải giống với bên schema
    getUser: async () => {
        let lstUser = await prisma.user.findMany();
        return lstUser;
    },
    getFood: async () => {
        let lstFood = await prisma.food.findMany({
            include: {
                food_type: true
            }
        });

        return lstFood;
    },
    getTypeFood: async () => {
        let lstFoodType = await prisma.food_type.findMany({
            include: {
                food: true
            }
        });

        return lstFoodType;

    },

    createUser: async (args) => {
        try {
            console.log(args);
            let { full_name, email, pass_word } = args;
            let checkUser = await prisma.user.findFirst({
                where: {
                    email
                }
            })
            if (checkUser) {
                return { data: "", mess: "Email đã tồn tại" };
            } else {
                let result = await prisma.user.create({
                    data: { full_name, email, pass_word }
                })
                return { data: result, mess: "Thêm thành công !" };
            }
        } catch (err) {
            return err
        }
    }
}

module.exports = graphqlResolver;