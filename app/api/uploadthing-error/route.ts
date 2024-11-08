import { UTApi } from "uploadthing/server";

export async function POST(req: Request) {
  try {
    const { fileKey } = await req.json();

    const utapi = new UTApi();

    utapi.deleteFiles(fileKey).catch((error) => {
      return Response.json(error, { status: 400 });
    });

    return new Response("Imagem deletada com sucesso", { status: 200 });
  } catch (error) {
    return new Response("Ocorreu um erro ao deletar a imagem", { status: 500 });
  }
}
