-- CreateTable
CREATE TABLE "public"."Condominio" (
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

    CONSTRAINT "Condominio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Morador" (
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

    CONSTRAINT "Morador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Pedido" (
    "id" SERIAL NOT NULL,
    "plataforma" TEXT,
    "descricao" TEXT,
    "previsaoChegada" TIMESTAMP(3),
    "localEntrega" TEXT,
    "status" TEXT,
    "moradorId" INTEGER NOT NULL,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Morador" ADD CONSTRAINT "Morador_condominioId_fkey" FOREIGN KEY ("condominioId") REFERENCES "public"."Condominio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Pedido" ADD CONSTRAINT "Pedido_moradorId_fkey" FOREIGN KEY ("moradorId") REFERENCES "public"."Morador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
