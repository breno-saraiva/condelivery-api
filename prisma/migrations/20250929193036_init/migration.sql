/*
  Warnings:

  - You are about to drop the `Condominio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Morador` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pedido` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Morador" DROP CONSTRAINT "Morador_condominioId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Pedido" DROP CONSTRAINT "Pedido_moradorId_fkey";

-- DropTable
DROP TABLE "public"."Condominio";

-- DropTable
DROP TABLE "public"."Morador";

-- DropTable
DROP TABLE "public"."Pedido";

-- CreateTable
CREATE TABLE "public"."condominio" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cnpj" TEXT,
    "logradouro" TEXT,
    "numero" TEXT,
    "complemento" TEXT,
    "bairro" TEXT,
    "estado" TEXT,
    "municipio" TEXT,
    "cep" TEXT,
    "nomeAdm" TEXT,
    "cpfAdm" TEXT,
    "emailAdm" TEXT,
    "celularAdm" TEXT,
    "senhaAdm" TEXT,

    CONSTRAINT "condominio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."morador" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT,
    "celular" TEXT,
    "email" TEXT,
    "dataNascimento" TIMESTAMP(3),
    "unidade" TEXT,
    "ehEntregador" BOOLEAN NOT NULL DEFAULT false,
    "senha" TEXT,
    "condominioId" INTEGER NOT NULL,

    CONSTRAINT "morador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pedido" (
    "id" SERIAL NOT NULL,
    "plataforma" TEXT,
    "descricao" TEXT,
    "previsaoChegada" TIMESTAMP(3),
    "localEntrega" TEXT,
    "status" TEXT,
    "moradorId" INTEGER NOT NULL,

    CONSTRAINT "pedido_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."morador" ADD CONSTRAINT "morador_condominioId_fkey" FOREIGN KEY ("condominioId") REFERENCES "public"."condominio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pedido" ADD CONSTRAINT "pedido_moradorId_fkey" FOREIGN KEY ("moradorId") REFERENCES "public"."morador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
