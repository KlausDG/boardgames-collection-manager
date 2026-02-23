import { z } from "zod";

const bestPlayerCountSchema = z
  .object({
    min: z.number().int().positive(),
    max: z.number().int().positive(),
  })
  .refine((data) => data.min <= data.max, {
    message: "min não pode ser maior que max",
    path: ["min"],
  });

const v = {
  string: {
    required: (msg: string) =>
      z.preprocess(
        (val) => (val === undefined || val === null ? "" : val),
        z.string().min(1, msg),
      ),
  },
};

export const addBoardgameSchema = z.object({
  name: v.string.required("O nome é obrigatório"),
  bggId: z.coerce
    .number("O ID do BGG é obrigatório e deve ser um número")
    .positive("O ID do BGG deve ser um número positivo"),
  description: z.string().optional(),
  thumbnail: z.url("Deve ser uma URL válida"),
  image: z.url("Deve ser uma URL válida"),
  yearPublished: z.coerce
    .number("O ano de publicação é obrigatório")
    .min(1900, "Ano de publicação inválido"),
  minPlayers: z.coerce
    .number("O número mínimo de jogadores é obrigatório")
    .min(1, "Número mínimo de jogadores inválido"),
  maxPlayers: z.coerce
    .number("O número máximo de jogadores é obrigatório")
    .min(1, "Número máximo de jogadores inválido"),
  bestPlayerCount: z
    .array(bestPlayerCountSchema)
    .min(1, "Pelo menos um intervalo deve ser informado")
    .optional(),
  minAge: z.coerce
    .number("A idade mínima é obrigatória")
    .min(1, "Idade mínima inválida"),
  suggestedPlayerAge: z.number().optional(),
  languageDependence: z
    .object({
      level: z.number().int().min(0).max(5),
      description: z
        .string()
        .min(1, "Descrição da dependência de idioma é obrigatória"),
    })
    .optional(),
  weight: z.coerce
    .number("O peso é obrigatório")
    .min(1, "Peso inválido"),
  bggRank: z.coerce
    .number("O rank do BGG é obrigatório")
    .min(1, "Rank do BGG inválido"),
  bggLink: z.url("Deve ser uma URL válida"),
  publishers: z.string().min(1, "A Editora é obrigatória"), // Verificar se existe no banco, se não, adicionar
  designers: z
    .array(z.string().min(1))
    .min(1, "Pelo menos um designer é obrigatório"), // Verificar se existe no banco, se não, adicionar
  mechanics: z
    .array(z.string().min(1))
    .min(1, "Pelo menos uma mecânica é obrigatória"), // Verificar se existe no banco, se não, adicionar
  categories: z
    .array(z.string().min(1))
    .min(1, "Pelo menos uma categoria é obrigatória"), // Verificar se existe no banco, se não, adicionar
  expansions: z.array(z.string()).optional(),
  purchasedPrice: z.number().positive().optional(),
});

// Tipo inferido
export type AddBoardgameDTO = z.infer<typeof addBoardgameSchema>;
