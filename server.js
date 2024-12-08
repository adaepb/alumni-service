"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const prisma_1 = require("./lib/prisma");
const app = (0, fastify_1.default)();
app.get("/colegios", async (request, reply) => {
    try {
        const { nomecolegio, id, cidade, nrcolegio, orderBy, order } = request.query;
        // Defina a ordenação padrão (orderBy: id, order: asc) caso não seja fornecido
        const sortOrder = order === 'desc' ? 'desc' : 'asc'; // Definindo a direção
        const orderByField = orderBy || 'id'; // Se não passar o orderBy, usa 'id' como padrão
        const colegios = await prisma_1.prisma.colegios.findMany({
            where: {
                ...(nomecolegio && { nomecolegio: { contains: nomecolegio, mode: 'insensitive' } }),
                ...(id && { id: Number(id) }),
                ...(cidade && { cidade: { contains: cidade, mode: 'insensitive' } }),
                ...(nrcolegio && { nrcolegio: { contains: nrcolegio, mode: 'insensitive' } })
            },
            orderBy: {
                [orderByField]: sortOrder // Aplica a ordenação
            }
        });
        console.log(colegios); // Loga os resultados
        return colegios;
    }
    catch (error) {
        console.error(error); // Loga o erro
        return reply.status(500).send({ error: "Erro ao buscar os colégios" });
    }
});
app.listen({ port: 3333 }).then(() => {
    console.log("Server is running on port 3333");
});
