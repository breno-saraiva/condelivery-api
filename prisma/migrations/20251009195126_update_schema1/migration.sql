/*
  Warnings:

  - A unique constraint covering the columns `[cnpj]` on the table `condominio` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cpfAdm]` on the table `condominio` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[emailAdm]` on the table `condominio` will be added. If there are existing duplicate values, this will fail.
  - Made the column `cnpj` on table `condominio` required. This step will fail if there are existing NULL values in that column.
  - Made the column `logradouro` on table `condominio` required. This step will fail if there are existing NULL values in that column.
  - Made the column `numero` on table `condominio` required. This step will fail if there are existing NULL values in that column.
  - Made the column `complemento` on table `condominio` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bairro` on table `condominio` required. This step will fail if there are existing NULL values in that column.
  - Made the column `estado` on table `condominio` required. This step will fail if there are existing NULL values in that column.
  - Made the column `municipio` on table `condominio` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cep` on table `condominio` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nomeAdm` on table `condominio` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cpfAdm` on table `condominio` required. This step will fail if there are existing NULL values in that column.
  - Made the column `emailAdm` on table `condominio` required. This step will fail if there are existing NULL values in that column.
  - Made the column `celularAdm` on table `condominio` required. This step will fail if there are existing NULL values in that column.
  - Made the column `senhaAdm` on table `condominio` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cpf` on table `morador` required. This step will fail if there are existing NULL values in that column.
  - Made the column `celular` on table `morador` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `morador` required. This step will fail if there are existing NULL values in that column.
  - Made the column `unidade` on table `morador` required. This step will fail if there are existing NULL values in that column.
  - Made the column `senha` on table `morador` required. This step will fail if there are existing NULL values in that column.
  - Made the column `plataforma` on table `pedido` required. This step will fail if there are existing NULL values in that column.
  - Made the column `descricao` on table `pedido` required. This step will fail if there are existing NULL values in that column.
  - Made the column `localEntrega` on table `pedido` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `pedido` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."condominio" ALTER COLUMN "cnpj" SET NOT NULL,
ALTER COLUMN "logradouro" SET NOT NULL,
ALTER COLUMN "numero" SET NOT NULL,
ALTER COLUMN "complemento" SET NOT NULL,
ALTER COLUMN "bairro" SET NOT NULL,
ALTER COLUMN "estado" SET NOT NULL,
ALTER COLUMN "municipio" SET NOT NULL,
ALTER COLUMN "cep" SET NOT NULL,
ALTER COLUMN "nomeAdm" SET NOT NULL,
ALTER COLUMN "cpfAdm" SET NOT NULL,
ALTER COLUMN "emailAdm" SET NOT NULL,
ALTER COLUMN "celularAdm" SET NOT NULL,
ALTER COLUMN "senhaAdm" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."morador" ALTER COLUMN "cpf" SET NOT NULL,
ALTER COLUMN "celular" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "dataNascimento" SET DATA TYPE TEXT,
ALTER COLUMN "unidade" SET NOT NULL,
ALTER COLUMN "senha" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."pedido" ALTER COLUMN "plataforma" SET NOT NULL,
ALTER COLUMN "descricao" SET NOT NULL,
ALTER COLUMN "localEntrega" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "condominio_cnpj_key" ON "public"."condominio"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "condominio_cpfAdm_key" ON "public"."condominio"("cpfAdm");

-- CreateIndex
CREATE UNIQUE INDEX "condominio_emailAdm_key" ON "public"."condominio"("emailAdm");
