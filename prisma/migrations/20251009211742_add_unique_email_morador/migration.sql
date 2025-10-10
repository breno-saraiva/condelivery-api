/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `morador` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "morador_email_key" ON "public"."morador"("email");
