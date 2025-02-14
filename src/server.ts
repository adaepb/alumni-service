import fastify from "fastify";
import { prisma } from "./lib/prisma";
import { FastifyRequest } from 'fastify';

// Definindo os tipos para os parâmetros da query
interface ColegiosQuery {
    nomecolegio?: string;
    id?: string;
    cidade?: string;
    nrcolegio?: string;
    orderBy?: string;
    order?: 'asc' | 'desc';
}

const app = fastify();

app.get("/colegios", async (request: FastifyRequest<{ Querystring: ColegiosQuery }>, reply) => {
    try {
        const { nomecolegio, id, cidade, nrcolegio, orderBy, order } = request.query;

        // Defina a ordenação padrão (orderBy: id, order: asc) caso não seja fornecido
        const sortOrder: 'asc' | 'desc' = order === 'desc' ? 'desc' : 'asc'; // Definindo a direção
        const orderByField = orderBy || 'id'; // Se não passar o orderBy, usa 'id' como padrão

        const colegios = await prisma.colegios.findMany({
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
    } catch (error) {
        console.error(error); // Loga o erro
        return reply.status(500).send({ error: "Erro ao buscar os colégios" });
    }
});

app.listen({ port: 3333 }).then(() => {
    console.log("Server is running on port 3333");
});
