import { Request, Response } from "express";
import BaseDB from "../data/BaseDatabase";

export default async function getUserByid (req: Request, res: Response) {
    try {
        const result = await this.getConnection().raw(`
            SELECT id, name FROM ${TABLE_NAME}
            WHERE id = "${req.params.id}"
        `)
        
        if (!result[0][0]) {
            res
                .status(404)
                .send({
                    message: "Usuário não encontrado"
                });
        }

        res
            .status(200)
            .send({
                message: "Sucesso!",
                user: result[0][0]
            });
    } catch (error) {
        res
            .status(400)
            .send({
                message: error.sqlMessage || error.message
            });
    }
}
        
    } catch (error) {
        
    }
}